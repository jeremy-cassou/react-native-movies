import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import { getLatestMoviesFromApi } from '../api/TMDBApi'

class NewsView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      movies: [],
      isLoading: true,
    }

    this.page = 0
    this.totalPage = 0
  }

  componentDidMount () {
    this.loadMovies()
  }

  /**
   * Get next page from API
   */
  loadMovies = async () => {
    this.setState({ isLoading: true })
    const {
      movies,
      page,
      total_page: totalPage,
    } = await getLatestMoviesFromApi(this.page + 1)
    this.page = page
    this.totalPages = totalPage
    this.setState({ movies, isLoading: false })
  }

  onEndReached = () => {
    if (this.page < this.totalPage && !this.isLoading) {
      this.loadMovies()
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <MovieList
          movies={this.state.movies}
          navigation={this.props.navigation}
          onEndReached={this.onEndReached}
        />
        <Loading loading={this.state.isLoading} />
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default NewsView
