import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchView from '../../views/SearchView'
import MovieDetailView from '../../views/MovieDetailView'

const SearchStack = createStackNavigator()

export default class SearchStackScreen extends React.Component {
  render () {
    return (
      <SearchStack.Navigator>
        <SearchStack.Screen
          name="Search"
          component={SearchView}
          options={{
            title: 'Recherche',
          }}
        />
        <SearchStack.Screen
          name="MovieDetail"
          component={MovieDetailView}
          options={{
            title: 'Détail',
          }}
        />
      </SearchStack.Navigator>
    )
  }
}
