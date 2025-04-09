# BookShop API

A RESTful API for managing books and reviews built with Node.js, Express, and MongoDB.

## Project Overview

This project is a learning exercise focused on implementing Node.js backend development best practices including:

- RESTful API design
- Authentication with JWT
- Environment variable management
- Error handling
- Separation of concerns (routes, controllers, services)
- MongoDB integration with Mongoose
- Comprehensive book review system

## Tech Stack

- Node.js
- Express.js
- Express-session for session management
- MongoDB for data persistence
- Mongoose ODM for MongoDB object modeling
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

## Installation

1. Clone the repository
2. Install dependencies:
   - npm install
3. Create a `.env` file in the root directory based on `.env.example`:
   - JWT_SECRET=your_secret_key_here
   - PORT=5000
   - MONGODB_URI=mongodb://localhost:27017/bookshop
   - SESSION_SECRET=your_session_secret
4. Start the development server:
   - npm run dev

## API Endpoints

### Authentication

- **Register a new user**

  - `POST /api/register`
  - Request body: `{ "username": "user1", "password": "password123" }`

- **Login**
  - `POST /api/login`
  - Request body: `{ "username": "user1", "password": "password123" }`
  - Returns a JWT token to use for authenticated requests

### Books

- **Get all books** `GET /api/books`, No authentication required

- **Get a single book by ISBN** `GET /api/books/isbn/:isbn`,
  No authentication required

- **Get books by author** `GET /api/books/author/:author`, No authentication required

- **Get books by title** `GET /api/books/title/:title`, No authentication required

### Reviews

- **Get reviews for a book**
  `GET /api/books/:isbn/reviews`
  No authentication required

- **Add or update a review**
  `PUT /api/books/:isbn/reviews`

  - Requires authentication (JWT token)
  - Query parameter: `review=Your review content goes here`

- **Delete a review**
  `DELETE /api/books/:isbn/reviews`
  - Requires authentication (JWT token)
  - Deletes the review made by the authenticated user

## Testing with Postman

1. **Setup Environment**

   - Create a new environment in Postman
   - Add a variable `base_url` with value `http://localhost:5000`
   - Add a variable `token` (this will be set after login)

2. **Authentication Tests**

   - Register a user: `POST {{base_url}}/api/register`
   - Login to get token: `POST {{base_url}}/api/login`
   - Set token automatically with this script in Tests tab:

     ```javascript
     pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
     });

     var jsonData = pm.response.json();
     if (jsonData.token) {
       pm.environment.set("token", jsonData.token);
     }
     ```

3. **Book Operations**

   - Get all books: `GET {{base_url}}/api/books`
   - Get book by ISBN: `GET {{base_url}}/api/books/isbn/1`
   - Search by author: `GET {{base_url}}/api/books/author/Author%1`
   - Search by title: `GET {{base_url}}/api/books/title/Book%20Title`

4. **Review Operations**
   - Get reviews: `GET {{base_url}}/api/books/1/reviews`
   - Add review (auth required):
     - `PUT {{base_url}}/api/books/1/reviews?review=This%20is%20a%20great%20book!`
     - Header: `Authorization: Bearer {{token}}`
   - Delete review (auth required):
     - `DELETE {{base_url}}/api/books/1/reviews`
     - Header: `Authorization: Bearer {{token}}`
