class Trip {
  constructor(trip) {
    this.id = trip.id
    this.userID = trip.userID
    this.destinationID = trip.destinationID
    this.travelers = trip.travelers
    this.date = trip.date
    this.duration = trip.duration
    this.status = trip.status || 'pending'
    this.suggestedActivities = trip.suggestedActivities
  }

  getDestination(destinationsData) {
    if(!Array.isArray(destinationsData) || destinationsData.length === 0) {
      console.log('The array is not valid')
      return 'The array is not valid'
    }

    return destinationsData.find(destination => destination.id === this.destinationID)
  }

  calculateTripCost(destinationsData) {
    if(!Array.isArray(destinationsData) || destinationsData.length === 0) {
      console.log('The array is not valid')
      return 'The array is not valid'
    }

    let destination = this.getDestination(destinationsData)
    let airfare = this.travelers * destination.estimatedFlightCostPerPerson
    let lodging = this.duration * destination.estimatedLodgingCostPerDay
    let agentFee = (airfare + lodging) * .10
    return Number((airfare + lodging + agentFee).toFixed(2))
  }
}

export default Trip