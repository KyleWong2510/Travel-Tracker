import fetchCalls from '../src/FetchCalls'
import moment from 'moment'
class Agent {

  searchTravelersByName(name, travelersData) {
    if(!Array.isArray(travelersData) || travelersData.length === 0) {
      console.log('The array is not valid')
      return 'The array is not valid'
    }

    let foundUser = travelersData.find(traveler => traveler.name === name)
    return foundUser === undefined ? 'Name not found' : foundUser
  }

  calculateAnnualRevenue(travelersData) {
    if(!Array.isArray(travelersData) || travelersData.length === 0) {
      console.log('The array is not valid')
      return 'The array is not valid'
    }

    let travelersCost = travelersData.reduce((sum, traveler) => {
      sum += traveler.annualCost
      return sum
    }, 0)
    return Number((travelersCost * .10).toFixed(2))
  }

  getPendingTrips(tripsData) {
    if(!Array.isArray(tripsData) || tripsData.length === 0) {
      console.log('The array is not valid')
      return 'The array is not valid'
    }

    return tripsData.filter(trip => trip.status === 'pending')
  }

  getCurrentTrips(date, tripsData) {
    if(!Array.isArray(tripsData) || tripsData.length === 0) {
      console.log('The array is not valid')
      return 'The array is not valid'
    }

    let formattedDate = moment(date).format('YYYY/MM/DD')
    if(formattedDate === 'Invalid date') {
      console.log('You must enter a date as a string');
      return'You must enter a date as a string'
    }
    return tripsData.filter(trip => {
      let start = moment(trip.date).format('YYYY/MM/DD');
      let end = moment(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')
      if(start <= formattedDate && formattedDate <= end) {
        return trip
      }
    })
  }

  changeStatus(id, status) {
    let postObj = {
      id: +id,
      status: status
    }
    return fetchCalls.modifyTripStatus(postObj)
      .then(() => fetchCalls.getTrips())
      .catch(err => console.error(err.message))
  }

  cancelTrip(id) {
    return fetchCalls.deleteTrip(id)
      .then(() => fetchCalls.getTrips())
      .catch(err => console.error(err.message))
  }
}

export default Agent