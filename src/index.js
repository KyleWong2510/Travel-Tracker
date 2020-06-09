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

document.getElementById('login-btn').addEventListener('click', (e) => login(e))
document.getElementById('agent-trip-btn-container').addEventListener('click', (e) => agentFilter(e))
document.getElementById('traveler-trip-btn-container').addEventListener('click', (e) => travelerFilter(e))
document.getElementById('destination-search-btn').addEventListener('click', (e) => searchDestinations(e))
document.getElementById('traveler-search-btn').addEventListener('click', (e) => searchTravelers(e))
document.addEventListener('click', (e) => {
  displayPostFormHandler(e)
  closeBtnHandler(e)
  getEstimateBtnHandler(e)
  bookBtnHandler(e)
  displaySearchedTravelerHandler(e)
  approveBtnHandler(e)
  denyBtnHandler(e)
})
function agentFilter(e) {
  domUpdates.filterAgentTrips(e, currentUser, tripsRepo, date, destinationsRepo, travelersRepo)
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

function displayPostFormHandler(e) {
  if(e.target.classList.contains('plan-trip-btn')) {
    domUpdates.displayPostForm(e)
  }
}

function closeBtnHandler(e) {
  if(e.target.id === 'close-btn') {
    e.preventDefault()
    e.target.parentNode.classList.add('hide')
  }
}

function getEstimateBtnHandler(e) {
  if(e.target.id === 'get-estimate-btn') {
    e.preventDefault()
    let trip = createTrip()
    domUpdates.displayConfirmation(trip, destinationsRepo)
  }
}

function bookBtnHandler(e) {
  if(e.target.id === 'book-btn') {
    postNewTrip()
    document.getElementById('plan-trip-confirmation').classList.add('hide')
  }
}

function displaySearchedTravelerHandler(e) {
  if(e.target.classList.contains('searched-traveler')) {
    domUpdates.displaySearchedTraveler(e, currentUser, travelersRepo, destinationsRepo, date)
  }
}

function approveBtnHandler(e) {
  if(e.target.id === 'approve-btn' || e.target.id === 'approve-btn-po') {
    approveTrip(e)
  }
}

function denyBtnHandler(e) {
  if(e.target.id === 'deny-btn' || e.target.id === 'deny-btn-po') {
    denyTrip(e)
  }
}

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

function login(e) {
  e.preventDefault()
  const usernameInput = document.getElementById('username-input')
  const passwordInput = document.getElementById('password-input')
  if (passwordInput.value.length > 0 && passwordInput.value !== 'travel2020') {
    alert('Sorry, incorrect password')
  }
  if(usernameInput.value === 'agency' && passwordInput.value === 'travel2020') {
    currentUser = new Agent;
    domUpdates.loadAgentDash(currentUser, travelersRepo, tripsRepo, date, destinationsRepo)
    
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
  if(currentUser instanceof Agent) {
    console.log(currentUser)
    domUpdates.loadAgentDash(currentUser, travelersRepo, tripsRepo, date, destinationsRepo)
  } else {
    console.log(currentUser)
    currentUser.allTrips = currentUser.getTravelerTrips(tripsRepo)
    domUpdates.loadTravelerDash(currentUser, destinationsRepo)
  }
}

function approveTrip(e) {
  let id = e.target.parentNode.parentNode.id
  currentUser.changeStatus(id, 'approved')
  .then(tripsData => createTrips(tripsData.trips))  
  .then(updateAfterPost)
  // .then(() => domUpdates.displaySearchedTraveler(e, currentUser, travelersRepo, destinationsRepo, date))
  alert('Successfully Approved!')
}

function denyTrip(e) {
  let id = Number(e.target.parentNode.parentNode.id)
  currentUser.cancelTrip(id)
    .then(tripsData => createTrips(tripsData.trips))
    .then(updateAfterPost)
    .then(e.target.parentNode.parentNode.classList.add('hide'))
  alert('Successfully Cancelled!')
}