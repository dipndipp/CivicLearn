package models

import "time"

type Forum struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	Author    string    `json:"author"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type ForumReply struct {
    ID        string    `json:"id"`
    ForumID   string    `json:"forum_id"`
    Body      string    `json:"body"`
    Author    string    `json:"author"`
    CreatedAt time.Time `json:"created_at"`
}
