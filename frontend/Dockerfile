# Stage 1: Build the React app
FROM node:14 AS build

# Set build-time environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Set runtime environment variables
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]