/**
 * Calculate time remaining until a target date
 * @param {Date} targetDate - The target date to count down to
 * @returns {Object} Object containing days, hours, minutes, seconds, and total milliseconds
 */
export function calculateTimeRemaining(targetDate) {
  const now = new Date()
  const total = targetDate - now

  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  }
}
