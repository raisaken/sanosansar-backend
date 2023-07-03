# Base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy env
COPY .env ./


# Expose the port that your NestJS application listens on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
