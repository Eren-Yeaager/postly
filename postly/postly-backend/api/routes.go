package api

import (
	"github.com/Eren-Yeaager/postly-backend/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.POST("/generate", handlers.GenerateContent)
    r.POST("/content", handlers.SaveContent)
    r.GET("/content", handlers.ListContent)
	
}