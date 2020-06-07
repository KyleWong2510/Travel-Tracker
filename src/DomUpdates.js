import Agent from "./Agent"
import moment from 'moment'

const domUpdates = {
  date: moment().format('YYYY/MM/DD'),

  loadAgentDash(agent, travelersData) {
    document.getElementById('agent-trip-btn-container').classList.remove('hide')
    document.getElementById('welcome-msg').innerText = 'Welcome, Agent'
    document.getElementById('dollar-amt').innerText = `Annual Revenue: ${agent.calculateAnnualRevenue(travelersData)}`
    document.getElementById('search-input-title').innerText = 'Search Travelers'
    document.getElementById('search-input').placeholder = 'Enter name...'
    document.getElementById('main').classList.remove('hide')
    document.getElementById('login').classList.add('hide')
  },

  loadTravelerDash(traveler, destinations) {
    document.getElementById('traveler-trip-btn-container').classList.remove('hide')
    document.getElementById('welcome-msg').innerText = `Welcome, ${traveler.name}`
    document.getElementById('dollar-amt').innerText = `Annual Amount Spent: ${traveler.annualCost}`
    document.getElementById('search-input-title').innerText = 'Search Destinations'
    document.getElementById('search-input').placeholder = 'Enter Destination...'
    this.displayDestinations(destinations)
    document.getElementById('main').classList.remove('hide')
    document.getElementById('login').classList.add('hide')
  },

  displayAgentTrips(trips) {
    document.getElementById('main-content-results').innerHTML = ''
    trips.forEach(trip => {
      document.getElementById('main-content-results').insertAdjacentHTML('afterbegin', `
        <div id='trip-card'>
          <div id='trip-card-ids'>
            <p>TripID: ${trip.id}</p>
            <p>TravelerID: ${trip.userID}</p>
            <p>DestinationID: ${trip.destinationID}</p>
          </div>
          <div id='trip-card-info'>
            <p>Date: ${trip.date}</p>
            <p>Duration: ${trip.duration}</p>
            <p>Status: ${trip.status}</p>
          </div>
          <div id='status-btns'>
            <button>Approve</button>
            <button>Deny</button>
          </div>
        </div>
      `)
    })
  },

  displayTravelerTrips(trips, destinationsData) {
    document.getElementById('main-content-results').innerHTML = ''
    trips.forEach(trip => {
      document.getElementById('main-content-results').insertAdjacentHTML('afterbegin', `
        <div id='trip-card'>
          <div id='trip-card-ids'>
          <p>${trip.getDestination(destinationsData).destination}</p>
            <p>TripID: ${trip.id}</p>
          </div>
          <div id='trip-card-info'>
            <p>Date: ${trip.date}</p>
            <p>Duration: ${trip.duration}</p>
            <p>Status: ${trip.status.toUpperCase()}</p>
          </div>
        </div>
      `)
    })
  },

  filterAgentTrips(e, agent, tripsRepo) {
    if (e.target.id === 'agent-pending') {
      this.displayAgentTrips(agent.getPendingTrips(tripsRepo))
      document.getElementById('trip-title').innerText = 'Pending Trips'
    }
    if (e.target.id === 'agent-current') {
      this.displayAgentTrips(agent.getCurrentTrips(this.date, tripsRepo))
      document.getElementById('trip-title').innerText = 'Current Trips'
    }
    if (e.target.id === 'agent-all') {
      this.displayAgentTrips(tripsRepo)
      document.getElementById('trip-title').innerText = 'All Trips'
    }
  },

  displayTravelerPending(traveler, destinationsData) {
    let pending = traveler.allTrips.filter(trip => trip.status === 'pending')
    if (pending.length === 0) {
      document.getElementById('main-content-results').innerHTML = '<p>No trips awaiting approval</p>'
    } else {
      this.displayTravelerTrips(pending, destinationsData)
      document.getElementById('trip-title').innerText = 'Pending Trips'
    }
  },

  displayTravelerPast(traveler, destinationsData) {
    let past = traveler.filterTripsByDate(this.date, 'before')
    if (past.length === 0) {
      document.getElementById('main-content-results').innerHTML = '<p>No past trips</p>'
    } else {
      this.displayTravelerTrips(past, destinationsData)
      document.getElementById('trip-title').innerText = 'Past Trips'
    }
  },

  displayTravelerCurrent(traveler, destinationsData) {
    let current = traveler.getCurrentTrips(this.date)
    if (current.length === 0) {
      document.getElementById('main-content-results').innerHTML = '<p>No current trips</p>'
    } else {
      this.displayTravelerTrips(current, destinationsData)
      document.getElementById('trip-title').innerText = 'Current Trips'
    }
  },

  displayTravelerUpcoming(traveler, destinationsData) {
    let upcoming = traveler.filterTripsByDate(this.date, 'after')
    if (upcoming.length === 0) {
      document.getElementById('main-content-results').innerHTML = '<p>No upcoming trips</p>'
    } else {
      this.displayTravelerTrips(upcoming, destinationsData)
      document.getElementById('trip-title').innerText = 'Upcoming Trips'
    }
  },

  filterTravelerTrips(e, traveler, destinationsData) {
    if (e.target.id === 'traveler-pending') {
      this.displayTravelerPending(traveler, destinationsData)
    }
    if (e.target.id === 'traveler-past') {
      this.displayTravelerPast(traveler, destinationsData)
    }
    if (e.target.id === 'traveler-current') {
      this.displayTravelerCurrent(traveler, destinationsData)
    }
    if (e.target.id === 'traveler-upcoming') {
      this.displayTravelerUpcoming(traveler, destinationsData)
    }
  },

  displayDestinations(destinationsRepo) {
    destinationsRepo.forEach(destination => {
      document.getElementById('search-list').insertAdjacentHTML('beforeend', `
        <div class='destination-card' id='${destination.id}'>
          <h3 class='destination-title'>${destination.destination}</h3>
          <img src='${destination.image}' alt='${destination.alt}'>
          <p>Estimated Lodging: $${destination.estimatedLodgingCostPerDay} / day</p>
          <p>Estimated Flight: $${destination.estimatedFlightCostPerPerson} / person</p>
          <button class='plan-trip-btn'>Plan A Trip</button>
        </div>
      `) 
    })
  },

  filterDestinations(destinationsRepo) {
    document.getElementById('search-list').innerHTML = ''
    let search = document.getElementById('search-input')
    let searched = destinationsRepo.filter(destination => {
      return destination.destination.toLowerCase().includes(search.value.toLowerCase())
    })
    this.displayDestinations(searched)
  }
}

export default domUpdates