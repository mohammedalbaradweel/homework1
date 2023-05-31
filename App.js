import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {getWeatherInfo} from './utils/api';
import getImageForWeather from './utils/getImageForWeather';
import SearchInput from './components/SearchInput';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    handleUpdateLocation('San Francisco');
  }, []);

  const handleUpdateLocation = async city => {
    if (!city) return;

    setLoading(true);
    setError(false);

    try {
      const {location, weather, temperature} = await getWeatherInfo(city);

      setLocation(location);
      setWeather(weather);
      setTemperature(temperature);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const buttonColor = isDarkMode ? 'white' : 'black';

  return (
    <View style={[styles.container, containerStyle]} behavior="padding">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        source={
          weather ? getImageForWeather(weather) : getImageForWeather('Icon')
        }
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <TouchableOpacity
          style={[styles.button, {backgroundColor: buttonColor}]}
          onPress={toggleDarkMode}
        >
          <View style={[styles.buttonInner, {backgroundColor: isDarkMode ? 'black' : 'white'}]} />
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />

          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}

              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
                </View>
              )}

              <SearchInput
                placeholder="Search any city"
                onSubmit={handleUpdateLocation}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  button: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'BLAKE',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'poppins' : 'poppins',
    color: 'white',
    fontWeight: 'bold',
  },
  largeText: {
    fontSize: 40,
  },
  smallText: {
    fontSize: 18,
  },
});
