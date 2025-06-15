package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/Eren-Yeaager/postly-backend/models"
	"github.com/gin-gonic/gin"
)

func GenerateContent(c *gin.Context) {
	
	userEmail, exists := c.Get("userEmail")
    if !exists {
		
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
        return
    }
	var req models.GenerateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	
	prompt := "Write a detailed, engaging, and complete " + req.Tone + " social media post for " + req.Platform + " about \"" + req.Topic + "\"."
	if len(req.Keywords) > 0 {
		prompt += " Include these keywords: " + joinKeywords(req.Keywords) + "."
	}
	prompt += " The post should be at least 3 sentences long and ready to publish."

	
	ollamaReq := models.OllamaRequest{
		Model:  "llama3", 
		Prompt: prompt,
		Stream: false,
		Options: map[string]interface{}{
			"num_predict": 200, 
		},
	}
	body, _ := json.Marshal(ollamaReq)

	
	resp, err := http.Post("http://localhost:11434/api/generate", "application/json", bytes.NewBuffer(body))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to contact Ollama"})
		return
	}
	defer resp.Body.Close()

	var ollamaResp models.OllamaResponse
	if err := json.NewDecoder(resp.Body).Decode(&ollamaResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse Ollama response"})
		return
	}

	c.JSON(http.StatusOK, models.GenerateResponse{
		Content: ollamaResp.Response,
		UserID:userEmail.(string),
	})
}

func CheckOllamaHealth(c *gin.Context) {
    resp, err := http.Get("http://localhost:11434/api/health")
    if err != nil || resp.StatusCode != http.StatusOK {
        c.JSON(http.StatusServiceUnavailable, gin.H{
            "status": "unhealthy",
            "error": "Ollama service is not responding",
        })
        return
    }
    c.JSON(http.StatusOK, gin.H{"status": "healthy"})
}
// Custom function
func joinKeywords(keywords []string) string {
	result := ""
	for i, k := range keywords {
		if i > 0 {
			result += ", "
		}
		result += k
	}
	return result
}
