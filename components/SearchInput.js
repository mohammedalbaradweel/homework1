import React from 'react';
import { StyleSheet, TextInput, View, FlatList, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

export default class SearchInput extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '',
  };

  state = {
    text: '',
    cities: [], // Array of cities to be displayed
  };

  cities = [
    'London',
    'Paris',
    'New York',
    'Los Angeles',
    'Tokyo',
    'Berlin',
    'Madrid',
    'Rome',
    'Sydney',
    'Amsterdam',
  ]; // Sample array of cities

  handleChangeText = text => {
    this.setState({ text });
    this.filterCities(text); // Filter cities based on user input
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({ text: '' });
  };

  filterCities = text => {
    const filteredCities = this.cities.filter(city =>
      city.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({ cities: filteredCities });
  };

  handleCityPress = city => {
    this.setState({ text: city, cities: [] });
  };

  renderCityItem = ({ item }) => (
    <TouchableOpacity style={styles.cityItem} onPress={() => this.handleCityPress(item)}>
      <Text style={styles.cityText}>{item}</Text>
    </TouchableOpacity>
  );

  render() {
    const { placeholder } = this.props;
    const { text, cities } = this.state;

    return (
      <View style={styles.container}>
        <Ionicons name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="#999"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
        {cities.length > 0 && (
          <FlatList
            data={cities}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderCityItem}
            style={styles.cityList}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 20,
    marginHorizontal: 40,
  },
  searchIcon: {
    position: 'absolute',
    top: 8,
    left: 12,
  },
  textInput: {
    paddingLeft: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'black',
    color: 'black',
    fontSize: 16,
  },
  cityList: {
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'black',
  },
  cityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  cityText: {
    fontSize: 16,
    color: 'black',
  },
});
