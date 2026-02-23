export function generateBookingReference() {
  return (
    'BK' +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  )
}
