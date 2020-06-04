import { expect } from 'chai';

import Traveler from '../src/Traveler';
import travelers from '../test/TravelersSampleData'
import 

describe('Traveler', () => {
  let traveler

  beforeEach(() => {
    traveler = new Traveler(travelers[0])
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
    traveler.getTravelerTrips(tripsData)
    expect(traveler.name).to.equal("Ham Leadbeater")
  })
})
