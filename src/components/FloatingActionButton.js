import React from 'react'
import {
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'

class FloatingActionButton extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={this.props.onPress}
        >
          <Image
            style={styles.image}
            source={this.props.source}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

FloatingActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  source: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    right: 5,
  },
  touchableOpacity: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#E91E83',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
})

export default FloatingActionButton
