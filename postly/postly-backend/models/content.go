package models

import "gorm.io/gorm"
type Content struct{
	gorm.Model
	Title string
	Content string
	Platform string
	UserID string
	Status string
}