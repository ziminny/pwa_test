import axios from "axios"

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '304933ee16054881906828ed72684bf3'

const fetchWeather = async (query) => {
  const { data } = await axios.get(URL , {
    params: {
      q:query,
      units: 'metric',
      APPID:API_KEY
    }
  })
  return data;
}

export default fetchWeather; 