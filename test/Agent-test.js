import { expect } from 'chai';

import Agent from '../src/Agent'
import Traveler from '../src/Traveler';
import travelers from '../data/travelers-sample';
import Trip from '../src/Trip';
import trips from '../data/trips-sample';
import destinations from '../data/destinations-sample';

describe('Agent', () => {
  let agent, tripsData

  beforeEach(() => {
    agent = new Agent
    tripsData = trips.map(trip => new Trip(trip))
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

  // it('should return a message if the name is not found', () => {
  //   expect(agent.searchTravelersByName('Silly Da Widow', travelers)).to.equal(travelers[2])
  // })

  // it('should be return a message if the data is not an array', () => {
  //   expect(agent.searchTravelersByName('Sibby Dawidowitsch', travelersData)).to.equal(travelers[2])
  // })

  it('should be able to calculate the annual revenue', () => {
    let travelersRepo = travelers.map(traveler => new Traveler(traveler, tripsData, destinations))
    expect(agent.calculateAnnualRevenue(travelersRepo, destinations)).to.equal(1745.7)
  })

  //SPIES
  // it('should be able to change the status of a trip', () => {
  //   agent.changeStatus(tripsData[0], 'approved')
  // })

  // it('should be able to cancel a trip', () => {
  //   agent.cancelTrip(tripsData[0])
  // })
})