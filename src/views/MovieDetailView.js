import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Share,
  Platform,
} from 'react-native'

import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { getMovieDetailFromApi } from '../api/TMDBApi'
import Loading from '../components/Loading'
import FloatingActionButton from '../components/FloatingActionButton'
import EnlargeShrink from '../animations/EnlargeShrink'

class MovieDetailView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      movie: undefined,
      isLoading: true,
    }
  }

  componentDidMount = async () => {
    const { idMovie } = this.props.route.params
    const movie = await getMovieDetailFromApi(idMovie)
    this.setState({ movie, isLoading: false }, () => {
      this.loadHeaderButton()
    })
  }

  loadHeaderButton = () => {
    if (this.state.movie) {
      this.props.navigation.setOptions({
        headerRight: () => this.displayIosShareButton(),
      })
    }
  }

  toggleFavorite = () => {
    this.props.dispatch({
      type: 'TOGGLE_FAVORITE',
      value: this.state.movie,
    })
  }

  shareMovie = () => {
    const { movie } = this.state
    Share.share({
      title: movie.title,
      message: movie.overview,
    })
  }

  displayFavoriteImage () {
    const { favoriteMovies } = this.props
    const isFavorite = favoriteMovies.some((item) => item.id === this.state.movie.id)
    const source = isFavorite
      ? require('../images/ic_favorite.png')
      : require('../images/ic_favorite_border.png')

    return (
      <EnlargeShrink
        width={40}
        height={40}
        shouldEnlarge={isFavorite}
      >
        <Image
          style={styles.favoriteImage}
          source={source}
        />
      </EnlargeShrink>
    )
  }

  displayAndroidShareButton () {
    if (this.state.movie && Platform.OS === 'android') {
      return (
        <FloatingActionButton
          source={require('../images/ic_share.png')}
          onPress={this.shareMovie}
        />
      )
    }
    return null
  }

  displayIosShareButton () {
    if (this.state.movie && Platform.OS === 'ios') {
      return (
        <TouchableOpacity onPress={this.shareMovie}>
          <Image
            style={styles.iosShareImage}
            source={require('../images/ic_share.png')}
          />
        </TouchableOpacity>
      )
    }
    return null
  }

  displayMovie () {
    const { movie } = this.state
    if (movie) {
      const humanizedDate = moment(movie.releaseDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
      const humanizedBudget = numeral(movie.budget).format('0,0 $')
      return (
        <ScrollView style={styles.scrollViewContainer}>
          <Image
            style={styles.backdropImage}
            source={{ uri: movie.backdropPath }}
          />
          <View style={styles.otherInformationContainer}>
            <Text style={styles.titleText}>{ movie.title }</Text>
            <TouchableOpacity
              style={styles.favoriteContainer}
              onPress={this.toggleFavorite}
            >
              {this.displayFavoriteImage()}
            </TouchableOpacity>

            <Text style={styles.overviewText}>{ movie.overview }</Text>
            <Text style={styles.informationText}>Sorti le { humanizedDate }</Text>
            <Text style={styles.informationText}>Note : { movie.voteAverage } / 10</Text>
            <Text style={styles.informationText}>Nombre de vote : { movie.voteCount }</Text>
            <Text style={styles.informationText}>Budget : { humanizedBudget }</Text>
            <Text style={styles.informationText}>Genre(s) : { movie.genres.join(' / ') }</Text>
            <Text style={styles.informationText}>Compagnie(s) : { movie.productionCompanies.join(' / ') }</Text>
          </View>
        </ScrollView>
      )
    }
    return null
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        { this.displayMovie() }
        <Loading loading={this.state.isLoading} />
        { this.displayAndroidShareButton() }
      </View>
    )
  }
}

MovieDetailView.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      idMovie: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  favoriteMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
}

const win = Dimensions.get('window')

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  scrollViewContainer: {
    flex: 1,
  },
  otherInformationContainer: {
    marginBottom: 20,
  },
  favoriteContainer: {
    alignItems: 'center',
  },
  backdropImage: {
    width: win.width - 20,
    height: (281 / 500) * (win.width - 20),
  },
  titleText: {
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  overviewText: {
    textAlign: 'justify',
    color: '#555555',
    fontSize: 14,
    marginVertical: 20,
  },
  informationText: {
    fontWeight: 'bold',
  },
  favoriteImage: {
    flex: 1,
    width: null,
    height: null,
  },
  iosShareImage: {
    width: 30,
    height: 30,
  },
})

const mapStateToProps = (state) => ({
  favoriteMovies: state.favoriteMovies,
})

export default connect(
  mapStateToProps,
)(MovieDetailView)
