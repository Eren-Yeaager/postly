package models
type GenerateRequest struct{
	Topic    string   `json:"topic"`
	Platform string   `json:"platform"`
    Tone     string   `json:"tone"`
    Keywords []string `json:"keywords"`

}
type GenerateResponse struct{
	Content string `json:"content"`
}