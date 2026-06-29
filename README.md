# 🌍 Disaster Learning Hub

<p align="center">
  <img src="https://img.shields.io/badge/Smart%20India%20Hackathon-2025-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb"/>
  <img src="https://img.shields.io/badge/Templating-EJS-B4CA65?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/AI-Gemini%20API-4285F4?style=for-the-badge&logo=google"/>
</p>

---

## 📌 Overview

Disaster Learning Hub is a role-based disaster preparedness education platform developed for **Smart India Hackathon (SIH) 2025**.

The platform allows schools and colleges to train students on disaster safety through interactive learning modules, quizzes, animations, and an AI-powered chatbot — all managed through a structured three-tier approval system.

---

## 🚩 Problem Statement

Schools and colleges in India lack practical digital systems for disaster preparedness training. Safety guidelines exist but awareness among students and staff remains low.

Traditional safety drills are infrequent and poorly coordinated. There is no structured platform for region-specific disaster education in educational institutions.

---

## ✨ Features

### Three Role-Based Portals

**Student**
- Register and get approved by teacher
- Access 16 disaster learning modules
- Take quizzes after each module
- Use AI chatbot for disaster safety queries
- Accessibility tools: text-to-speech, high contrast, adjustable text size

**Teacher**
- Register and get approved by admin
- Approve or reject student registrations
- View registered student list

**Admin**
- Approve or reject teacher registrations
- Block teachers if needed
- View total teachers, students, and incident count
- Full dashboard with pending approval management

---

### 16 Disaster Learning Modules

Each module includes causes, warning signs, do's & don'ts, animations, sign language video, quiz, and a map of affected regions in India.

| Module | Module |
|---|---|
| Earthquake | Flood |
| Fire | Cyclone |
| Avalanche | Landslide |
| Tsunami | Lightning |
| Heatwave | Coldwave |
| Drought | Hailstorm |
| Forest Fire | Pandemic |
| Chemical Hazards | Road Accident Safety |

---

### Other Features

- **AI Chatbot** — powered by Google Gemini API for real-time disaster safety Q&A with fallback responses on quota limits
- **SMS Alerts** — Twilio integration to broadcast disaster alerts via SMS
- **Evacuation Simulation** — interactive demo showing primary and alternate evacuation routes with blocked-exit scenarios
- **Approval Workflow** — two-level gate: teacher approves students, admin approves teachers

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Templating | EJS |
| Database | MongoDB, Mongoose |
| AI Chatbot | Google Gemini API |
| SMS Alerts | Twilio API |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Tools | Git, GitHub, VS Code, Postman |

---

## ⚙️ System Architecture
Student / Teacher / Admin
↓
Express Routes
↓
Mongoose Models
(User, Teacher, Admin,
PendingStudent, PendingTeacher)
↓
MongoDB

## **Approval Flow:**

Teacher registers  →  PendingTeacher collection
Admin approves     →  moves to Teacher collection
Student registers  →  PendingStudent collection
Teacher approves   →  moves to User collection

---

## 🗂️ Project Structure
├── app.js                  # Main server and routes

├── models/

│   ├── user.js             # Student schema

│   ├── teacher.js          # Teacher schema

│   ├── admin.js            # Admin schema

│   ├── pendingTeacher.js

│   └── pendingStudent.js

├── views/

│   ├── home.ejs

│   ├── adminDashboard.ejs

│   ├── teacherDashboard.ejs

│   ├── studentDashboard.ejs

│   └── [16 disaster module pages]

├── public/

│   ├── css/

│   ├── js/

│   └── assets/

└── .env                  # API keys (not committed)

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or Atlas URI
- Gemini API key
- Twilio account SID and Auth Token

### Installation

```bash
# Clone the repo
git clone https://github.com/Piyushkc241/disaster-sih.git
cd disaster-sih

# Install dependencies
npm install

# Create .env file
touch .env
```

### .env Setup
GEMINI_API_KEY=your_gemini_key

TWILIO_SID=your_twilio_sid

TWILIO_AUTH=your_twilio_auth_token

### Run

```bash
node app.js
# Server starts at http://localhost:3000
```

---

## 🔮 Future Improvements

- Password hashing with bcrypt (currently plain text)
- JWT-based authentication
- Dynamic SMS alerts triggered by real events (currently hardcoded)
- Multilingual content support
- Mobile responsive design improvements
- AI-based disaster risk prediction

---

## 👥 Team

Developed during **Smart India Hackathon (SIH) 2025** by a collaborative student team.

---

## 📬 Contact

- **Name:** Piyush Kumar Chauhan
- **Email:** piyushk.c.241@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/piyush-kumar-chauhan-6b8182309/
