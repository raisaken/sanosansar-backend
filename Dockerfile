# Base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Copy env
COPY .env ./

# Run build
RUN yarn build

# Expose the port that your NestJS application listens on
EXPOSE 3000

# Start the application
CMD [ "yarn", "run", "start:prod" ]
