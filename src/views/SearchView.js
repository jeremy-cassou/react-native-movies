import React from 'react'
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Keyboard,
} from 'react-native'
import {
  unionBy as _unionBy,
} from 'lodash'

import { getMoviesFromApiWithSearchedText } from '../api/TMDBApi'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'

class SearchView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [],
      isLoading: false,
    }
    this.searchedText = ''
    this.page = 0
    this.totalPage = 0
  }

  /**
   * Get next page from API
   */
  loadMovies = async () => {
    Keyboard.dismiss()
    if (this.searchedText) {
      this.setState({ isLoading: true })
      const {
        movies,
        page,
        total_pages: totalPage,
      } = await getMoviesFromApiWithSearchedText(this.searchedText, this.page + 1)
      this.page = page
      this.totalPage = totalPage
      this.setState((state) => ({
        movies: _unionBy(state.movies, movies, 'id'),
        isLoading: false,
      }))
    }
  }

  /**
   * Reset previous search an execute a new search
   */
  searchMovies = () => {
    this.page = 0
    this.totalPage = 0
    this.setState({ movies: [] }, () => this.loadMovies())
  }

  onEndReached = () => {
    if (this.page < this.totalPage && !this.isLoading) {
      this.loadMovies()
    }
  }

  searchTextInputChanged = (text) => {
    this.searchedText = text
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <TextInput
          placeholder="Titre du film"
          style={styles.searchInput}
          onChangeText={(text) => this.searchTextInputChanged(text)}
          onSubmitEditing={this.searchMovies}
        />
        <Button
          style={styles.searchButton}
          title="Rechercher"
          onPress={this.searchMovies}
        />
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
  mainContainer: {
    flex: 1,
  },
  searchInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },
  searchButton: {},
})

export default SearchView
