# Simple CRM Backend

This is the backend API for the Simple CRM application, designed to manage prospects, track interactions, and visualize the sales pipeline.

## Features

- RESTful API for CRUD operations on prospects
- Tracking of prospect status in the sales pipeline
- Recording notes and activities for each prospect
- Filtering and searching prospects

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas connection)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/simple-crm
   NODE_ENV=development
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Prospects

- `GET /api/prospects` - Get all prospects
- `GET /api/prospects/:id` - Get a specific prospect
- `POST /api/prospects` - Create a new prospect
- `PUT /api/prospects/:id` - Update a prospect
- `DELETE /api/prospects/:id` - Delete a prospect

### Notes

- `POST /api/prospects/:id/notes` - Add a note to a prospect

### Activities

- `POST /api/prospects/:id/activities` - Add an activity to a prospect

## Data Models

### Prospect

- `fullName` (String, required) - Full name of the prospect
- `email` (String, required) - Email address
- `phoneNumber` (String, required) - Phone number
- `status` (String, enum) - Status in the sales pipeline
- `notes` (Array) - Notes about interactions
- `activities` (Array) - Record of activities
- `lastContact` (Date) - Last contact date
- `createdAt` (Date) - Creation timestamp
- `updatedAt` (Date) - Last update timestamp 