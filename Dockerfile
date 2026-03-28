# Dockerfile

# Use the official Node 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app files to the working directory
COPY . .

# Build the Vue app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 8080

# Start the app
CMD [ "npm", "run", "serve" ]
