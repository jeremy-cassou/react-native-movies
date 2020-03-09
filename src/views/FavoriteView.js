import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import MovieList from '../components/MovieList'
import UserAvatar from '../components/UserAvatar'

class FavoriteView extends React.Component {
  render () {
    const { favoriteMovies } = this.props
    return (
      <View style={styles.mainContainer}>
        <View style={styles.avatarContainer}>
          <UserAvatar />
        </View>
        <MovieList
          movies={favoriteMovies}
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

FavoriteView.propTypes = {
  favoriteMovies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
  },
})

const mapStateToProps = (state) => ({
  favoriteMovies: state.favoriteMovies || [],
})

export default connect(
  mapStateToProps,
)(FavoriteView)
