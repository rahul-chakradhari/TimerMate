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

### Installation

```bash
git clone https://github.com/your-username/timermate.git
cd timermate
npm install
Run the App
bash
Copy
Edit
npx react-native run-android
# or
npx react-native run-ios
📦 Build for Production
To create a production build:

bash
Copy
Edit
npm run build
For Android:

bash
Copy
Edit
cd android
./gradlew assembleRelease
For iOS:

bash
Copy
Edit
cd ios
xcodebuild -configuration Release
📸 Screenshots
Add your app screenshots here
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/12f72bef-c9f6-4ac6-bfd8-0bec58095086" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/2b4f4ccb-9dcf-4ff8-b1e7-4ef1eb75ba80" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/f37f4066-43ae-4de2-a113-324e0f733694" />

🙌 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

📄 License
This project is licensed under the MIT License.

👨‍💻 Developed By
Rahul Chakradhari
LinkedIn | GitHub

