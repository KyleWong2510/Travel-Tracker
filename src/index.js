import './css/base.scss';
import moment from 'moment'
import domUpdates from '../src/DomUpdates'
import fetchCalls from '../src/FetchCalls'
import Agent from '../src/Agent'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'

let currentUser;
let date = moment().format('YYYY/MM/DD')
let travelersRepo = []
let tripsRepo = []
let destinationsRepo = []

document.getElementById('login-btn').addEventListener('click', login)
document.getElementById('agent-trip-btn-container').addEventListener('click', (e) => agentFilter(e))
document.getElementById('traveler-trip-btn-container').addEventListener('click', (e) => travelerFilter(e))
document.getElementById('destination-search-btn').addEventListener('click', (e) => searchDestinations(e))
document.getElementById('traveler-search-btn').addEventListener('click', (e) => searchTravelers(e))

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('plan-trip-btn')) {
    domUpdates.displayPostForm(e)
  }
  if(e.target.id === 'close-btn') {
    e.preventDefault()
    e.target.parentNode.classList.add('hide')
  }
  if(e.target.id === 'get-estimate-btn') {
    e.preventDefault()
    let trip = createTrip()
    domUpdates.displayConfirmation(trip, destinationsRepo)
  }
  if(e.target.id === 'book-btn') {
    postNewTrip()
  }
  if(e.target.classList.contains('searched-traveler')) {
    domUpdates.displaySearchedTraveler(e, currentUser, travelersRepo, destinationsRepo, date)
  }
})

fetchData()

function fetchData() {
  let travelersData = fetchCalls.getTravelers()
  let tripsData = fetchCalls.getTrips()
  let destinationsData = fetchCalls.getDestinations()

  return Promise.all([travelersData, tripsData, destinationsData])
    .then(response => {
      travelersData = response[0].travelers;
      tripsData = response[1].trips;
      destinationsData = response[2].destinations

      createTrips(tripsData)
      createTravelers(travelersData, tripsRepo, destinationsData)
      destinationsRepo = destinationsData
    })
    .catch(err => console.error(err.message))
}

function createTravelers(travelers, tripsRepo, destinationsRepo) {
  travelersRepo = travelers.map(traveler => new Traveler(traveler, tripsRepo, destinationsRepo))
}

function createTrips(trips) {
  tripsRepo = trips.map(trip => new Trip(trip))
}

function login() {
  const usernameInput = document.getElementById('username-input')
  const passwordInput = document.getElementById('password-input')
  if(!usernameInput.value || !passwordInput.value) {
    alert('Please enter a value into both input fields')
  }
  if (passwordInput.value.length > 0 && passwordInput.value !== 'travel2020') {
    alert('Sorry, incorrect password')
  }
  if(usernameInput.value === 'agency' && passwordInput.value === 'travel2020') {
    currentUser = new Agent;
    domUpdates.loadAgentDash(currentUser, travelersRepo, tripsRepo)
    
  }
  for (let i = 1; i < 51; i++) {
    if(usernameInput.value === `traveler${i}` && passwordInput.value === 'travel2020') {
      currentUser = travelersRepo[i - 1]
      domUpdates.loadTravelerDash(currentUser, destinationsRepo)
    } 
  }
  if(!document.getElementById('login').classList.contains('hide') && usernameInput.value !== 'agency') {
    alert('Sorry, unknown username')
  }
}

function agentFilter(e) {
  domUpdates.filterAgentTrips(e, currentUser, tripsRepo, date)
}

function travelerFilter(e) {
  domUpdates.filterTravelerTrips(e, currentUser, destinationsRepo)
}

function searchDestinations(e) {
  e.preventDefault()
  domUpdates.filterDestinations(destinationsRepo)
}

function searchTravelers(e) {
  e.preventDefault()
  domUpdates.filterTravelerNames(travelersRepo)
}

function createTrip() {
  let trip = {
    id: Date.now(),
    userID: currentUser.id,
    destinationID: +document.getElementById('plan-trip-title').firstElementChild.id,
    travelers: +document.getElementById('num-people-input').value || +document.getElementById('num-people-input').placeholder,
    date: moment(document.getElementById('departure-date').value).format('YYYY/MM/DD'),
    duration: getDuration(),
    status: 'pending',
    suggestedActivities: []
  }
  return new Trip(trip)
}

function getDuration() {
  let startInput = document.getElementById('departure-date').value
  let endInput = document.getElementById('return-date').value
  let start = moment(startInput)
  let end = moment(endInput)
  return end.diff(start, 'days')
}

function postNewTrip() {
  let postObj = createTrip()
  fetchCalls.postNewTrip(postObj)
    .then(() => fetchCalls.getTrips())
    .then(response => {
      createTrips(response.trips)
      updateAfterPost()
    })
    .then(alert('Successfully Booked!'))
    .catch(err => console.error(err.message))
  domUpdates.resetTravelerPostForm()
}

function updateAfterPost() {
  console.log('update')
  if(currentUser instanceof Agent) {
    console.log(currentUser)
    domUpdates.loadAgentDash(currentUser, travelersRepo, tripsRepo)
  } else {
    console.log(currentUser)
    currentUser.allTrips = currentUser.getTravelerTrips(tripsRepo)
    domUpdates.loadTravelerDash(currentUser, destinationsRepo)
  }
  // document.getElementById('dollar-amt').innerText = `Annual Amount Spent: $${currentUser.calculateAnnualCost(destinationsRepo)}`
  // domUpdates.displayTravelerPending(currentUser, destinationsRepo)
}

document.addEventListener('click', (e) => {
  if(e.target.id === 'approve-btn' || e.target.id === 'approve-btn-po') {
    approveTrip(e)
  }

  if(e.target.id === 'deny-btn' || e.target.id === 'deny-btn-po') {
    denyTrip(e)
  }

  if(e.target.id === 'book-btn') {
    document.getElementById('plan-trip-confirmation').classList.add('hide')
  }
})

// function approveTrip(e) {
//   let id = e.target.parentNode.parentNode.id
//   currentUser.changeStatus(id, 'approved')
//     // .then(updateAfterPost())
//   alert('Successfully Approved!')
// }

// function denyTrip(e) {
//   let id = Number(e.target.parentNode.parentNode.id)
//   currentUser.cancelTrip(id)
//     .then(updateAfterPost())
//   alert('Successfully Cancelled!')
// }

//500 status code
function approveTrip(e) {
  let id = e.target.parentNode.parentNode.id
  let postObj = {
    id: +id,
    status: 'approved'
  }
  fetchCalls.modifyTripStatus(postObj)
    .then(() => fetchCalls.getTrips())
    .then(response => {
      createTrips(response.trips)
      updateAfterPost()
    })
    .then(alert('Successfully Approved!'))
    .catch(err => console.error(err.message))
}

function denyTrip(e) {
  let id = Number(e.target.parentNode.parentNode.id)
  fetchCalls.deleteTrip(id)
    .then(() => fetchCalls.getTrips())
    .then(response => {
      createTrips(response.trips)
      updateAfterPost()
    })
    .then(alert('Successfully Cancelled!'))
    .catch(err => console.error(err))

  e.target.parentNode.parentNode.classList.add('hide')
}