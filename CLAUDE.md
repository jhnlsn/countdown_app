# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A countdown timer application that allows users to track important upcoming events and see how much time remains until each event. Built as a Progressive Web App (PWA) that works on both web and mobile platforms.

## Technology Stack

- **Framework**: React 18.3
- **Build Tool**: Vite 5.3
- **PWA**: vite-plugin-pwa
- **Storage**: LocalStorage for data persistence
- **Styling**: CSS (custom styles, no framework)

## Commands

### Development
```bash
npm install          # Install dependencies
npm run dev         # Start development server (typically http://localhost:5173)
```

### Production
```bash
npm run build       # Build for production (outputs to /dist)
npm run preview     # Preview production build locally
```

### Code Quality
```bash
npm run lint        # Run ESLint to check code quality
```

## Architecture

### Component Structure

**App.jsx** (src/App.jsx:1)
- Main application component
- Manages global event state
- Handles localStorage persistence
- Contains two main sections: AddEventForm and CountdownList

**AddEventForm** (src/components/AddEventForm.jsx:1)
- Form for creating new countdown events
- Fields: name (required), date (required), time (optional), category
- Predefined categories: Birthday, Anniversary, Vacation, Deadline, Holiday, Meeting, Other

**CountdownList** (src/components/CountdownList.jsx:1)
- Displays all countdown events
- Sorts events by date (earliest first)
- Empty state when no events exist

**CountdownItem** (src/components/CountdownItem.jsx:1)
- Individual countdown display in rectangular list format
- Real-time countdown updates (every second)
- Shows days, hours, minutes, seconds remaining
- Random color-coded left border
- Delete functionality

### Utilities

**dateUtils.js** (src/utils/dateUtils.js:1)
- `calculateTimeRemaining(targetDate)`: Calculates time difference between now and target date
- Returns object with days, hours, minutes, seconds, and total milliseconds

**colorUtils.js** (src/utils/colorUtils.js:1)
- `generateRandomColor()`: Generates a random vibrant color from predefined palette
- Used to assign unique colors to each event

### Data Model

Events are stored as objects with the following structure:
```javascript
{
  id: number,           // Timestamp-based unique ID
  name: string,         // Event name
  date: string,         // ISO date string (YYYY-MM-DD)
  time: string,         // Time string (HH:MM) - optional
  category: string,     // Event category
  color: string,        // Hex color code for visual distinction
  createdAt: string     // ISO timestamp of creation
}
```

### Data Persistence

- Events are stored in browser localStorage under the key `countdownEvents`
- Automatic save on event changes
- Automatic load on app initialization
- No backend required - fully client-side

### PWA Configuration

The app is configured as a PWA in vite.config.js:
- Auto-updating service worker
- Installable on mobile devices
- Works offline after initial load
- Manifest configured with app metadata

## File Structure

```
countdown_app/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── AddEventForm.jsx
│   │   ├── CountdownList.jsx
│   │   └── CountdownItem.jsx
│   ├── styles/          # CSS files
│   │   ├── index.css    # Global styles
│   │   └── App.css      # Component styles
│   ├── utils/           # Utility functions
│   │   └── dateUtils.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # App entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Development Notes

- The countdown updates in real-time every second using setInterval
- Past events are visually distinguished (grayed out) but not automatically deleted
- Each event is assigned a random color from a predefined palette on creation
- Events are displayed in a rectangular list format (not cards)
- The app is fully responsive with mobile-first design
- No external UI libraries - uses custom CSS for all styling
- State is initialized using lazy initialization to prevent localStorage race conditions
