import { useState, useEffect } from 'react'
import CountdownList from './components/CountdownList'
import AddEventForm from './components/AddEventForm'
import FullScreenCountdown from './components/FullScreenCountdown'
import { generateRandomColor } from './utils/colorUtils'
import './styles/App.css'

function App() {
  // Initialize state from localStorage using lazy initialization
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('countdownEvents')
    return savedEvents ? JSON.parse(savedEvents) : []
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('countdownEvents', JSON.stringify(events))
  }, [events])

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isModalOpen])

  const addEvent = (newEvent) => {
    const event = {
      id: Date.now(),
      ...newEvent,
      color: generateRandomColor(),
      createdAt: new Date().toISOString()
    }
    setEvents([...events, event])
    setIsModalOpen(false) // Close modal after adding event
  }

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const closeFullScreen = () => {
    setSelectedEvent(null)
  }

  return (
    <div className="app">
      <main className="app-main">
        <CountdownList
          events={events}
          onDeleteEvent={deleteEvent}
          onEventClick={handleEventClick}
        />

        <button
          className="add-button"
          onClick={() => setIsModalOpen(true)}
          aria-label="Add new event"
        >
          +
        </button>

        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>
              <AddEventForm onAddEvent={addEvent} />
            </div>
          </div>
        )}

        {selectedEvent && (
          <FullScreenCountdown
            event={selectedEvent}
            onClose={closeFullScreen}
          />
        )}
      </main>
    </div>
  )
}

export default App
