URL Shortener App
Description
A simple React-based URL shortener application that allows users to create shortened URLs with custom or auto-generated shortcodes. The app includes features for URL expiration, click tracking, statistics viewing, and logging of user actions. All data is stored locally using browser localStorage.

Features
URL Shortening: Create shortened URLs with optional custom shortcodes (4-10 alphanumeric characters).
Auto-Generated Shortcodes: If no custom shortcode is provided, a unique 6-character code is generated.
Expiration: Set a validity period for shortened URLs (in minutes).
Click Tracking: Track the number of clicks on each shortened URL.
Statistics Page: View detailed stats for each shortcode, including original URL, creation time, expiration, and click count.
Redirection: Automatic redirection to the original URL when accessing the shortcode.
Logging: Built-in logging middleware to track user actions and errors.
Local Storage: All data persists in the browser's localStorage.
Tech Stack
Frontend: React.js
Routing: React Router DOM
State Management: React Context API with useReducer for logging
Styling: Inline CSS (can be extended with CSS frameworks)
Storage: Browser localStorage
Installation and Setup
Clone the repository (if applicable) or ensure the project files are in your working directory.
Navigate to the project directory:

cd /Users/macbook/Desktop/FrontEnd/FrontendTest
Install dependencies (assuming you have Node.js and npm installed):

npm install
Required dependencies based on the code:
react
react-dom
react-router-dom
Start the development server:

npm start
The app will run on http://localhost:3000 by default.
Usage
Home Page (/): Enter the original URL, optionally provide a custom shortcode, and set the validity period. Click "Shorten URL" to create the short link.
Shortened URLs List: View all created short URLs with their status (valid/expired), click counts, and links to stats.
Stats Page (/stats/:shortcode): Access detailed statistics for a specific shortcode.
Redirection (/ :shortcode): Visiting the shortcode URL will redirect to the original URL (if valid and not expired).
Project Structure
src/App.js: Main application component with routing setup.
src/components/URLShortenerForm.js: Form for creating shortened URLs.
src/components/URLStats.js: Component to display statistics for a shortcode.
src/components/RedirectHandler.js: Handles redirection and click tracking.
LoggingMiddleware/LoggingMiddleware.js: Context provider for logging functionality.
src/.gitignore: Git ignore file.
Logging
The app uses a custom logging middleware to track actions such as:

URL creation
Stats viewing
Redirection attempts (success/failure)
Errors (e.g., shortcode not found, expired URLs)
Logs are stored in memory and can be accessed via the LoggingContext.

Future Improvements
Add user authentication and user-specific URL management.
Implement a backend API for persistent storage (e.g., database).
Add analytics dashboard with charts.
Support for bulk URL shortening.
Custom domain support.
API endpoints for programmatic access.
