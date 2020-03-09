import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FavoriteView from '../../views/FavoriteView'
import MovieDetailView from '../../views/MovieDetailView'

const FavoriteStack = createStackNavigator()

export default class FavoriteStackScreen extends React.Component {
  render () {
    return (
      <FavoriteStack.Navigator>
        <FavoriteStack.Screen
          name="Favorite"
          component={FavoriteView}
          options={{
            title: 'Favoris',
          }}
        />
        <FavoriteStack.Screen
          name="MovieDetail"
          component={MovieDetailView}
          options={{
            title: 'Détail',
          }}
        />
      </FavoriteStack.Navigator>
    )
  }
}
