# Recipe-Sharing Platform Backend

## Description
The backend for the Recipe-Sharing Platform is built with Node.js and Express, providing a robust API to support the frontend application. It handles user authentication, recipe creation, reviews, and ratings, and integrates with MongoDB to store application data.

## Features

- **User Authentication**: Secure user login and registration using JWT (JSON Web Tokens).
- **Recipe Management**: CRUD operations for recipes, including ingredients, directions, and images.
- **Reviews and Ratings**: Allows users to review and rate recipes, except their own.
- **Image Upload**: Supports image upload for recipes using Multer.
- **API Routes**: RESTful APIs for frontend communication.

## Technologies Used

- **Framework**: Node.js with Express
- **Database**: MongoDB (with Mongoose for schema modeling)
- **Authentication**: JWT for secure authentication
- **Image Handling**: Multer for managing file uploads
- **Environment Variables**: dotenv for configuration
- **Validation**: Joi for request validation

## Installation

### 1. Clone the Repository

```bash
https://github.com/akash-mindfire/backend-recipe-sharing-platform

##2. Install Dependencies
Navigate to the backend directory and install required packages:"npm install"

##3. Set Up Environment Variables
Create a .env file in the root of the backend directory and provide the following configuration:

PORT=5000
MONGO_URI=your_mongo_database_url
JWT_SECRET=your_jwt_secret

##4. Start the Backend Server
Run the following command to start the server:"npm run dev"

The API will be accessible at http://localhost:5000.

##API Endpoints

Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Log in a user and return a JWT.

Recipes
GET /api/recipes: Get all recipes.
GET /api/recipes/:id: Get details of a specific recipe.
POST /api/recipes: Create a new recipe (requires authentication).
PUT /api/recipes/:id: Update a recipe (requires authentication and authorization).
DELETE /api/recipes/:id: Delete a recipe (requires authentication and authorization).

Reviews
POST /api/reviews: Add a review to a recipe.
PUT /api/reviews/:id: Edit a review (requires authentication and ownership).
DELETE /api/reviews/:id: Delete a review (requires authentication and ownership).

Favorites
POST /api/favorites: Add a recipe to favorites.
GET /api/favorites/:userId: Get a user's favorite recipes.

backend/
├── controllers/      # Controllers for handling business logic
├── services/           # Mongoose models for MongoDB
├── routes/           # API routes
├── middleware/       # Middleware (e.g., authentication)
├── schema/           # Schema
├── uploads/          # Directory for uploaded images
├── .env              # Environment variables
├── index.ts         # Entry point for the application
