# 🎉 Event Management Dashboard

A full-stack web application that allows organizers to create and manage events, and users to browse and register for them. The platform also includes a notification system to keep users updated.

---

## 🚀 Features

* 👤 User Registration & Authentication
* 📅 Event Creation & Management (Organizers)
* 📝 Event Registration (Users)
* 🔔 Notification System for user updates
* 📊 Real-time registration tracking (backend supported)
* 💻 Responsive Frontend UI

---

## 🛠️ Tech Stack

### Frontend

* HTML, CSS, JavaScript


### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## 📁 Project Structure

```
event_management_hackathon/
├── frontend/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone https://github.com/manpreetk24k/event_management_hackathon.git
cd event_management_hackathon
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/event_dashboard
```

Start the server:

```
node server.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
# open index.html or run your frontend setup
```

---

## 🔔 Notification System

* Notifications are stored in a separate collection.
* Triggered on actions like event registration.
* Can be fetched and marked as read.
* Designed to support real-time updates using WebSockets.

---

## 👥 Team Contributions

* **Jyoti & Arsheya** – Frontend Development
* **Manpreet Kaur** – Backend Development
* **Vanshika Singh** – Database Design & Notification System

---

## 📌 Future Improvements

* Real-time notifications using Socket.IO
* Email notifications for events
* Advanced filtering & search
* Deployment on cloud platforms

---

