import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'
import PropTypes from 'prop-types'

class Loading extends React.Component {
  render () {
    const { loading } = this.props
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return null
  }
}

Loading.propTypes = {
  loading: PropTypes.bool,
}

Loading.defaultProps = {
  loading: false,
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loading
