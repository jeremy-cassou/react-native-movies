import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import MovieItem from './MovieItem'
import FadeIn from '../animations/FadeIn'

class MovieList extends React.Component {
  displayDetailForMovie = (id) => {
    this.props.navigation.navigate('MovieDetail', { idMovie: id })
  }

  render () {
    const { movies, favoriteMovies } = this.props
    return (
      <FlatList
        data={movies}
        extraData={favoriteMovies}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={this.props.onEndReached}
        renderItem={({ item }) => (
          <FadeIn>
            <MovieItem
              movie={item}
              isFavorite={favoriteMovies
                .some((favorite) => favorite.id === item.id)}
              displayDetailForMovie={this.displayDetailForMovie}
            />
          </FadeIn>
        )}
      />
    )
  }
}

MovieList.defaultProps = {
  onEndReached: () => {},
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  favoriteMovies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  onEndReached: PropTypes.func,
}

const mapStateToProps = (state) => ({
  favoriteMovies: state.favoriteMovies || [],
})

export default connect(
  mapStateToProps,
)(MovieList)
