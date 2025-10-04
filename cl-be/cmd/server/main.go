package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/naufalwaiz/hukum-chatbot/config"
	"github.com/naufalwaiz/hukum-chatbot/internal/handlers"
)

func main() {
	// Load .env (optional)
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️ No .env file found, using system env")
	}

	// Init DB connection
	config.InitDB()

	r := gin.Default()
	r.Use(cors.Default())

	// Routes
	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)
	r.POST("/chatbot", handlers.Chatbot)
	r.GET("/health", handlers.HealthCheck)
	r.GET("/users", handlers.GetAllUsers)

	r.POST("/news", handlers.CreateNews)
	r.GET("/news", handlers.GetAllNews)
	r.GET("/news/:id", handlers.GetNewsByID)
	r.PUT("/news/:id", handlers.UpdateNews)
	r.DELETE("/news/:id", handlers.DeleteNews)

	r.POST("/forum", handlers.CreateForum)
	r.GET("/forum", handlers.GetAllForums)
	r.GET("/forum/:id", handlers.GetForumByID)
	r.PUT("/forum/:id", handlers.UpdateForum)
	r.DELETE("/forum/:id", handlers.DeleteForum)

	r.GET("/forum/:id/replies", handlers.GetReplies)
	r.POST("/forum/:id/replies", handlers.CreateReply)

	// Ambil port dari env Railway
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // fallback kalau dijalankan lokal
	}

	log.Println("🚀 Server running on port " + port)
	r.Run(":" + port)
}
