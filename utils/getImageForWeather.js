/* eslint-disable global-require */

const images = {
  clear: require('../assets/clear-sky.png'),
  hail: require('../assets/hail.png'),
  'heavy-cloud': require('../assets/heavy-rain.png'),
  'light-cloud': require('../assets/light-rain.png'),
  'heavy-rain': require('../assets/heavy-rain.png'),
  'light-rain': require('../assets/light-rain.png'),
  'showers': require('../assets/showers.png'),
  'sleet': require('../assets/sleet.png'),
  'snow': require('../assets/snowflake.png'),
  'thunder': require('../assets/thunder.png'),
    Icon: require('../assets/storm.png'),

};

export default weather => images[weather];
