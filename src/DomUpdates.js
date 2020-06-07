import Agent from "./Agent"
import moment from 'moment'

const domUpdates = {
  date: moment().format('YYYY/MM/DD'),

  loadAgentDash(agent, travelersData, tripsRepo) {
    document.getElementById('agent-trip-btn-container').classList.remove('hide')
    document.getElementById('welcome-msg').innerText = 'Welcome, Agent'
    document.getElementById('dollar-amt').innerText = `Annual Revenue: ${agent.calculateAnnualRevenue(travelersData)}`
    document.getElementById('search-input-title').innerText = 'Search Travelers'
    document.getElementById('search-input').placeholder = 'Enter name...'
    this.displayAgentTrips(agent.getPendingTrips(tripsRepo))
    document.getElementById('main-title').innerText = 'Pending Trips'
    document.getElementById('main').classList.remove('hide')
    document.getElementById('login').classList.add('hide')
  },

  loadTravelerDash(traveler, destinations) {
    document.getElementById('traveler-trip-btn-container').classList.remove('hide')
    document.getElementById('welcome-msg').innerText = `Welcome, ${traveler.name}`
    document.getElementById('dollar-amt').innerText = `Annual Amount Spent: $${traveler.annualCost}`
    document.getElementById('main-title').innerText = 'Search Destinations'
    document.getElementById('search-input').placeholder = 'Enter Destination...'
    this.displayDestinations(destinations)
    this.displayTravelerPending(traveler, destinations)
    document.getElementById('main').classList.remove('hide')
    document.getElementById('login').classList.add('hide')
  },

  displayAgentTrips(trips) {
    document.getElementById('main-content-results').innerHTML = ''
    trips.forEach(trip => {
      document.getElementById('main-content-results').insertAdjacentHTML('afterbegin', `
        <div id='agent-trip-card'>
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
    document.getElementById('aside-results').innerHTML = ''
    trips.forEach(trip => {
      document.getElementById('aside-results').insertAdjacentHTML('afterbegin', `
        <div id='trip-card'>
          <p id='trip-card-name'>${trip.getDestination(destinationsData).destination}</p>
          <div id='trip-card-body'>
            <div id='trip-card-ids'>
              <p>Date: ${trip.date}</p>
              <p>TripID: ${trip.id}</p>
            </div>
            <div id='trip-card-info'>
              <p>Duration: ${trip.duration}</p>
              <p>Status: ${trip.status.toUpperCase()}</p>
            </div>
          </div>
        </div>
      `)
    })
  },

  filterAgentTrips(e, agent, tripsRepo) {
    if (e.target.id === 'agent-pending') {
      this.displayAgentTrips(agent.getPendingTrips(tripsRepo))
      document.getElementById('main-title').innerText = 'Pending Trips'
    }
    if (e.target.id === 'agent-current') {
      this.displayAgentTrips(agent.getCurrentTrips(this.date, tripsRepo))
      document.getElementById('main-title').innerText = 'Current Trips'
    }
    if (e.target.id === 'agent-all') {
      this.displayAgentTrips(tripsRepo)
      document.getElementById('main-title').innerText = 'All Trips'
    }
  },

  displayTravelerPending(traveler, destinationsData) {
    document.getElementById('aside-title-text').innerText = 'Pending Trips'
    let pending = traveler.allTrips.filter(trip => trip.status === 'pending')
    if (pending.length === 0) {
      document.getElementById('aside-results').innerHTML = '<p>No trips awaiting approval</p>'
    } else {
      this.displayTravelerTrips(pending, destinationsData)
    }
  },

  displayTravelerPast(traveler, destinationsData) {
    document.getElementById('aside-title-text').innerText = 'Past Trips'
    let past = traveler.filterTripsByDate(this.date, 'before')
    if (past.length === 0) {
      document.getElementById('aside-results').innerHTML = '<p>No past trips</p>'
    } else {
      this.displayTravelerTrips(past, destinationsData)
      console.log(document.getElementById('aside-title-text'))
    }
  },

  displayTravelerCurrent(traveler, destinationsData) {
    document.getElementById('aside-title-text').innerText = 'Current Trips'
    let current = traveler.getCurrentTrips(this.date)
    if (current.length === 0) {
      document.getElementById('aside-results').innerHTML = '<p>No current trips</p>'
    } else {
      this.displayTravelerTrips(current, destinationsData)
    }
  },

  displayTravelerUpcoming(traveler, destinationsData) {
    document.getElementById('aside-title-text').innerText = 'Upcoming Trips'
    let upcoming = traveler.filterTripsByDate(this.date, 'after')
    if (upcoming.length === 0) {
      document.getElementById('aside-results').innerHTML = '<p>No upcoming trips</p>'
    } else {
      this.displayTravelerTrips(upcoming, destinationsData)
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
      document.getElementById('main-content-results').insertAdjacentHTML('beforeend', `
        <div class='destination-card' id='${destination.id}'>
          <div class='destination-info'>
            <img src='${destination.image}' alt='${destination.alt}'>
            <div class='destination-costs'>
              <h3 class='destination-title'>${destination.destination}</h3>
              <p>Estimated Lodging: $${destination.estimatedLodgingCostPerDay} / day</p>
              <p>Estimated Flight: $${destination.estimatedFlightCostPerPerson} / person</p>
              <button class='plan-trip-btn'>Plan A Trip</button>
            </div>
          </div>
        </div>
      `) 
    })
  },

  filterDestinations(destinationsRepo) {
    document.getElementById('main-content-results').innerHTML = ''
    let search = document.getElementById('search-input')
    let searched = destinationsRepo.filter(destination => {
      return destination.destination.toLowerCase().includes(search.value.toLowerCase())
    })
    this.displayDestinations(searched)
  },

  displayPostForm(e) {
    let destination = e.target.parentNode
    document.getElementById('plan-trip-title').innerHTML = `<p id='${destination.parentNode.parentNode.id}'>Plan a trip to ${destination.firstElementChild.innerText}</p>`
    document.getElementById('departure-date').value = moment().format('YYYY-MM-DD')    
    document.getElementById('plan-trip').classList.remove('hide')
  },

  resetTravelerPostForm() {
    document.getElementById('plan-trip').reset()
    document.getElementById('departure-date').value = moment().format('YYYY-MM-DD')
    document.getElementById('plan-trip').classList.add('hide')
  },

  displayConfirmation(trip, destinationsData) {
    let destination = trip.getDestination(destinationsData)
    let returnDate = document.getElementById('return-date').value
    document.getElementById('plan-trip-confirmation').classList.remove('hide')
    document.getElementById('plan-trip-confirmation-title').innerText = `Confirm your trip to ${destination.destination}`
    document.getElementById('image-confirmation').src = destination.image
    document.getElementById('departure-date-confirmation').innerText = `Departure Date: ${trip.date}`
    document.getElementById('return-date-confirmation').innerText = `Return Date: ${moment(returnDate).format('YYYY/MM/DD')}`
    document.getElementById('num-people-confirmation').innerText = `Number of Travelers: ${trip.travelers}`
    document.getElementById('estimated-cost').innerText = `Estimated Cost: $${trip.calculateTripCost(destinationsData)}`
  }
}

export default domUpdates