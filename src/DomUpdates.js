const domUpdates = {
  loadAgent(usernameInput, passwordInput) {
    if(usernameInput.value === 'agency' && passwordInput.value === 'travel2020') {
      document.getElementById('agent-trip-btn-container').classList.remove('hide')
      document.getElementById('welcome-msg').innerText = 'Welcome, Agent'
      document.getElementById('dollar-amt').innerText = 'Annual Revenue: '
      document.getElementById('search-input-title').innerText = 'Search Travelers'
      document.getElementById('search-input').placeholder = 'Enter name...'
      document.getElementById('main').classList.remove('hide')
      document.getElementById('login').classList.add('hide')
    }
  },
  
  loadTraveler(usernameInput, passwordInput) {
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
}

export default domUpdates