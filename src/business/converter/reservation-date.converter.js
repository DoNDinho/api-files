'use strict'
const parseReservationDate = (reservationData) => {
  return {
    code: reservationData.ID_FECHA,
    name: parseDate(reservationData.FECHA)
  }
}

const parseDate = (date) => {
  return date.toISOString().split('T')[0]
}

module.exports = { parseReservationDate }
