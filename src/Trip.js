import destinations from "../data/destinations-sample"

class Trip {
  constructor(trip, destinationsData) {
    this.id = trip.id
    this.userID = trip.userID
    this.destinationID = trip.destinationID
    this.travelers = trip.travelers
    this.date = trip.date
    this.duration = trip.duration
    this.status = trip.status || 'pending'
    this.suggestedActivities = trip.suggestedActivities
    this.destinationInfo = this.getDestination(destinationsData)
  }

  getDestination(destinationsData) {
    return destinationsData.find(destination => destination.id === this.destinationID)
  }

  calculateTripCost() {
    let airfare = this.travelers * this.destinationInfo.estimatedFlightCostPerPerson
    let lodging = this.duration * this.destinationInfo.estimatedLodgingCostPerDay
    let agentFee = (airfare + lodging) * .10
    return Number((airfare + lodging + agentFee).toFixed(2))
  }
}

export default Trip