import moment from 'moment'

const domUpdates = {
  date: moment().format('YYYY/MM/DD'),

  loadAgentDash(agent, travelersData, tripsRepo, date, destinationsRepo) {
    document.getElementById('agent-trip-btn-container').classList.remove('hide')
    document.getElementById('welcome-msg-text').innerText = 'Welcome, Agent'
    document.getElementById('dollar-amt').innerHTML = `<p>Annual Revenue:</p><p>$${agent.calculateAnnualRevenue(travelersData)}</p>`
    document.getElementById('aside-title-text').innerHTML = '<p>Search Travelers</p>'
    document.getElementById('traveler-search-input').placeholder = 'Enter name...'
    this.displayAgentTrips(agent.getPendingTrips(tripsRepo), date, destinationsRepo, travelersData)
    this.displayTravelersNames(travelersData)
    document.getElementById('main-title').innerText = 'Pending Trips'
    document.querySelector('.traveler-search-bar').classList.add('hide')
    document.getElementById('main').classList.remove('hide')
    document.getElementById('login').classList.add('hide')
  },

  loadTravelerDash(traveler, destinations) {
    document.getElementById('traveler-trip-btn-container').classList.remove('hide')
    document.getElementById('welcome-msg-text').innerHTML = `<p>Welcome, </p><p>${traveler.name}</p>`
    document.getElementById('dollar-amt').innerHTML = `<p>Annual Amount Spent:</p><p>$${traveler.annualCost}</p>`
    document.getElementById('main-title').innerText = 'Search Destinations'
    document.getElementById('destination-search-input').placeholder = 'Enter Destination...'
    this.displayDestinations(destinations)
    this.displayTravelerPending(traveler, destinations)
    document.querySelector('.agent-search-bar').classList.add('hide')
    document.getElementById('main').classList.remove('hide')
    document.getElementById('login').classList.add('hide')
  },

  displayAgentTrips(trips, date, destinationsRepo, travelers) {
    document.getElementById('main-content-results').innerHTML = ''
    trips.forEach(trip => {
      let name = travelers.find(traveler => traveler.id === trip.userID).name
      document.getElementById('main-content-results').insertAdjacentHTML('afterbegin', `
        <div id='${trip.id}' class='agent-trip-card'>
          <div id='trip-card-ids'>
            <p>TripID: ${trip.id}</p>
            <p>${name}</p>
            <p>${trip.getDestination(destinationsRepo).destination}</p>
          </div>
          <div id='trip-card-info'>
            <p>Date: ${trip.date}</p>
            <p>Duration: ${trip.duration}</p>
            <p>Status: ${trip.status}</p>
          </div>
          <div id='status-btns'>
            <button id='approve-btn' class='approve'>Approve</button>
            <button id='deny-btn' class='deny'>Deny</button>
          </div>
        </div>
      `)
      this.displayStatusBtns(trip, date)
    })
  },

  displayStatusBtns(trip, date) {
    if(trip.date > date) {
      document.getElementById('deny-btn').style.visibility = 'visible'
    }
    if(trip.status === 'pending') {
      document.getElementById('deny-btn').style.visibility = 'visible'
      document.getElementById('approve-btn').style.visibility = 'visible'
    }
  },

  displayTravelerTrips(trips, destinationsData) {
    document.getElementById('aside-results').innerHTML = ''
    trips.forEach(trip => {
      document.getElementById('aside-results').insertAdjacentHTML('afterbegin', `
        <div id='trip-card'>
          <p id='trip-card-name'>${trip.getDestination(destinationsData).destination}</p>
          <div id='trip-card-body'>
            <div id='trip-card-ids'>
              <p class='category'>Date: ${trip.date}</p>
              <p class='category'>TripID: ${trip.id}</p>
            </div>
            <div id='trip-card-info'>
              <p class='category'>Duration: ${trip.duration} days</p>
              <p class='category'>Status: ${trip.status.toUpperCase()}</p>
            </div>
          </div>
        </div>
      `)
    })
  },

  filterAgentTrips(e, agent, tripsRepo, date, destinationsRepo, travelersRepo) {
    if (e.target.id === 'agent-pending') {
      this.displayAgentTrips(agent.getPendingTrips(tripsRepo), date, destinationsRepo, travelersRepo)
      document.getElementById('main-title').innerText = 'Pending Trips'
    }
    if (e.target.id === 'agent-current') {
      this.displayAgentTrips(agent.getCurrentTrips(this.date, tripsRepo), date, destinationsRepo, travelersRepo)
      document.getElementById('main-title').innerText = 'Current Trips'
    }
    if (e.target.id === 'agent-all') {
      this.displayAgentTrips(tripsRepo, date, destinationsRepo, travelersRepo)
      document.getElementById('main-title').innerText = 'All Trips'
    }
  },

  displayTravelersNames(travelers) {
    travelers.sort((a, b) => a.name < b.name ? 1 : -1).forEach(traveler => {
      document.getElementById('aside-results').insertAdjacentHTML('afterbegin', `
        <button id="${traveler.name}" class='searched-traveler'>${traveler.name}</button>
      `)
    })
  },

  filterTravelerNames(travelers) {
    document.getElementById('aside-results').innerHTML = ''
    let search = document.getElementById('traveler-search-input')
    let searched = travelers.filter(traveler => {
      return traveler.name.toLowerCase().includes(search.value.toLowerCase())
    })
    this.displayTravelersNames(searched)
  },

  displaySearchedTraveler(e, agent, travelersData, destinationsData, date) {
    let name = e.target.id
    let foundUser = agent.searchTravelersByName(name, travelersData)
    document.getElementById('searched-traveler-name').innerText = `${foundUser.name}`
    document.getElementById('searched-traveler-amount-spent').innerText = `Amount spent this year: $${foundUser.annualCost}`
    foundUser.allTrips.forEach(trip => {
      document.getElementById('searched-traveler-trips').insertAdjacentHTML('afterbegin', `
        <div id='${trip.id}' class='found-trip-card'>
          <p id='trip-card-name'>${trip.getDestination(destinationsData).destination}</p>
          <div id='trip-card-body'>
            <div id='trip-card-ids'>
              <p class='category'>Date: ${trip.date}</p>
              <p class='category'>TripID: ${trip.id}</p>
            </div>
            <div id='trip-card-info'>
              <p class='category'>Duration: ${trip.duration} days</p>
              <p class='category'>Status: ${trip.status.toUpperCase()}</p>
            </div>
          </div>
          <div id="status-btn-container">
              <button id='approve-btn-po' class='approve hide'>Approve</button>
              <button id='deny-btn-po' class='deny hide'>Deny</button>
          </div>
        </div>
      `)
      this.displayStatusBtnsPopOut(trip, date)
    })
    document.getElementById('searched-traveler-details').classList.remove('hide')
  },

  displayStatusBtnsPopOut(trip, date) {
    if(trip.date > date) {
      document.getElementById('deny-btn-po').classList.remove('hide')
    }
    if(trip.status === 'pending') {
      document.getElementById('deny-btn-po').classList.remove('hide')
      document.getElementById('approve-btn-po').classList.remove('hide')
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
    let search = document.getElementById('destination-search-input')
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
    document.getElementById('plan-trip').classList.add('hide')
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