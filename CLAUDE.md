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
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel
- **Theme**: Black/dark theme with white text

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

### Deployment
```bash
vercel              # Deploy to Vercel (requires Vercel CLI)
git push            # Auto-deploys to Vercel when connected to GitHub
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
- Manages modal and full-screen overlay states
- Includes Vercel Analytics and Speed Insights components

**AddEventForm** (src/components/AddEventForm.jsx:1)
- Form for creating new countdown events
- Displayed in a modal overlay
- Fields: name (required), date (required), icon (24 emoji options)
- "All Day" toggle (iOS-style slider) - when ON, no time is captured; when OFF, shows time input
- Defaults to all-day events
- Random color assigned to each event on creation

**CountdownList** (src/components/CountdownList.jsx:1)
- Displays all countdown events in a vertical list
- Sorts events by date (earliest first)
- Manages which card is open for swipe-to-delete
- Handles click-outside-to-close for open cards
- Empty state when no events exist

**CountdownItem** (src/components/CountdownItem.jsx:1)
- Individual countdown display with full-color background
- Real-time countdown updates (every second)
- Shows days remaining (simplified display)
- Click to open full-screen countdown overlay
- Swipe left (touch/mouse) to reveal delete button
- Prevents modal opening during drag gestures
- Prevents vertical scrolling during horizontal swipe
- Past events show "X days ago"

**FullScreenCountdown** (src/components/FullScreenCountdown.jsx:1)
- Full-screen overlay displaying detailed countdown
- Shows large icon, event name, date
- Displays days, hours, minutes, seconds in grid layout
- Close via ESC key, X button, or click outside
- Dark theme with animations
- Shows "days ago" for past events

### Utilities

**dateUtils.js** (src/utils/dateUtils.js:1)
- `calculateTimeRemaining(targetDate)`: Calculates time difference between now and target date
- Returns object with days, hours, minutes, seconds, and total milliseconds
- Returns actual negative values for past events (no clamping to 0)

**colorUtils.js** (src/utils/colorUtils.js:1)
- `generateRandomColor()`: Generates a random vibrant color from predefined palette (17 colors)
- Used to assign unique background colors to each event card

### Data Model

Events are stored as objects with the following structure:
```javascript
{
  id: number,           // Timestamp-based unique ID
  name: string,         // Event name
  date: string,         // ISO date string (YYYY-MM-DD)
  time: string,         // Time string (HH:MM) - empty string for all-day events
  icon: string,         // Emoji icon (24 options: celebrations, travel, work, love, etc.)
  color: string,        // Hex color code for full card background
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
- Auto-updating service worker (`registerType: 'autoUpdate'`)
- Installable on mobile devices
- Works offline after initial load
- Manifest configured with app metadata
- Custom "C" favicon and PWA icons (192x192, 512x512)
- iOS-specific configuration:
  - `apple-mobile-web-app-capable`: Enables full-screen mode
  - `apple-mobile-web-app-status-bar-style: black-translucent`: Black status bar with white text
  - `theme-color: #000000`: Black theme color

### UI/UX Features

**Dark Theme**
- Black background (`#000000`)
- Dark gray surfaces (`#1a1a1a`) for modals
- Light text (`#f1f5f9`)
- Primary color: indigo (`#6366f1`)

**Swipe-to-Delete**
- Touch and mouse support
- Swipe left to reveal delete button
- Only one card can be open at a time
- Swipe right or click outside to close
- Prevents vertical scroll during horizontal swipe (>5px threshold)
- Delete button animates in with scale and opacity effects

**Modal System**
- Floating action button (+) opens add event modal
- Dark overlay with backdrop blur
- Click outside or ESC to close
- Slide-in animation

**All Day Toggle**
- iOS-style slider toggle
- Blue (on) = all-day event, no time
- Gray (off) = time input appears
- Smooth animation on state change

## File Structure

```
countdown_app/
├── public/                    # Static assets
│   ├── favicon.svg            # Site favicon (C on black)
│   ├── pwa-192x192.png        # PWA icon 192x192
│   ├── pwa-512x512.png        # PWA icon 512x512
│   └── generate-icons.html    # Utility to generate PNG icons from canvas
├── src/
│   ├── components/            # React components
│   │   ├── AddEventForm.jsx   # Modal form with icon picker & all-day toggle
│   │   ├── CountdownList.jsx  # List container with swipe management
│   │   ├── CountdownItem.jsx  # Card with swipe-to-delete & click-to-expand
│   │   └── FullScreenCountdown.jsx  # Full-screen countdown overlay
│   ├── styles/                # CSS files
│   │   ├── index.css          # Global styles & dark theme variables
│   │   └── App.css            # Component styles & animations
│   ├── utils/                 # Utility functions
│   │   ├── dateUtils.js       # Time calculations (supports negative values)
│   │   └── colorUtils.js      # Random color generator
│   ├── App.jsx                # Main app component w/ Analytics
│   └── main.jsx               # App entry point
├── index.html                 # HTML template with PWA meta tags
├── vite.config.js             # Vite + PWA configuration
├── vercel.json                # Vercel deployment config
├── package.json               # Dependencies and scripts
├── CLAUDE.md                  # This file
└── REQUIREMENTS.md            # Project requirements & task list
```

## Development Notes

### General
- The app uses a black/dark theme with full-color event cards
- No external UI libraries - uses custom CSS for all styling
- Fully responsive with mobile-first design
- State is initialized using lazy initialization to prevent localStorage race conditions
- Deployed on Vercel with automatic deployments from GitHub

### Countdown Logic
- Updates in real-time every second using setInterval
- Past events show "X days ago" (using Math.abs() on negative values)
- Simplified display: only shows "days" in list view
- Full-screen view shows days, hours, minutes, seconds

### Event Management
- Each event assigned random color from 17-color palette on creation
- 24 emoji icons available (celebrations, travel, work, love, education, entertainment)
- All-day events default (time = empty string)
- Events displayed in vertical list, sorted by date

### Swipe Gesture Implementation
- Uses useRef for drag state (startX, currentX, isDragging, hasDragged)
- 5px threshold to distinguish tap from swipe
- Prevents default scroll with `e.preventDefault()` during horizontal swipe
- CSS `touch-action` properties for proper gesture handling
- Transform-based animations for performance
- Only one card can be open at a time (managed by parent component)

### React Hooks Best Practices
- All hooks must be called before any conditional returns
- CountdownItem hook order: useState, useRef, useEffect (all at top)
- Prevents "hooks order changed" errors

### Analytics & Monitoring
- Vercel Analytics tracks page views and user behavior (production only)
- Speed Insights tracks Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
- Both components integrated in App.jsx

### PWA Updates
- Auto-updates enabled in service worker
- On iOS: close app completely and reopen to see updates
- Can take up to 24 hours for iOS to check for updates
- Force update: delete PWA, reinstall from Safari
