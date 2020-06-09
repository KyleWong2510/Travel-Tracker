import moment from 'moment'

class Traveler {
  constructor(traveler, tripsData, destinationsData) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.allTrips = this.getTravelerTrips(tripsData)
    this.annualCost = this.calculateAnnualCost(destinationsData)
  }

  getTravelerTrips(tripsData) {
    if(!Array.isArray(tripsData) || tripsData.length === 0) {
      console.log('The array is not valid')
      return 'The array is not valid'
    }

    return tripsData.filter(trip => trip.userID === this.id)
  }

  filterTripsByDate(date, time) {
    let formattedDate = moment(date).format('YYYY/MM/DD')
    if(formattedDate === 'Invalid date') {
      console.log('You must enter a date as a string');
      return'You must enter a date as a string'
    }
    if(time !== 'before' && time !== 'after') {
      console.log('Invalid time argument')
      return 'Invalid time argument'
    }

    if (time === 'before') {
      return this.allTrips.filter(trip => trip.date < formattedDate)
    }
    if (time === 'after') {
      return this.allTrips.filter(trip => trip.date > formattedDate)
    }
  }

  getCurrentTrips(date) {
    let formattedDate = moment(date).format('YYYY/MM/DD')
    if(formattedDate === 'Invalid date') {
      console.log('You must enter a date as a string');
      return'You must enter a date as a string'
    }

    return this.allTrips.filter(trip => {
      let start = moment(trip.date).format('YYYY/MM/DD');
      let end = moment(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')
      if(start <= formattedDate && formattedDate <= end) {
        return trip
      }
    })
  }

  calculateAnnualCost(destinationsData) {
    if(!Array.isArray(destinationsData) || destinationsData.length === 0) {
      console.log('The array is not valid')
      return 'The array is not valid'
    }

    let date = moment().format('YYYY/MM/DD')
    let year = date.split('/')[0]
    return this.allTrips.reduce((sum, trip) => {
      if(trip.date.split('/')[0] === year && trip.status === 'approved') {
        sum += trip.calculateTripCost(destinationsData)
      }
      return sum
    }, 0)
  }
}

export default Traveler