import React,{useState} from "react"
import fetchWeather from "./api/fetchWeather"
import PWAPrompt from 'react-ios-pwa-prompt'
import "./App.css"
const App = () => {
  const [query,setQuery] = useState('')
  const [weather,setWeather] = useState({})

  const search = async (e) => {
    if(e.key === 'Enter') {
      const data = await fetchWeather(query)

      setWeather(data);
      setQuery('')
    }
  }
  return (
    <>
    <PWAPrompt promptOnVisit={1} timesToShow={3} copyClosePrompt="Close" permanentlyHideOnDismiss={false}/>;
    <div className="main-container">
       <input
         type="text"
         className="search"
         placeholder="Search..."
         onChange={ (e) => setQuery(e.target.value)}
         value={query}
         onKeyPress={search}
       />
       {
         weather.main && (
            <div className="city">
              <h2 className="city-name">
                <span>{weather.name}</span>
                <sup>{weather.sys.country}</sup>
              </h2>
              
              <div className="city-temp">
                 {Math.round(weather.main.temp)}
                 <sup>&deg;C</sup>
              </div>

              <div className="info">
                 {/* <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/> */}
              </div>

            </div>
         )
       }
    </div>
    </>
  )
}

export default App;