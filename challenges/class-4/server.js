// ===========================================
// Import dependencies 

require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const fetch = require('node-fetch')

// ===========================================
// Build a schema
// The schema inlcudes the types that can be returned 
// This example includes About and Weather 
// It must also include a Query type 

const schema = buildSchema(`
  type About {
    message: String
  }

  type Weather {
    desc: String
    temp: Float
    humidity: Float
  }

  type Time {
    time: String
    date: String
  }

  type AirPollution {
    lat: Float
    lon: Float
    aqi: Float
    er: String
  }
  
  type Query {
    getAbout: String
    getWeather: Weather
    fetchWeather(zip: Int = 94122): Weather
    fetchAirPollution(lat: Float, lon: Float): AirPollution
  }
`)

// ====================================
// This example will return a Weather Object type 
// We define it here
class Weather {
  constructor(desc = 'overcast', temp = 56) {
    this.desc = desc
    this.temp = temp
  }
}

class AirPollution {
  constructor(lat = 0.0, lon = 0.0, aqi = 0.0, er = "No Error") {
    this.lat = lat
    this.lon = lon
    this.aqi = aqi
    this.er = er
  }
}


// ====================================
// This root object provides resolver functions 
// Resolvers return the data asked for by queries 

const root = {
  // Simple resolver returns a string
  getAbout: () => {
    return 'Hello World'
  }, 
  // Resolver returns an Object with fields 
  getWeather: () => {
    return new Weather()
  },
  Time: {
    time: () => new Date().toLocaleTimeString(), 
    date: () => new Date().toLocaleDateString()
  },
  // More complex resolver fetches data 
  // then returns an object with fields 
  fetchWeather: ({ zip }) => {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`
    return fetch(url).then((res) => {
      return res.json()
    }).then((json) => {
      const desc = json.weather[0].description
      const k = Number(json.main.temp)
      const temp = ((k - 273.15) * 9/5 + 32).toFixed(2)
      return new Weather(desc, temp)
    }).catch((err) => {
      return err
    })
  },

  fetchAirPollution: ({ lat, lon }) => {
    if (lat > 90 || lat < -90) {
      const er = "Lat is out of bounds. Stay between 90 and -90"
      return new AirPollution(0,0,0,er)
    }
    if (lon > 180 || lon < -180) {
      const er = "Lon is out of bounds. Stay between 180 and -180"
      return new AirPollution(0,0,0,er)
    }
    const apiKey = process.env.OPENWEATHERMAP_API_KEY
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    return fetch(url).then((res) => {
      return res.json()
    }).then((json) => {
      const aqi = Number(json.list[0].main.aqi)
      const lat = Number(json.coord.lat)
      const lon = Number(json.coord.lon)
      return new AirPollution(lat, lon, aqi)
    }).catch((err) => {
      return err
    })
  }
}

// ====================================
// Create and express app and configure middleware

const app = express()
app.use((req, res, next) => {
  console.log('ip:', req.ip)
  next()
})

// Use the graphql browser
app.use('/graphql', graphqlHTTP({
  schema, 
  rootValue: root,
  graphiql: true
}))

// Launch the app on port 4000
app.listen(4000, () => {
  console.log('Running GraphQL at localhost:4000')
})

/* 

Challenges 
Your goal is to make a graphql endpoint that returns
data from several sources. 

*/