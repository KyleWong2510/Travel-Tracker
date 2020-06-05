import { expect } from 'chai';

import Traveler from '../src/Traveler';
import travelers from '../data/travelers-sample';
import trips from '../data/trips-sample';
import destinations from '../data/destinations-sample';

describe('Traveler', () => {
  let traveler, tripData, destinationData,
  trip1, trip2, trip3, trip4, trip5
  
  beforeEach(() => {
    traveler = new Traveler(travelers[0])
    tripData = trips
    destinationData = destinations
    trip1 = trips[0]
    trip2 = trips[1]
    trip3 = trips[2]
    trip4 = trips[3]
    trip5 = trips[4]
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
    traveler.getTravelerTrips(trips)
    expect(traveler.allTrips).to.deep.equal([trip1, trip2, trip5])
  })

  it('should print a message if the argument passed is the wrong data type', () => {
    let badTripData = 'trips'
    expect(() => traveler.getTravelerTrips(badTripData)).to.throw(Error('Wrong data type'))
    // expect(console.log).to.have.been.called(1)
    // expect(console.log.calledWith('sorry, charlie'))
  })

  it('should be able to return trips before a given date', () => {
    traveler.getTravelerTrips(tripData)
    expect(traveler.filterTripsByDate('2020/10/05', 'before')).to.deep.equal([trip1, trip2, trip5])
  })

  it('should be able to return trips after a given date', () => {
    traveler.getTravelerTrips(tripData)
    expect(traveler.filterTripsByDate('2020/09/04', 'after')).to.deep.equal([trip2])
  })

  it('should be able to return trips on a given date', () => {
    traveler.getTravelerTrips(tripData)
    expect(traveler.filterTripsByDate('2020/04/30', 'on')).to.deep.equal([trip5])
  })

  it('should print a message if the date parameter is not valid', () => {
    traveler.getTravelerTrips(tripData)
    expect(traveler.filterTripsByDate('2020-04-30', 'on')).to.throw(Error(''))
  })

  it('should print a message if the time parameter is not valid', () => {
    traveler.getTravelerTrips(tripData)
    expect(traveler.filterTripsByDate('2020/04/30', 'now')).to.throw(Error(''))
  })

  it('should be able to calculate a total cost for trips this calendar year', () => {
    traveler.getTravelerTrips(tripData)

  })

})
