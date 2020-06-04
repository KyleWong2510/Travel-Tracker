// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')
const loginBtn = document.getElementById('login-btn')

loginBtn.addEventListener('click', login)

function login() {
  if(!usernameInput.value || !passwordInput.value) {
    alert('Please enter a value into both input fields')
  }
  if (passwordInput.value.length > 0 && passwordInput.value !== 'travel2020') {
    alert('Sorry, incorrect password')
  }
  loadAgent()
  loadTraveler()
}

function loadAgent() {
  if(usernameInput.value === 'agency' && passwordInput.value === 'travel2020') {
    document.getElementById('agent-trip-btn-container').classList.remove('hide')
    document.getElementById('welcome-msg').innerText = 'Welcome, Agent'
    document.getElementById('dollar-amt').innerText = 'Annual Revenue: '
    document.getElementById('search-input-title').innerText = 'Search Travelers'
    document.getElementById('search-input').placeholder = 'Enter name...'
    document.getElementById('main').classList.remove('hide')
    document.getElementById('login').classList.add('hide')
  }
}

function loadTraveler() {
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
}