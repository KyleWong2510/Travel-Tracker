import Agent from "./Agent"

const domUpdates = {
  loadAgent(agent) {
      document.getElementById('agent-trip-btn-container').classList.remove('hide')
      document.getElementById('welcome-msg').innerText = 'Welcome, Agent'
      document.getElementById('dollar-amt').innerText = `Annual Revenue: ${agent.annualRevenue}`
      document.getElementById('search-input-title').innerText = 'Search Travelers'
      document.getElementById('search-input').placeholder = 'Enter name...'
      document.getElementById('main').classList.remove('hide')
      document.getElementById('login').classList.add('hide')
  },
  
  //do same as above
  loadTraveler() {
    const usernameInput = document.getElementById('username-input')
    const passwordInput = document.getElementById('password-input')
    for (let i = 1; i < 51; i++) {
      if(usernameInput.value === `traveler${i}` && passwordInput.value === 'travel2020') {
        document.getElementById('traveler-trip-btn-container').classList.remove('hide')
        document.getElementById('welcome-msg').innerText = 'Welcome, traveler'
        document.getElementById('dollar-amt').innerText = 'Annual Amount Spent: '
        document.getElementById('search-input-title').innerText = 'Search Destinations'
        document.getElementById('search-input').placeholder = 'Enter Destination...'
        document.getElementById('main').classList.remove('hide')
        document.getElementById('login').classList.add('hide')
      } 
    }
    if(!document.getElementById('login').classList.contains('hide') && usernameInput.value !== 'agency') {
      alert('Sorry, unknown username')
    }
  },

  displayTrips(trips) {
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
  }
}

export default domUpdates