# BookShop API

A simple RESTful API for managing books built with Node.js and Express.

## Project Overview

This project is a learning exercise focused on implementing Node.js backend development best practices including:

- RESTful API design
- Authentication with JWT
- Environment variable management
- Error handling
- Separation of concerns (routes, controllers, services)

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
4. Start the development server: 
   - npm run dev


## API Endpoints

### Authentication

- **Register a new user**
- `POST /api/auth/register`
- Request body: `{ "username": "user1", "password": "password123", "email": "user@example.com" }`

- **Login**
- `POST /api/auth/login`
- Request body: `{ "username": "user1", "password": "password123" }`
- Returns a JWT token to use for authenticated requests

### Books

- **Get all books**
- `GET /api/books`
- No authentication required

- **Get a single book by ID**
- `GET /api/books/:id`
- No authentication required

- **Create a new book**
- `POST /api/books`
- Requires authentication (JWT token)
- Request body: `{ "title": "Book Title", "author": "Author Name" }`

- **Update a book**
- `PUT /api/books/:id`
- Requires authentication (JWT token)
- Request body: `{ "title": "Updated Title", "author": "Updated Author" }`

- **Delete a book**
- `DELETE /api/books/:id`
- Requires authentication (JWT token)

## Testing with Postman

1. **Setup Environment**
- Create a new environment in Postman
- Add a variable `base_url` with value `http://localhost:5000`
- Add a variable `token` (this will be set after login)

2. **Register a User**
- Method: `POST`
- URL: `{{base_url}}/api/auth/register`
- Body (raw JSON):
  ```json
  {
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com"
  }
  ```

3. **Login**
- Method: `POST`
- URL: `{{base_url}}/api/auth/login`
- Body (raw JSON):
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- In the "Tests" tab, add this script to automatically set the token:
  ```javascript
  pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
  });
  
  var jsonData = pm.response.json();
  if (jsonData.token) {
    pm.environment.set("token", jsonData.token);
  }
  ```

4. **Get All Books**
- Method: `GET`
- URL: `{{base_url}}/api/books`
- No authentication required

5. **Create a Book**
- Method: `POST`
- URL: `{{base_url}}/api/books`
- Headers: `Authorization: Bearer {{token}}`
- Body (raw JSON):
  ```json
  {
    "title": "Aliquam malesuada ornare",
    "author": "Author 3"
  }
  ```

6. **Get a Book by ID**
- Method: `GET`
- URL: `{{base_url}}/api/books/1`
- No authentication required

7. **Update a Book**
- Method: `PUT`
- URL: `{{base_url}}/api/books/1`
- Headers: `Authorization: Bearer {{token}}`
- Body (raw JSON):
  ```json
  {
    "title": "Updated Book Title"
  }
  ```

8. **Delete a Book**
- Method: `DELETE`
- URL: `{{base_url}}/api/books/1`
- Headers: `Authorization: Bearer {{token}}`

## Future Enhancements

- Input validation
- Logging system
- User roles and permissions
- Refresh tokens

