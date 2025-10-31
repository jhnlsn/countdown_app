import { useState, useEffect, useRef } from 'react'
import { calculateTimeRemaining } from '../utils/dateUtils'

function CountdownItem({ event, onDelete, onClick, openCardId, setOpenCardId }) {
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [offset, setOffset] = useState(0)
  const startX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)
  const cardRef = useRef(null)

  const SWIPE_THRESHOLD = 100
  const DELETE_BUTTON_WIDTH = 100

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date(event.date + (event.time ? `T${event.time}` : ''))
      const remaining = calculateTimeRemaining(targetDate)
      setTimeRemaining(remaining)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [event.date, event.time])

  // Close card if another card opens
  useEffect(() => {
    if (openCardId !== event.id) {
      setOffset(0)
    }
  }, [openCardId, event.id])

  if (!timeRemaining) return null

  const isPast = timeRemaining.total <= 0
  const isOpen = openCardId === event.id

  const handleClick = (e) => {
    // Don't open overlay if clicking delete button or while dragging
    if (e.target.closest('.delete-btn-swipe') || isDragging.current) return
    // Close if clicking on an open card
    if (isOpen) {
      setOffset(0)
      setOpenCardId?.(null)
      return
    }
    onClick?.(event)
  }

  const handleStart = (clientX) => {
    startX.current = clientX
    currentX.current = clientX
    isDragging.current = true
  }

  const handleMove = (clientX) => {
    if (!isDragging.current) return

    currentX.current = clientX
    const diff = startX.current - currentX.current

    // Only allow dragging left (diff > 0)
    if (diff > 0) {
      setOffset(Math.min(diff, DELETE_BUTTON_WIDTH))
    } else if (isOpen) {
      // Allow dragging right to close when open
      setOffset(Math.max(0, DELETE_BUTTON_WIDTH + diff))
    }
  }

  const handleEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false

    const diff = startX.current - currentX.current

    if (diff > SWIPE_THRESHOLD) {
      // Swipe left - open
      setOffset(DELETE_BUTTON_WIDTH)
      setOpenCardId?.(event.id)
    } else if (isOpen && diff < -50) {
      // Swipe right while open - close
      setOffset(0)
      setOpenCardId?.(null)
    } else if (isOpen) {
      // Didn't swipe enough, stay open
      setOffset(DELETE_BUTTON_WIDTH)
    } else {
      // Didn't swipe enough, close
      setOffset(0)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(event.id)
  }

  return (
    <div className="countdown-item-wrapper" ref={cardRef}>
      <div
        className={`countdown-item ${isPast ? 'past' : ''}`}
        style={{
          backgroundColor: event.color || '#6366f1',
          transform: `translateX(-${offset}px)`,
        }}
        onClick={handleClick}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        {event.icon && <div className="event-icon">{event.icon}</div>}

        <div className="countdown-item-left">
          <h3 className="event-name">{event.name}</h3>

          <div className="event-date">
            {new Date(event.date + (event.time ? `T${event.time}` : '')).toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              ...(event.time && { hour: 'numeric', minute: '2-digit' })
            })}
          </div>
        </div>

        {isPast ? (
          <div className="countdown-display">
            <div className="time-unit">
              <span className="time-value">{Math.abs(timeRemaining.days)}</span>
              <span className="time-label">days ago</span>
            </div>
          </div>
        ) : (
          <div className="countdown-display">
            <div className="time-unit">
              <span className="time-value">{timeRemaining.days}</span>
              <span className="time-label">days</span>
            </div>
          </div>
        )}
      </div>

      <button
        className="delete-btn-swipe"
        onClick={handleDelete}
        aria-label="Delete event"
      >
        Delete
      </button>
    </div>
  )
}

export default CountdownItem
