# FOOD DELIVERY APP

## Project Description
This application allows users to order food from various restaurants online. It provides a user-friendly interface for both customers and restaurant owners to manage orders effortlessly.

## Features
- User authentication
- Restaurant browsing
- Menu selection
- Cart management
- Order tracking
- Ratings and reviews
- Admin panel for managing restaurants and orders

## Tech Stack
- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/JANAGIRAM-KUMAR/FOOD-DELIVERY-APP.git
   ```
2. Change directory to the project folder:
   ```
   cd FOOD-DELIVERY-APP
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```

## Usage
- Navigate to `http://localhost:3000` to access the application.
- Register as a user or login if you already have an account. 
- Browse restaurants, select food items, and place your order.

## Project Structure
```
FOOD-DELIVERY-APP/
├── client/             # Frontend code
├── server/             # Backend code
├── README.md           # Project documentation
└── package.json        # NPM dependencies
```

## API Endpoints
### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`

### Restaurants
- `GET /api/restaurants`
- `POST /api/restaurants`
- `GET /api/restaurants/:id`

### Orders
- `POST /api/orders`
- `GET /api/orders/:userId`

## Contributing Guidelines
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Create a pull request.

Thank you for contributing!