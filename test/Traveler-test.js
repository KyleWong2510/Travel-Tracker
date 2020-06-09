import { expect } from 'chai';

import Traveler from '../src/Traveler';
import travelers from '../data/travelers-sample';
import Trip from '../src/Trip';
import trips from '../data/trips-sample';
import destinations from '../data/destinations-sample';

describe('Traveler', () => {
  let traveler, tripsData
  
  beforeEach(() => {
    tripsData = trips.map(trip => new Trip(trip))
    traveler = new Traveler(travelers[0], tripsData, destinations)
  })

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  })

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler)
  })

  it('should be initialized with an id', () => {
    expect(traveler.id).to.equal(1)
  })

  it('should be initialized with a name', () => {
    expect(traveler.name).to.equal("Ham Leadbeater")
  })

  it('should be initialized with a traveler type', () => {
    expect(traveler.travelerType).to.equal("relaxer")
  })

  it('should hold a list of all of their trips', () => {
    expect(traveler.allTrips).to.deep.equal([tripsData[0], tripsData[1], tripsData[4]])
  })

  it('should print a message if the argument passed is the wrong data type', () => {
    let badTripData = 'trips'
    expect(traveler.getTravelerTrips(badTripData)).to.equal('The array is not valid')
  })

  it('should be able to return trips before a given date', () => {
    traveler.getTravelerTrips(tripsData)
    expect(traveler.filterTripsByDate('2020/10/05', 'before')).to.deep.equal([tripsData[0], tripsData[1], tripsData[4]])
  })

  it('should be able to return trips after a given date', () => {
    traveler.getTravelerTrips(tripsData)
    expect(traveler.filterTripsByDate('2020/09/04', 'after')).to.deep.equal([tripsData[1]])
  })

  it('should still work if the date is in another format', () => {
    traveler.getTravelerTrips(tripsData)
    expect(traveler.filterTripsByDate('Sept. 4, 2020', 'after')).to.deep.equal([tripsData[1]])
  })

  it('should print a message if the time parameter is not valid', () => {
    traveler.getTravelerTrips(tripsData)
    expect(traveler.filterTripsByDate('2020/04/30', 'now')).to.equal('Invalid time argument')
  })

  // HOW TO TEST FOR A DYNAMIC DATE?
  it.skip('should be able to calculate a total cost for trips this calendar year', () => {
    expect(traveler.calculateAnnualCost(destinations)).to.equal(10505)
    expect(traveler.annualCost).to.equal(10505)
  })
})
