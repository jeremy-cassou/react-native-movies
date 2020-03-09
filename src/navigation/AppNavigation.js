import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchStackScreen from './screens/SearchStackScreen'
import FavoriteStackScreen from './screens/FavoriteStackScreen'
import NewsStackScreen from './screens/NewsStackScreen'

const MainAppTab = createBottomTabNavigator()

export default class AppNavigation extends React.Component {
  render () {
    return (
      <NavigationContainer>
        <MainAppTab.Navigator
          tabBarOptions={{
            activeBackgroundColor: '#DDD',
            inactiveBackgroundColor: '#FFF',
            showIcon: true,
            showLabel: false,
          }}
        >
          <MainAppTab.Screen
            name="Search"
            component={SearchStackScreen}
            options={{
              title: 'Recherche',
              tabBarIcon: () => (
                <Image
                  source={require('../images/ic_search.png')}
                  style={styles.icon}
                />
              ),
            }}
          />
          <MainAppTab.Screen
            name="Favorites"
            component={FavoriteStackScreen}
            options={{
              title: 'Favoris',
              tabBarIcon: () => (
                <Image
                  source={require('../images/ic_favorite.png')}
                  style={styles.icon}
                />
              ),
            }}
          />
          <MainAppTab.Screen
            name="News"
            component={NewsStackScreen}
            options={{
              title: 'Nouveautées',
              tabBarIcon: () => (
                <Image
                  source={require('../images/ic_fiber_new.png')}
                  style={styles.icon}
                />
              ),
            }}
          />
        </MainAppTab.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
})
