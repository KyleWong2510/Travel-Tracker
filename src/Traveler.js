// let date = '2020/10/15'
import moment from 'moment'
import fetchCalls from '../src/FetchCalls'

class Traveler {
  constructor(traveler, tripsData, destinationsData) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.allTrips = this.getTravelerTrips(tripsData)
    this.annualCost = this.calculateAnnualCost(destinationsData)
  }

  getTravelerTrips(tripsData) {
    if(!Array.isArray(tripsData) || tripsData.length < 1) {
      return console.log('Wrong data type')
    }
    return tripsData.filter(trip => trip.userID === this.id)
  }

  filterTripsByDate(date, time) {
    if (time === 'before') {
      return this.allTrips.filter(trip => trip.date < date)
    }
    if (time === 'after') {
      return this.allTrips.filter(trip => trip.date > date)
    }
  }

  //pass arr and have agent and traveler inherit?
  getCurrentTrips(date) {
    return this.allTrips.filter(trip => {
      let start = moment(trip.date).format('YYYY/MM/DD');
      let end = moment(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')
      if(start <= date && date <= end) {
        return trip
      }
    })
  }

  calculateAnnualCost(destinationsData) {
    let date = moment().format('YYYY/MM/DD')
    let year = date.split('/')[0]
    return this.allTrips.reduce((sum, trip) => {
      if(trip.date.split('/')[0] === year) {
        sum += trip.calculateTripCost(destinationsData)
      }
      return sum
    }, 0)
  }

  createTrip(tripInfo) {
    let postObj = {
      id: Date.now(),
      userID: this.id,
      destinationID: tripInfo.destinationID,
      travelers: tripInfo.travelers,
      date: tripInfo.date,
      duration: tripInfo.duration,
      status: 'pending',
      suggestedActivities: []
    }
    fetchCalls.postNewTrip(postObj)
      .then(response => console.log(response))
      .catch(err => console.error(err.message))
  }
}

export default Traveler