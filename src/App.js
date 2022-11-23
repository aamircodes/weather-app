import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import { Loader } from 'semantic-ui-react';

const URL = `https://api.openweathermap.org/data/2.5/onecall`;

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [icon, setIcon] = useState('');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    axios
      .get(
        `${URL}?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((weatherData) => {
        console.log(weatherData.data);
        setLoading(false);
        setTemperature(weatherData.data.current.temp);
        setSunset(weatherData.data.current.sunset);
        setSunrise(weatherData.data.current.sunrise);
        setHumidity(weatherData.data.current.humidity);
        setCity(weatherData.data.timezone);
        setIcon(weatherData.data.current.weather[0].main);
        setForecast(weatherData.data.daily);
      });
  });

  return (
    <div className='main'>
      <Header />
      {loading ? (
        <div>
          <p>Loading..Please Wait</p>
          <Loader active inline='centered' />
        </div>
      ) : (
        <WeatherCard
          temperature={temperature}
          humidity={humidity}
          sunrise={sunrise}
          sunset={sunset}
          city={city}
          icon={icon}
        />
      )}

      <Forecast forecast={forecast} />
    </div>
  );
}

export default App;
