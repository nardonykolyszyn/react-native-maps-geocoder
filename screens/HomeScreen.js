import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { WebBrowser, MapView } from 'expo';
import styled from 'styled-components';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyDHeefTjaewCdDWnNt_Eq8Nhn2AOMGdG80')

const SearchInput = styled.TextInput`
  color: black;
  padding: 10px;
  border: 2px solid palevioletred;
  margin: 10px;
  width: 300px;
  height: 40px;
  border-radius: 3px;
  background-color: papayawhip;
  box-shadow: 0 6px 6px rgba(0,0,0,0.23);
`

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    coordinates: {
      latitude: 4.7306779,
      longitude: -74.0358762,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00921
    },
    address: ''
  }

  handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('http://google.com');
  };

  searchForLocation = async () => {
    Geocoder.from(this.state.address)
      .then(json => {
        var location = json.results[0].geometry.location;
        this.setState({
          coordinates: {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00921
          }
        })

      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <MapView
        style={{flex: 1}}
        region={this.state.coordinates}
      >
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <SearchInput
          placeholder={'Where would you like to go?'}
          onBlur={() => this.searchForLocation('Parque 93')}
          onChangeText={(address) => this.setState({address: address})}
        />
      </View>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
});
