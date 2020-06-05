import { expect } from 'chai';

import Trip from '../src/Trip'
import trips from '../data/trips-sample';
import destinations from '../data/destinations-sample';

describe('Trip', () => {
  let trip

  beforeEach(() => {
    trip = new Trip(trips[0], destinations)
  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function')
  })

  it('should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceOf(Trip)
  })

  it('should be initialized with an id', () => {
    expect(trip.id).to.equal(1)
  })

  it('should be initialized with a userID', () => {
    expect(trip.userID).to.equal(1)
  })

  it('should be initialized with a destinationID', () => {
    expect(trip.destinationID).to.equal(4)
  })

  it('should be initialized with a number of travelers', () => {
    expect(trip.travelers).to.equal(1)
  })

  it('should be initialized with a date', () => {
    expect(trip.date).to.equal("2019/09/16")
  })

  it('should be initialized with a duration', () => {
    expect(trip.duration).to.equal(8)
  })

  it('should be initialized with status', () => {
    expect(trip.status).to.equal('pending')
  })

  it('should be initialized with status of pending by default', () => {
    expect(trip.status).to.equal('pending')
  })

  it('should be initialized with a list of activities', () => {
    expect(trip.suggestedActivities).to.deep.equal([])
  })

  it('should be able to find the destination data', () => {
    expect(trip.getDestination(destinations)).to.equal(destinations[3])
  })

  // it('should be print a message if the destinationsData is in the wrong format', () => {
  //   let data = {}
  //   expect(trip.getDestination(data)).to.equal(destinationsData[3])
  // })

  it('should be able to calculate the trip cost', () => {
    expect(trip.calculateTripCost()).to.equal(957)
  })
})