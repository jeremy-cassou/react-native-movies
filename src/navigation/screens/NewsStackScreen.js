import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NewsView from '../../views/NewsView'
import MovieDetailView from '../../views/MovieDetailView'

const NewsStack = createStackNavigator()

export default class NewsStackScreen extends React.Component {
  render () {
    return (
      <NewsStack.Navigator>
        <NewsStack.Screen
          name="News"
          component={NewsView}
          options={{
            title: 'Nouveautées',
          }}
        />
        <NewsStack.Screen
          name="MovieDetail"
          component={MovieDetailView}
          options={{
            title: 'Détail',
          }}
        />
      </NewsStack.Navigator>
    )
  }
}
