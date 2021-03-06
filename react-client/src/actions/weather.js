import axios from 'axios';

import {
  START_WEATHER_POLLING,
  STOP_WEATHER_POLLING,
  WEATHER_POLLING_STOPPED,
  WEATHER_DATA_RECEIVED,
  WEATHER_REQUEST_ERROR,
  SAVE_WEATHER_CONFIG,
  WEATHER_CONFIG_SAVED,
  WEATHER_CONFIG_SAVE_ERROR,
} from './types';

const startWeatherPolling = (zip) => {
  return (dispatch) => {
    dispatch({ type: START_WEATHER_POLLING });
    axios.post('/api/weather', { zip })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: WEATHER_DATA_RECEIVED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: WEATHER_REQUEST_ERROR, payload: err });
      });
  };
};

const stopWeatherPolling = () => {
  return (dispatch) => {
    dispatch({ type: STOP_WEATHER_POLLING });
    axios.get('/api/weather/close')
      .then((res) => {
        console.log(res.data);
        dispatch({ type: WEATHER_POLLING_STOPPED });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: WEATHER_REQUEST_ERROR });
      });
  };
};

const fetchWeather = (zip) => {
  return (dispatch) => {
    dispatch({ type: START_WEATHER_POLLING });
    axios.post('/api/weather', { zip })
      .then((weather) => {
        dispatch({ type: WEATHER_DATA_RECEIVED, payload: weather.data });
      })
      .catch((error) => {
        dispatch({ type: WEATHER_REQUEST_ERROR, payload: error });
      });
  };
};

const saveWidgetConfig = (userId, widgetName, zipcode) => {
  return (dispatch) => {
    dispatch({ type: SAVE_WEATHER_CONFIG });
    axios.post('/widgets/weather/save', { userId, widgetName, zipcode })
      .then((res) => {
        console.log('REDUX RES', res);
        dispatch({ type: WEATHER_CONFIG_SAVED });
      })
      .catch((error) => {
        console.log('ERR', error);
        dispatch({ type: WEATHER_CONFIG_SAVE_ERROR, payload: error });
      });
  };
};


export {
  startWeatherPolling,
  stopWeatherPolling,
  fetchWeather,
  saveWidgetConfig,
};
