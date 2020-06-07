import './css/base.scss';
import moment from 'moment'
import domUpdates from '../src/DomUpdates'
import fetchCalls from '../src/FetchCalls'
import Agent from '../src/Agent'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'

// let agent;
let currentUser;
// let date = '2020/06/05'
let date = moment().format('YYYY/MM/DD')
let travelersRepo = []
let tripsRepo = []
let destinationsRepo = []

// document.getElementById('close-btn').addEventListener('click', (e) => e.target.parentNode.classList.add('hide'))
document.getElementById('login-btn').addEventListener('click', login)
document.getElementById('agent-trip-btn-container').addEventListener('click', (e) => agentFilter(e))
document.getElementById('traveler-trip-btn-container').addEventListener('click', (e) => travelerFilter(e))
document.getElementById('search-btn').addEventListener('click', (e) => searchItems(e))
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('plan-trip-btn')) {
    displayPostForm(e)
  }
  if(e.target.id === 'close-btn') {
    e.target.parentNode.classList.add('hide')
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

      //why cant these be in a .then?
      createTrips(tripsData)
      createTravelers(travelersData, tripsRepo, destinationsData)
      destinationsRepo = destinationsData
    })
    //why do console.logs outside of the promise still run if they are in a .then
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
    domUpdates.loadAgentDash(currentUser, travelersRepo)
    
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
  domUpdates.filterAgentTrips(e, currentUser, tripsRepo)
}

function travelerFilter(e) {
  domUpdates.filterTravelerTrips(e, currentUser, destinationsRepo)
}

function searchItems(e) {
  e.preventDefault()
  domUpdates.filterDestinations(destinationsRepo)
}

function displayPostForm(e) {
  let planTripBtn = document.getElementById('plan-trip')
  planTripBtn.classList.remove('hide')
  let destinationName = e.target.parentNode.firstElementChild.innerText
  document.getElementById('destination-input').value = destinationName
}