import './css/base.scss';
import moment from 'moment'
import domUpdates from '../src/DomUpdates'
import fetchCalls from '../src/FetchCalls'
import Agent from '../src/Agent'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'

document.getElementById('login-btn').addEventListener('click', login)
document.getElementById('agent-trip-btn-container').addEventListener('click', (e) => filterAgentTrips(e))
let agent;
let currentTraveler;
// let date = '2020/06/05'
let date = moment().format('YYYY/MM/DD')
let travelersRepo = []
let tripsRepo = []
let destinationsRepo = []

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
    agent = new Agent;
    domUpdates.loadAgent(agent)
  }
  domUpdates.loadTraveler()
}

function filterAgentTrips(e) {
  if(e.target.id === 'agent-pending') {
    domUpdates.displayTrips(agent.getPendingTrips(tripsRepo))
  }
  if(e.target.id === 'agent-current') {
    domUpdates.displayTrips(agent.getCurrentTrips(date, tripsRepo))
  }
  if(e.target.id === 'agent-all') {
    domUpdates.displayTrips(tripsRepo)
  }
}