# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY react-app/package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire React app to the working directory
COPY react-app .

# Build the React app (you can customize this if needed)
RUN npm run build

# Expose the port that the React app will run on (usually 3000)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
