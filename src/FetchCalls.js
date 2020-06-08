const fetchCalls = {
  rootURL: 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/',

  getTravelers() {
    return fetch(`${this.rootURL}travelers/travelers`)
      .then(response => response.json())
      .catch(err => console.error(err))
  },

  getTrips() {
    return fetch(`${this.rootURL}trips/trips`)
      .then(response => response.json())
      .catch(err => console.error(err))
  },

  getDestinations() {
    return fetch(`${this.rootURL}destinations/destinations`)
      .then(response => response.json())
      .catch(err => console.error(err))  
  },

  postNewTrip(tripInfo) {
    return fetch(`${this.rootURL}trips/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripInfo)
    })
  },

  modifyTripStatus(statusInfo) {
    return fetch(`${this.rootURL}trips/updateTrip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(statusInfo)
    })
  },

  deleteTrip(id) {
    return fetch(`${this.rootURL}trips/trips`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: id})
    })
  }
}

export default fetchCalls