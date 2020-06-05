let date = '2020/10/15'

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
    if (time === 'on') {
      return this.allTrips.filter(trip => trip.date === date)
    }
    if (time === 'after') {
      return this.allTrips.filter(trip => trip.date > date)
    }
  }

  calculateAnnualCost(destinationsData) {
    let year = date.split('/')[0]
    return this.allTrips.reduce((sum, trip) => {
      if(trip.date.split('/')[0] === year && trip.date < date) {
        sum += trip.calculateTripCost(destinationsData)
      }
      return sum
    }, 0)
  }
}

export default Traveler