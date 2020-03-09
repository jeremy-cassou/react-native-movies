import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

export default class MovieItem extends React.Component {
  displayFavoriteImage () {
    const { isFavorite } = this.props
    if (isFavorite) {
      return (
        <Image
          style={styles.favoriteImage}
          source={require('../images/ic_favorite.png')}
        />
      )
    }
    return null
  }

  render () {
    const { movie, displayDetailForMovie } = this.props
    return (
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={() => displayDetailForMovie(movie.id)}
      >
        <Image
          style={styles.image}
          source={{ uri: movie.posterPath }}
        />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            { this.displayFavoriteImage() }
            <Text style={styles.titleText} numberOfLines={2}>
              { movie.title }
            </Text>
            <Text style={styles.reviewText}>{ movie.voteAverage }</Text>
          </View>
          <Text style={styles.descriptionText} numberOfLines={6}>{ movie.overview }</Text>
          <Text style={styles.releaseDateText}>Sorti le { movie.releaseDate }</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

MovieItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool,
  displayDetailForMovie: PropTypes.func.isRequired,
}

MovieItem.defaultProps = {
  isFavorite: false,
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 190,
    flex: 1,
    padding: 5,
    flexDirection: 'row',
  },
  pictureContainer: {
    width: 100,
    backgroundColor: '#AAAAAA',
  },
  contentContainer: {
    flex: 3,
    paddingHorizontal: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 180,
  },
  titleText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  favoriteImage: {
    width: 20,
    height: 20,
  },
  reviewText: {
    fontSize: 24,
    color: '#555',
  },
  descriptionText: {
    flex: 1,
    color: '#888',
    fontStyle: 'italic',
  },
  releaseDateText: {
    textAlign: 'right',
  },
})
