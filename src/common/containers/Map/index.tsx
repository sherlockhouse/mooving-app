import React from 'react';
import { Component } from 'react';
import { View, Text } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import exampleIcon from '../../assets/example.png';

import Bubble from '../../components/Bubble';
import styles from './styles';

const mapStyles = MapboxGL.StyleSheet.create({
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
    iconSize: 0.5,
  },
});


interface MapContainerProps {
  language: any;
}

interface MapContainerState {
  featureCollection?: any;
}

export default class CustomIcon extends Component<MapContainerProps, MapContainerState> {

  constructor(props: MapContainerProps) {
    super(props);

    this.state = {
      featureCollection: MapboxGL.geoUtils.makeFeatureCollection(),
    };

    this.onPress = this.onPress.bind(this);
    this.onSourceLayerPress = this.onSourceLayerPress.bind(this);
  }

  async onPress(e: any) {
    let feature = MapboxGL.geoUtils.makeFeature(e.geometry);
    feature.id = '' + Date.now();

    this.setState({
      featureCollection: MapboxGL.geoUtils.addToFeatureCollection(
        this.state.featureCollection,
        feature,
      ),
    });
  }

  onSourceLayerPress(e: any) {
    const feature = e.nativeEvent.payload;
    console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
  }

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          zoomLevel={9}
          ref={(c: any) => (this._map = c)}
          onPress={this.onPress}
          centerCoordinate={[-73.970895, 40.723279]}
          style={styles.container}>
          <MapboxGL.ShapeSource
            id="symbolLocationSource"
            hitbox={{ width: 20, height: 20 }}
            onPress={this.onSourceLayerPress}
            shape={this.state.featureCollection}>
            <MapboxGL.SymbolLayer
              id="symbolLocationSymbols"
              minZoomLevel={1}
              style={mapStyles.icon}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>

        <Bubble>
          <Text>Tap to add an icon</Text>
        </Bubble>
      </View>
    );
  }
}

