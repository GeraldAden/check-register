docker run -d -p 8080:80 -e REACT_APP_API_URL=http://localhost:8000 --name check-register-frontend check-register-frontend
# docker run -d -p 8080:80 --name check-register-frontend check-register-frontend