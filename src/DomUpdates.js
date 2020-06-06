import Agent from "./Agent"
import moment from 'moment'

const domUpdates = {
  date: moment().format('YYYY/MM/DD'),

  loadAgent(agent, travelersData) {
    document.getElementById('agent-trip-btn-container').classList.remove('hide')
    document.getElementById('welcome-msg').innerText = 'Welcome, Agent'
    document.getElementById('dollar-amt').innerText = `Annual Revenue: ${agent.calculateAnnualRevenue(travelersData)}`
    document.getElementById('search-input-title').innerText = 'Search Travelers'
    document.getElementById('search-input').placeholder = 'Enter name...'
    document.getElementById('main').classList.remove('hide')
    document.getElementById('login').classList.add('hide')
  },
  
  //do same as above
  loadTraveler() {
    document.getElementById('traveler-trip-btn-container').classList.remove('hide')
    document.getElementById('welcome-msg').innerText = 'Welcome, traveler'
    document.getElementById('dollar-amt').innerText = 'Annual Amount Spent: '
    document.getElementById('search-input-title').innerText = 'Search Destinations'
    document.getElementById('search-input').placeholder = 'Enter Destination...'
    document.getElementById('main').classList.remove('hide')
    document.getElementById('login').classList.add('hide')
  },

  displayTrips(trips) {
    document.getElementById('main-content-results').innerHTML = ''
    trips.forEach(trip => {
      document.getElementById('main-content-results').insertAdjacentHTML('afterbegin', `
        <div id='trip-card'>
          <div id='trip-card-ids'>
            <p>TripID: ${trip.id}</p>
            <p>UserID: ${trip.userID}</p>
            <p>DestinationID: ${trip.destinationID}</p>
          </div>
          <div id='trip-card-info'>
            <p>Date: ${trip.date}</p>
            <p>Duration: ${trip.duration}</p>
            <p>Status: ${trip.status}</p>
          </div>
        </div>
      `)
    })
  },

  filterAgentTrips(e, agent, tripsRepo) {
    if(e.target.id === 'agent-pending') {
      domUpdates.displayTrips(agent.getPendingTrips(tripsRepo))
      document.getElementById('trip-title').innerText = 'Pending Trips'
    }
    if(e.target.id === 'agent-current') {
      domUpdates.displayTrips(agent.getCurrentTrips(this.date, tripsRepo))
      document.getElementById('trip-title').innerText = 'Current Trips'
    }
    if(e.target.id === 'agent-all') {
      domUpdates.displayTrips(tripsRepo)
      document.getElementById('trip-title').innerText = 'All Trips'
    }
  }
}

export default domUpdates