User Generator API Application

This project is a robust web application built with **Node.js** and **Express.js**. It demonstrates the ability to orchestrate multiple third-party APIs on the server side to generate a comprehensive, data-rich user profile. The project follows the **Routes and Controllers** architectural pattern to ensure clean, maintainable, and scalable code.

Features

The application integrates four distinct APIs to provide a seamless user experience:

**Random User Generator API**: Fetches personal details (Name, Gender, Photo, Age, DOB, Address).
**REST Countries API**: Retrieves country-specific metadata (Capital, Languages, Flag) based on the user's origin.
**Exchange Rate API**: Calculates real-time currency conversion from the user's local currency to USD and KZT.
**News API**: Fetches the top 5 relevant English headlines mentioning the user's country.

Tech Stack

**Backend**: Node.js, Express.js
**HTTP Client**: Axios (used for server-side API requests)
**Frontend**: HTML5, CSS3 (Grid & Flexbox), Vanilla JavaScript
**Security**: Dotenv (for environment variable management)

Project Structure

The project is organized following the principle of Separation of Concerns:


├── controllers/
│   └── userController.js    # Core logic: API fetching, data cleaning, and processing
├── routes/
│   └── userRoutes.js        # Route definitions and endpoint mapping
├── public/
│   ├── index.html           # Main UI structure
│   ├── style.css            # Responsive styles and layout
│   └── script.js            # Frontend logic: Triggering requests and DOM manipulation
├── .env                     # Secure storage for API keys (not committed to version control)
├── index.js                 # Entry point: Server configuration (Port 3000)
└── package.json             # Project dependencies and scripts



Installation & Setup

To run this project locally, follow these steps:

**Clone the repository:**

git clone <your-repository-link>
cd assignment-2-api


**Install dependencies:**

npm install



**Configure Environment Variables:**
Create a `.env` file in the root directory and add your API keys:

NEWS_API_KEY=your_news_api_key_here
EXCHANGE_RATE_KEY=your_exchange_rate_key_here




Start the server:

npm run start



Access the application:
Open your browser and navigate to `http://localhost:3000`.


**Design Decisions & Logic**

**Server-Side Execution**

Following the assignment requirements, all API logic is handled in the **Backend**. This prevents "Cross-Origin Resource Sharing" (CORS) issues and protects sensitive API keys from being exposed to the client.

**API Chaining Sequence**

The controller implements a logical dependency chain:
Step A: Get User  Extract **Country Name**.
Step B: Use Country Name  Get **Currency Code** & Country info.
Step C: Use Currency Code  Fetch **Exchange Rates**.
Step D: Use Country Name  Fetch **News Headlines**.

**Error Handling**

The application uses `try-catch` blocks to handle potential failures (e.g., an API being down or a country not found). It ensures the server remains stable and provides meaningful feedback to the frontend.

**Clean UI/UX**

The frontend uses a modern **Card-based layout**. Data is displayed in structured sections with labeled fields, ensuring high readability and a professional look.



