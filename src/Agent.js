import fetchCalls from '../src/FetchCalls'
import moment from 'moment'
class Agent {

  searchTravelersByName(name, travelersData) {
    if(!Array.isArray(travelersData)) {
      console.log('The second argument must be an array')
    }
    return travelersData.find(traveler => traveler.name === name)
  }

  calculateAnnualRevenue(travelersData) {
    let travelersCost = travelersData.reduce((sum, traveler) => {
      sum += traveler.annualCost
      return sum
    }, 0)
    return Number((travelersCost * .10).toFixed(2))
  }

  getPendingTrips(tripsData) {
    return tripsData.filter(trip => trip.status === 'pending')
  }

  getCurrentTrips(date, tripsData) {
    return tripsData.filter(trip => {
      let start = moment(trip.date).format('YYYY/MM/DD');
      let end = moment(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')
      if(start <= date && date <= end) {
        return trip
      }
    })
  }

  //Need to call createTrips from index
  // changeStatus(id, status) {
  //   let postObj = {
  //     id: +id,
  //     status: status
  //   }
  //   return fetchCalls.modifyTripStatus(postObj)
  //     .then(() => fetchCalls.getTrips())
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err.message))
  // }

  // cancelTrip(id) {
  //   return fetchCalls.deleteTrip(id)
  //     .then(() => fetchCalls.getTrips())
  //     .catch(err => console.error(err.message))
  // }
}

export default Agent