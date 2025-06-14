package main

import (
	"log"
	"net/http"

	"github.com/Eren-Yeaager/postly-backend/api"
	"github.com/Eren-Yeaager/postly-backend/db"
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
	api.RegisterRoutes(r)
	r.GET("/",func(c *gin.Context){
		c.String(http.StatusOK,"Hello from Gin !")
	})
	r.Run(":8080")
}