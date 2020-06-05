let date = '2020/10/15'

class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.totalInvested = 0;
    this.allTrips = []
  }

  getTravelerTrips(tripsData) {
    if(!Array.isArray(tripsData) || tripsData.length < 1) {
      throw Error('Wrong data type')
    }
    this.allTrips = tripsData.filter(trip => trip.userID === this.id)
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

  calculateAnnualCost() {
    let year = date.split('/')[0]
    return this.allTrips.reduce((sum, trip) => {
      if(trip.date.split('/')[0] === year && trip.date < date) {
        sum += trip.calculateTripCost()
      }
      return sum
    }, 0)
  }
}

export default Traveler