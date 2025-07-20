 **<b>TimerMate</b>**

**TimerMate** is a customizable productivity timer app built with React Native. It allows users to create and manage multiple timers grouped by categories like "Study", "Workout", or "Break". Designed with clean UI/UX and minimal dependencies, it features progress tracking, local storage, grouped actions, and a timer history log — making it the perfect tool for those who follow time-blocking or Pomodoro-style productivity.

---

## 🧠 Objective

Build a React Native app that allows users to create, manage, and interact with multiple customizable timers. The app includes features like categories, progress visualization, history tracking, and grouped actions while maintaining a clean UI/UX with minimal third-party dependencies.

---

## ✅ Core Features

### 1. Add Timer
- Create timers with:
  - **Name** (e.g., "Workout Timer")
  - **Duration** (in seconds)
  - **Category** (e.g., "Workout", "Study", "Break")
- Timers are saved locally using **AsyncStorage**.



### 2. Timer List with Grouping
- Display all timers grouped by their category.
- Each category is expandable/collapsible.
- Each timer shows:
  - **Name**
  - **Remaining Time**
  - **Status**: Running, Paused, or Completed

### 3. Timer Management
- For each timer:
  - **Start**: Begin countdown
  - **Pause**: Temporarily stop countdown
  - **Reset**: Restore original duration
- Automatically mark timers as **Completed** when they finish.

### 4. Progress Visualization
- Simple progress bar or percentage to show remaining time.

### 5. Bulk Actions (per category)
- Start All Timers
- Pause All Timers
- Reset All Timers

### 6. User Feedback
- Show a **modal** when a timer completes:
  - Congratulatory message
  - Timer name

---

## 🌟 Enhanced Functionality

### 1. Timer History
- Log completed timers with:
  - Timer name
  - Completion timestamp
- View history in a separate **"History" screen**

### 2. Customizable Alerts
- Optional **50% halfway alert**
- On-screen message/notification when alert is triggered

---

## 🛠️ Technical Details

- **State Management**: `useState` / `useReducer`
- **Navigation**: `React Navigation`
  - Home Screen: Timer management + grouping
  - History Screen: Completed timers log
- **Persistence**: `AsyncStorage`
- **Timers**: `setInterval` for countdowns
- **Styling**: Clean, responsive layouts via `StyleSheet`

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- React Native CLI
- Android Studio / Xcode for emulator or physical device

  
### Screenshots
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/e1ea4792-aa06-41b3-8390-be4e63a3261e" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/cce7c298-4788-4048-80f0-9a7c9811a739" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/059d48bf-5667-489e-a03d-e08163420607" />

### Installation

# Clone the repo
git clone https://github.com/rahul-chakradhari/TimerMate.git

# Navigate to project directory
cd TimerMate

# Install dependencies
npm install

# Run the application
npm start
App will be live on: https://timer-mate.netlify.app/

👨‍💻 Developed By <br>
Rahul Chakradhari
LinkedIn (https://www.linkedin.com/in/rahul-chakradhari-17a437217/)
