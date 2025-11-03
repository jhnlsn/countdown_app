import { useState } from 'react'

const ICONS = [
  '🎂', '🎉', '🎁', '🎈', // celebrations
  '✈️', '🏖️', '🌴', '🗺️', // travel
  '💼', '📅', '⏰', '📝', // work/tasks
  '❤️', '💕', '💐', '💍', // love/anniversary
  '🎓', '📚', '🏆', '⚽', // education/sports
  '🍕', '🍰', '🎵', '🎬', // entertainment
]

function AddEventForm({ onAddEvent }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    icon: '🎉'
  })
  const [allDay, setAllDay] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.date) {
      alert('Please enter event name and date')
      return
    }

    // Only include time if not all day
    const eventData = {
      name: formData.name,
      date: formData.date,
      time: allDay ? '' : formData.time,
      icon: formData.icon
    }

    onAddEvent(eventData)

    // Reset form
    setFormData({
      name: '',
      date: '',
      time: '',
      icon: '🎉'
    })
    setAllDay(true)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleIconSelect = (icon) => {
    setFormData({
      ...formData,
      icon
    })
  }

  return (
    <div className="add-event-form">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Event Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Sarah's Birthday"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <div className="toggle-container">
            <span className="toggle-text">All Day</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {!allDay && (
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group">
          <label>Icon</label>
          <div className="icon-picker">
            {ICONS.map(icon => (
              <button
                key={icon}
                type="button"
                className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                onClick={() => handleIconSelect(icon)}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary">Add Event</button>
      </form>
    </div>
  )
}

export default AddEventForm
