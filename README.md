# Welcome to Device Treasury

## Getting Started

### One time setup

Setup a new mongo database called 'dtreasury_dev' with the following collections:

users
devices
checkouts
tokens

Install the required packages:

```bash
npm install
```

Create a .env file in the top level directory with:

SECRET_TOKEN="YOUR SECRET TOKEN HERE"
REFRESH_SECRET_TOKEN="YOUR REFRESH SECRET TOKEN HERE"

Seed the database with the admin user:

```bash
npm run seed-local
```

The username is 'admin@email.com' and password is 'password'.

**MAKE SURE TO CHANGE THE ADMIN PASSWORD THROUGH THE PORTAL.**

### Running the app

Run the express backend service:

```bash
npm run start-express
```

The default port is 3001 if one is not provided.

Run the frontend:

```bash
npm start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Development

To run tests:

```bash
npm test
```

Launches the test runner in the interactive watch mode.

## Building and Deployment

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
