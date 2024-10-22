# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application to the container
COPY . .

# Set environment variable for the backend API URL
# ARG BACKEND_API_URL
# ENV REACT_APP_API_URL=${BACKEND_API_URL}
# RUN echo "REACT_APP_API_URL=${REACT_APP_API_URL}"

# Build the React app
RUN npm run build

# Use an official Nginx image to serve the React app
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]