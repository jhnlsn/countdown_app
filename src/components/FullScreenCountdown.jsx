import { useState, useEffect } from 'react'
import { calculateTimeRemaining } from '../utils/dateUtils'

function FullScreenCountdown({ event, onClose, onEdit }) {
  const [timeRemaining, setTimeRemaining] = useState(null)

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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!timeRemaining) return null

  const isPast = timeRemaining.total <= 0

  return (
    <div className="fullscreen-overlay" onClick={onClose}>
      <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="fullscreen-edit"
          onClick={() => onEdit(event)}
          aria-label="Edit event"
        >
          ✏️
        </button>
        <button
          className="fullscreen-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="fullscreen-header">
          {event.icon && <div className="fullscreen-icon">{event.icon}</div>}
          <h1 className="fullscreen-title">{event.name}</h1>
          <div className="fullscreen-date">
            {new Date(event.date + (event.time ? `T${event.time}` : '')).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              ...(event.time && { hour: 'numeric', minute: '2-digit' })
            })}
          </div>
        </div>

        <div className="fullscreen-countdown">
          <div className="fullscreen-time-unit">
            <span className="fullscreen-time-value">{Math.abs(timeRemaining.days)}</span>
            <span className="fullscreen-time-label">{isPast ? 'Days Ago' : 'Days'}</span>
          </div>
          <div className="fullscreen-time-unit">
            <span className="fullscreen-time-value">{Math.abs(timeRemaining.hours)}</span>
            <span className="fullscreen-time-label">{isPast ? 'Hours Ago' : 'Hours'}</span>
          </div>
          <div className="fullscreen-time-unit">
            <span className="fullscreen-time-value">{Math.abs(timeRemaining.minutes)}</span>
            <span className="fullscreen-time-label">{isPast ? 'Minutes Ago' : 'Minutes'}</span>
          </div>
          <div className="fullscreen-time-unit">
            <span className="fullscreen-time-value">{Math.abs(timeRemaining.seconds)}</span>
            <span className="fullscreen-time-label">{isPast ? 'Seconds Ago' : 'Seconds'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullScreenCountdown
