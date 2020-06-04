import './css/base.scss';

const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')

loginBtn.addEventListener(login)

function login() {
  console.log('hi')
  if(usernameInput.value === 'agency' && passwordInput === 'travel2020') {
    
  }
  
  for (let i = 0; i < 51; i++) {
    if(usernameInput.value === `traveler${i}` && passwordInput === 'travel2020') {
      
    }
  }
  document.getElementById('main').classList.remove('hide')
  document.getElementById('login').classList.add('hide')
}

const loginBtn = document.getElementById('login-btn')