package api

import (
	"github.com/Eren-Yeaager/postly-backend/handlers"
	"github.com/gin-gonic/gin"
)
func RegisterRoutes(r *gin.Engine){
	r.POST("/api/generate",handlers.GenerateContent)
}