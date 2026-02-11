🎬 Movies App – Frontend

Live Demo:
👉 https://movies-app-frontend-9cvq.vercel.app/

📌 Overview

This is the frontend of the Movies Management Application built using React + Vite.
It allows users to:

View movies

Search movies

Filter by genre, year, and rating

Add new movies

Edit existing movies

Delete movies

Route-based modal editing (/movies/:id/edit)

The application consumes a deployed backend REST API.

🚀 Tech Stack

React 18

Vite

React Router DOM

Axios

CSS (Custom Styling)

Vercel (Deployment)

📂 Project Structure
frontend/
│
├── public/
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
│
├── index.html
├── package.json
└── vite.config.js

⚙️ Setup Instructions (Local Development)
1️⃣ Clone the repository
git clone https://github.com/sakshimadne/movies-app-frontend.git
cd movies-app-frontend

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev


App will run at:

http://localhost:5173

4️⃣ Build for production
npm run build

5️⃣ Preview production build
npm run preview

🔗 API Integration

The frontend consumes the deployed backend API:

https://movies-app-backend-tau.vercel.app/api/movies

Available API Endpoints
Method	Endpoint	Description
GET	/api/movies	Get all movies
GET	/api/movies/:id	Get movie by ID
POST	/api/movies	Create new movie
PUT	/api/movies/:id	Update movie
DELETE	/api/movies/:id	Delete movie
🌐 Routing

The application uses React Router:

/ → Home page (Movie list)

/movies/:id/edit → Opens edit modal (URL controlled)

🎨 Features

Responsive UI

Hover action controls

Route-based modal editing

Real-time filtering

Form validation

Error handling

Fallback image handling

🚀 Deployment

The frontend is deployed on Vercel.

Production URL:
👉 https://movies-app-frontend-9cvq.vercel.app/

To redeploy:

Push changes to GitHub

Vercel auto-builds and deploys

🧠 Future Improvements

Authentication

Pagination

Toast notifications

Movie details page

Add route-based "Add Movie" modal

Better state management (Redux / Context API)

👩‍💻 Author

Developed by Sakshi Madne