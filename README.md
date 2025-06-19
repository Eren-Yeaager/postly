# Postly 🚀

AI-powered content generation platform built with Next.js, Go, and PostgreSQL.

## Features ✨

- **AI Content Generation**: Leverage Anthropic's powerful AI to create engaging content
- **Google Authentication**: Secure user authentication via Google OAuth
- **Modern Dashboard**: Clean, responsive interface for content management
- **RESTful API**: Robust Go backend with structured endpoints

## Tech Stack 🛠️

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui components
- NextAuth.js

### Backend
- Go
- PostgreSQL
- Docker
- Railway (Deployment)

## Getting Started 🚀

### Prerequisites
- Node.js (v18 or higher)
- Go (v1.21 or higher)
- Docker and Docker Compose
- PostgreSQL

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Backend Setup
```bash
cd postly-backend

# Start PostgreSQL and backend services
docker-compose up -d

# Run the backend server
go run main.go
```

### Environment Variables
Create `.env` files in both root and `postly-backend` directories:

Frontend (.env):
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

Backend (.env):
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postly?sslmode=disable
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
ANTHROPIC_API_KEY=your_api_key
PORT=8080
```

## API Routes 🛣️

### Content Generation
- `POST /api/generate` - Generate new content
- `GET /api/content` - List all content
- `GET /api/content/:id` - Get specific content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/user` - Get current user

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Anthropic](https://www.anthropic.com/) for AI capabilities
- [Railway](https://railway.app/) for hosting
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
