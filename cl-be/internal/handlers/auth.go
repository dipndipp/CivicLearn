package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/naufalwaiz/hukum-chatbot/config"
	"github.com/naufalwaiz/hukum-chatbot/internal/models"
	"github.com/naufalwaiz/hukum-chatbot/internal/services"
	"golang.org/x/crypto/bcrypt"
)

// GetAllUsers returns all users (id, email) as JSON array
func GetAllUsers(c *gin.Context) {
	rows, err := config.DB.Query("SELECT id, usn, email FROM users")
       if err != nil {
	       c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	       return
       }
       defer rows.Close()

       var users []models.User
       for rows.Next() {
	       var u models.User
	       if err := rows.Scan(&u.ID, &u.Usn, &u.Email); err != nil {
		       c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		       return
	       }
	       users = append(users, u)
       }
       c.JSON(http.StatusOK, users)
}




type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

       hashed, _ := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
       id := uuid.New()
       email := req.Email
       usn := ""
       if at := len(email); at > 0 {
	       if i := indexAt(email); i >= 0 {
		       usn = email[:i]
	       } else {
		       usn = email
	       }
       }

       _, err := config.DB.Exec(
	       "INSERT INTO users (id, email, password, usn) VALUES ($1, $2, $3, $4)",
	       id, email, string(hashed), usn,
       )
       if err != nil {
	       c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	       return
       }

       c.JSON(http.StatusOK, gin.H{"message": "user registered", "email": email, "usn": usn})

}


// indexAt returns the index of '@' in email, or -1 if not found
func indexAt(email string) int {
       for i, c := range email {
	       if c == '@' {
		       return i
	       }
       }
       return -1
}

type LoginRequest struct {
       Email    string `json:"email"`
       Password string `json:"password"`
}

func Login(c *gin.Context) {
	var req LoginRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var id, password string
	err := config.DB.QueryRow(
		"SELECT id, password FROM users WHERE email=$1", req.Email,
	).Scan(&id, &password)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	if bcrypt.CompareHashAndPassword([]byte(password), []byte(req.Password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	token, _ := services.GenerateToken(id)
	c.JSON(http.StatusOK, gin.H{"token": token})
}
