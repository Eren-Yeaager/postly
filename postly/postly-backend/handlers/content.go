package handlers

import (
	"net/http"

	"github.com/Eren-Yeaager/postly-backend/db"
	"github.com/Eren-Yeaager/postly-backend/models"
	"github.com/gin-gonic/gin"
)
func SaveContent (c *gin.Context){
	var content models.Content
	if err := c.ShouldBindJSON(&content); err != nil{
		c.JSON(http.StatusInternalServerError,gin.H{"error":"Invalid request"})
		return
	}
	if err:= db.DB.Create(&content).Error; err !=nil{
		c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to save content"})
		return
	}
	c.JSON(http.StatusOK,content)
}
func ListContent (c *gin.Context){
	var contents []models.Content
	if err:= db.DB.Find(&contents).Error; err != nil{
		c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to fetch data"})
		return
	}
	c.JSON(http.StatusOK,contents)
}