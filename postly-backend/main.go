package main

import (
	"log"
	"net/http"
	"os"

	"github.com/Eren-Yeaager/postly-backend/api"
	"github.com/Eren-Yeaager/postly-backend/db"
	"github.com/Eren-Yeaager/postly-backend/middleware"
	"github.com/Eren-Yeaager/postly-backend/models"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main(){
	err := godotenv.Load()
	if err != nil {
        log.Println("No .env file found or failed to load")
    }

	
	db.Connect()
	db.DB.AutoMigrate(&models.Content{})
	
   
	r := gin.Default()
	
	r.Use(func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        
        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        
        c.Next()
    })
	
	
	apiGroup := r.Group("/api")
    apiGroup.Use(middleware.GoogleAuthMiddleware())
    api.RegisterRoutes(apiGroup)
	
	r.GET("/",func(c *gin.Context){
		c.String(http.StatusOK,"Hello from Gin !")
	})
	port := os.Getenv("PORT")
    if port == "" {
    port = "8080"
    }
    r.Run(":" + port)
}