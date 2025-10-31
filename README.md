# Countdown Timer App

A Progressive Web App (PWA) for tracking important events with real-time countdown timers.

## Features

- ✨ Create countdown events with name, date, time, and category
- ⏱️ Real-time countdown display (days, hours, minutes, seconds)
- 📱 Works on web and mobile (installable as PWA)
- 💾 Automatic data persistence (localStorage)
- 🎨 Category-based color coding
- 📊 Sort events by date
- 🔄 No backend required - fully client-side

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Add an Event**: Fill in the event name, date, and optionally time and category
2. **View Countdowns**: See all your events with real-time countdowns
3. **Delete Events**: Click the × button on any event to remove it

## Example

Want to track your birthday on September 7, 2026?
1. Enter "My Birthday" as the event name
2. Select date: 2026-09-07
3. Choose category: Birthday
4. Click "Add Event"

The app will show you exactly how many days, hours, minutes, and seconds until your birthday!

## Technology

- React 18.3 + Vite
- Progressive Web App (PWA)
- LocalStorage for persistence
- Custom CSS styling

## Project Structure

See [CLAUDE.md](./CLAUDE.md) for detailed architecture and development information.

## Requirements

See [REQUIREMENTS.md](./REQUIREMENTS.md) for complete project requirements and specifications.
