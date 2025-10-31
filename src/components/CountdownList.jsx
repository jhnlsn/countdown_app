import { useState, useEffect, useRef } from 'react'
import CountdownItem from './CountdownItem'

function CountdownList({ events, onDeleteEvent, onEventClick }) {
  const [openCardId, setOpenCardId] = useState(null)
  const listRef = useRef(null)

  // Close card on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openCardId && listRef.current && !listRef.current.contains(e.target)) {
        setOpenCardId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [openCardId])

  if (events.length === 0) {
    return (
      <div className="countdown-list empty">
        <h2>Countdowns</h2>
        <p>No events yet. Click the + button to add your first countdown!</p>
      </div>
    )
  }

  // Sort events by date (earliest first)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date + (a.time ? `T${a.time}` : ''))
    const dateB = new Date(b.date + (b.time ? `T${b.time}` : ''))
    return dateA - dateB
  })

  return (
    <div className="countdown-list" ref={listRef}>
      <h2>Countdowns</h2>
      <div className="countdown-grid">
        {sortedEvents.map(event => (
          <CountdownItem
            key={event.id}
            event={event}
            onDelete={onDeleteEvent}
            onClick={onEventClick}
            openCardId={openCardId}
            setOpenCardId={setOpenCardId}
          />
        ))}
      </div>
    </div>
  )
}

export default CountdownList
