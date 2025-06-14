package models
type OllamaRequest struct{
	Model   string                 `json:"model"`
    Prompt  string                 `json:"prompt"`
    Stream  bool                   `json:"stream"`
    Options map[string]interface{} `json:"options,omitempty"`
}
type OllamaResponse struct{
	Response string `json:"response"`
}