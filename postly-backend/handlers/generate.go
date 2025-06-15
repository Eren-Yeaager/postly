package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

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

	anthropicAPIKey := os.Getenv("ANTHROPIC_API_KEY")
	if anthropicAPIKey == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Anthropic API key not set"})
		return
	}

	
	anthropicReq := map[string]interface{}{
		"model": "claude-3-haiku-20240307", 
		"max_tokens": 200,
		"messages": []map[string]string{
			{"role": "user", "content": prompt},
		},
	}
	body, _ := json.Marshal(anthropicReq)

	reqAnthropic, err := http.NewRequest("POST", "https://api.anthropic.com/v1/messages", bytes.NewBuffer(body))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Anthropic request"})
		return
	}
	reqAnthropic.Header.Set("Content-Type", "application/json")
	reqAnthropic.Header.Set("x-api-key", anthropicAPIKey)
	reqAnthropic.Header.Set("anthropic-version", "2023-06-01")

	client := &http.Client{}
	resp, err := client.Do(reqAnthropic)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to contact Anthropic"})
		return
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	fmt.Println(string(respBody))

	var anthropicResp map[string]interface{}
	if err := json.Unmarshal(respBody, &anthropicResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse Anthropic response"})
		return
	}

	
	content := ""
	if contentArr, ok := anthropicResp["content"].([]interface{}); ok && len(contentArr) > 0 {
		if msg, ok := contentArr[0].(map[string]interface{}); ok {
			if text, ok := msg["text"].(string); ok {
				content = text
			}
		}
	}

	c.JSON(http.StatusOK, models.GenerateResponse{
		Content: content,
		UserID:  userEmail.(string),
	})
}

func CheckOllamaHealth(c *gin.Context) {
	ollamaURL := os.Getenv("OLLAMA_API_URL")
    if ollamaURL == "" {
        ollamaURL = "http://localhost:11434"
    }
    resp, err := http.Get(ollamaURL +"/api/health")
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
