import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-picker'

class UserAvatar extends React.Component {
  avatarClicked = () => {
    ImagePicker.showImagePicker({
      title: 'Choisir un avatar',
      takePhotoButtonTitle: 'Prendre une photo',
      chooseFromLibraryButtonTitle: 'Choisir dans la librairie',
      cancelButtonTitle: 'Annuler',
    }, (response) => {
      if (!response.didCancel && !response.error) {
        const { uri } = response
        this.props.dispatch({
          type: 'SET_AVATAR',
          value: uri,
        })
      }
    })
  }

  render () {
    const { user } = this.props

    const avatar = user.avatar
      ? { uri: user.avatar }
      : require('../images/ic_tag_faces.png')

    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this.avatarClicked}
      >
        <Image
          style={styles.avatarPicture}
          source={avatar}
        />
      </TouchableOpacity>
    )
  }
}

UserAvatar.defaultProps = {
  user: {},
}

UserAvatar.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
  }),
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#9B9B9B',
  },
})

const mapStateToProps = (state) => ({
  user: state.user || {},
})

export default connect(
  mapStateToProps,
)(UserAvatar)
