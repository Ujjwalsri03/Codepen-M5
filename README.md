# Interactive Code Editor with AI Chatbot Integration 🚀

Welcome to the **Interactive Code Editor with Live Preview and AI Chatbot**! This project provides a streamlined, feature-rich coding environment, featuring real-time code preview, project management, and a helpful AI-powered chatbot to guide users.

## 🎯 Project Overview

This code editor enables users to write HTML, CSS, and JavaScript code with instant feedback via a live preview. Users can securely log in using Google or GitHub, create new projects, and manage them with ease. A unique feature of this project is the AI-powered chatbot, designed to assist users with coding queries, offer code suggestions, and provide helpful responses.

### 🔗 Hosted Link
> [Live Project Link](https://codepen-m5.vercel.app/)

### 📸 Screenshots

Here are a few visuals to give you a sense of how the project functions:

- **Editor Interface with HTML, CSS, and JavaScript Panels**
- **Real-time Preview Pane**
- **AI Chatbot for Code Assistance**
- **Project Management and Saving**
- **User Authentication via Google and GitHub**

> ![Editor Screenshot 1](path/to/screenshot1.png)
> ![Editor Screenshot 2](path/to/screenshot2.png)
> ![Chatbot Screenshot](path/to/chatbot_screenshot.png)

---

## 🚀 Key Features

1. **Real-time Code Preview**: Instantly see your HTML, CSS, and JavaScript code updates in the output pane.
2. **AI-Powered Chatbot**: The integrated AI chatbot assists users by providing answers to coding questions, code suggestions, and general help. Powered by Gemini AI.
3. **User Authentication**: Secure login options using Google and GitHub.
4. **Project Creation and Saving**: Create, edit, and save your projects. Projects are stored securely with Firebase, allowing users to view and manage their work anytime.
5. **Responsive and Intuitive UI**: The layout is designed to be user-friendly and adaptive, making coding smooth on all devices.

---

## 🛠️ Technology Stack

- **Frontend**: React, Vite, CodeMirror (for the code editor), Redux Toolkit
- **Backend**: Firebase Firestore for project storage and user data management
- **AI Integration**: Gemini AI for the chatbot’s intelligence and responses
- **Authentication**: Firebase Auth with Google and GitHub provider options
- **UI/UX**: Tailwind CSS and Framer Motion for animations and styling

---

## 🚀 Getting Started
To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ujjwalsri03/Codepen-M5

2. **Navigate to the project directory:**

3. **Install the dependencies:**

bash
npm install

4. **Set up Firebase:**

Create a Firebase project and enable Firestore and Authentication with Google and GitHub sign-in providers.
Add your Firebase configuration to src/config/firebase.config.js.
Run the development server:


npm run dev
Open http://localhost:5173 to view it in the browser.