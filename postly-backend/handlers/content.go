package handlers

import (
	"net/http"

	"github.com/Eren-Yeaager/postly-backend/db"
	"github.com/Eren-Yeaager/postly-backend/models"
	"github.com/gin-gonic/gin"
)
func SaveContent (c *gin.Context){
	userEmail, exists := c.Get("userEmail")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
        return
    }

	var content models.Content
	if err := c.ShouldBindJSON(&content); err != nil{
		c.JSON(http.StatusInternalServerError,gin.H{"error":"Invalid request"})
		return
	}
	content.UserID = userEmail.(string)
    if content.Status == "" {
        content.Status = "draft" 
    }

	if err:= db.DB.Create(&content).Error; err !=nil{
		c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to save content"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
        "message": content,
        "userId": userEmail,
    })
}
func ListContent (c *gin.Context){

	userEmail, exists := c.Get("userEmail")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
        return
    }
	var contents []models.Content
	if err:= db.DB.Where("user_id = ?", userEmail.(string)).
    Order("created_at DESC").
    Find(&contents).Error; err != nil{
		c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to fetch data"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
        "contents": contents, 
        "userId": userEmail,
    })
}