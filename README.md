# Weather Dashboard

A simple weather dashboard that allows users to search for the weather of different cities, view the current weather, and see a 5-day forecast. The app also allows users to toggle between Celsius and Fahrenheit, and save favorite cities for easy access.

## Features
- Search for weather by city name.
- View current weather and 5-day forecast.
- Toggle between Celsius and Fahrenheit.
- Add cities to your favorites list (using a mock backend with JSON Server).
- Remember the last searched city using local storage.

## Installation

### Prerequisites
Before running the app, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (with npm package manager)
- [Git](https://git-scm.com/)
- **JSON Server** (for the mock backend)

### Steps to Run the App Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/pankajkumar23/Weather-Dashboard.git
    cd Weather-Dashboard
    ```

2. Install the project dependencies (React, Axios, and JSON Server):

    ```bash
    npm install
    ```

3. Set up and run JSON Server to mock the backend:
   - Install JSON Server globally (if you haven't already):

     ```bash
     npm install -g json-server
     ```

   - Create a `db.json` file in the root directory to simulate your backend data. The `db.json` file should contain a `favorites` array, like this:

     ```json
     {
       "favorites": [
         
       ]
     }
     ```

   - Start JSON Server with the following command to mock the API:

     ```bash
     json-server --watch backend/db.json --port 5000
     ```

     This will start **JSON Server** on `http://localhost:5000`. Your app will interact with this mock API for managing favorite cities.

4. Run the app locally:
   
   ```bash
   npm start
