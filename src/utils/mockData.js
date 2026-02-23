export function getBusesForRoute(from, to) {
  const companies = ['Horizon Express', 'Volcano Express', 'Jaguar Bus', 'Royal Express']
  const times = [
    ['06:00', '09:30'],
    ['07:30', '11:00'],
    ['09:00', '12:30'],
    ['11:00', '14:30'],
  ]
  const basePrices = [3500, 4000, 4500, 5000]

  return companies.flatMap((company, ci) =>
    times.map(([dep, arr], ti) => ({
      id: `bus-${ci}-${ti}`,
      company,
      departure: dep,
      arrival: arr,
      price: basePrices[ci] + ti * 300,
      remainingSeats: Math.floor(Math.random() * 12) + 5,
    }))
  )
}

export function generateBookingReference() {
  return (
    'BK' +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  )
}
