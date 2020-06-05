import fetchCalls from '../src/FetchCalls'
class Agent {
  constructor() {
    this.annualRevenue = 0
  }
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

  changeStatus(trip, status) {
    let postObj = {
      id: trip.id,
      status: status
    }
    fetchCalls.modifyTripStatus(postObj)
      .then(response => response.json())
      .catch(err => console.error(err.message))
  }

  cancelTrip(trip) {
    fetchCalls.deleteTrip(trip.id)
      .then(response => response.json())
      .catch(err => console.error(err.message))
  }
}

export default Agent