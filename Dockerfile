# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Expose the port the app runs on
EXPOSE 3000

# Define environment variables
ENV PORT=3000

#npm install express dotenv @api.video/nodejs-sdk

