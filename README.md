# check-register

## Setup
- Create backend/.env with the following:
    - DATABASE_URL=sqlite:///../database/check_register.db

- Prepare frontend
    - cd to frontend and run npm install

## ToDo
- Add Docker compose capability
- Push containers to DockerHub and try running on another machine
- Get containers running in Linode
- More design on UI
- Move environent variables (database and api) from build to compose.
- Build and deploy to Linode via GitHub Actions