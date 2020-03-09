import React from 'react'
import {
  Animated,
} from 'react-native'
import PropTypes from 'prop-types'

class EnlargeShrink extends React.Component {
  constructor (props) {
    super(props)
    const { width, height, shouldEnlarge } = props
    this.state = {
      width: new Animated.Value(shouldEnlarge ? width * 2 : width),
      height: new Animated.Value(shouldEnlarge ? height * 2 : height),
    }
  }

  componentDidUpdate () {
    const { width, height, shouldEnlarge } = this.props
    Animated.spring(
      this.state.width,
      { toValue: shouldEnlarge ? width * 2 : width },
    ).start()

    Animated.spring(
      this.state.height,
      { toValue: shouldEnlarge ? height * 2 : height },
    ).start()
  }

  render () {
    return (
      <Animated.View
        style={{
          width: this.state.width,
          height: this.state.height,
        }}
      >
        { this.props.children }
      </Animated.View>
    )
  }
}

EnlargeShrink.defaultProps = {
  shouldEnlarge: false,
}

EnlargeShrink.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shouldEnlarge: PropTypes.bool,
}

export default EnlargeShrink
