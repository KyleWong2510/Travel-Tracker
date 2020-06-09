import { expect } from 'chai'

import Agent from '../src/Agent'
import Traveler from '../src/Traveler';
import travelers from '../data/travelers-sample';
import Trip from '../src/Trip';
import trips from '../data/trips-sample';
import destinations from '../data/destinations-sample';

describe('Agent', () => {
  let agent, tripsData

  beforeEach(() => {
    tripsData = trips.map(trip => new Trip(trip))
    agent = new Agent
  })

  it('should be a function', () => {
    expect(Agent).to.be.a('function')
  })

  it('should be an instance of Agent', () => {
    expect(agent).to.be.an.instanceOf(Agent)
  })

  it('should be able to search travelers', () => {
    expect(agent.searchTravelersByName('Sibby Dawidowitsch', travelers)).to.equal(travelers[2])
  })

  it('should return a message if the name is not found', () => {
    expect(agent.searchTravelersByName('Silly Da Widow', travelers)).to.equal('Name not found')
  })

  it('should be return a message if the data is not an array', () => {
    let travelerData = 'Data'
    expect(agent.searchTravelersByName('Sibby Dawidowitsch', travelerData)).to.equal('The array is not valid')
  })

  it.skip('should be able to calculate the annual revenue', () => {
    let travelersRepo = travelers.map(traveler => new Traveler(traveler, tripsData, destinations))
    expect(agent.calculateAnnualRevenue(travelersRepo, destinations)).to.equal(1745.7)
  })

  it('should be able to get pending trips', () => {
    expect(agent.getPendingTrips(tripsData)).to.deep.equal([tripsData[0], tripsData[1], tripsData[2]])
  })

  it('should return a message if the argument is not an array', () => {
    let tripsList = {trip: 'Trippy'}
    expect(agent.getPendingTrips(tripsList)).to.equal('The array is not valid')
  })

  it('should return a message if the array is empty ', () => {
    expect(agent.getPendingTrips([])).to.equal('The array is not valid')
  })

  it('should be able to get current trips', () => {
    expect(agent.getCurrentTrips('2020/05/23', tripsData)).to.deep.equal([tripsData[2], tripsData[4]])
  })

  it('should still work if the date entered is in a different format', () => {
    expect(agent.getCurrentTrips('05/23/20', tripsData)).to.deep.equal([tripsData[2], tripsData[4]])
  })

  it('should return a message if the date entered is not a date', () => {
    expect(agent.getCurrentTrips('date', tripsData)).to.equal('You must enter a date as a string')
  })

  it('should return a message if the argument is not an array', () => {
    let tripsList = {trip: 'Trippy'}
    expect(agent.getPendingTrips(tripsList)).to.equal('The array is not valid')
  })
})