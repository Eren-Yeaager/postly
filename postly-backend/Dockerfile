FROM golang:1.22-alpine AS build

# Install build dependencies
RUN apk add --no-cache gcc musl-dev

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application with verbose output
RUN CGO_ENABLED=0 GOOS=linux go build -v -o app .

# Verify the binary was created
RUN ls -la /app/app

FROM alpine:latest

# Install ca-certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from build stage
COPY --from=build /app/app .

# Verify the binary was copied and make it executable
RUN ls -la ./app && chmod +x ./app

# Expose port
EXPOSE 8080

# Run the application
CMD ["./app"]