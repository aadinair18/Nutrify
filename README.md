# Nutrify Tracker

## Overview
Nutrify Tracker is a MERN stack-based application designed to help users track their food intake and monitor their nutritional consumption. It features user authentication, food search, and daily summary generation to provide an insightful dietary tracking experience.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)

## Features
### User Authentication
- Users can register and log in to create a personalized session.

### Food Search
- Users can search for food items by name.
- The app retrieves nutritional information using a database or a third-party API.

### Food Intake Tracking
- Users can select food items and enter the quantity (in grams) consumed.
- The app calculates the exact nutritional intake based on the entered quantity.

### Daily Summary
- Provides a breakdown of all consumed food items for the day.
- Displays detailed nutritional values such as calories, proteins, carbs, etc.

## Possible Enhancements
- **Nutrition Goals:** Allow users to set daily goals for calories or other nutrients and track progress.
- **Detailed Analytics:** Offer weekly or monthly insights into dietary trends.
- **API Integration:** Utilize a nutrition API for more accurate food data.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/nutrify-tracker.git
   cd nutrify-tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## License
This project is licensed under the MIT License.

