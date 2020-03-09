import { createStore } from 'redux'
import { persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import favoriteReducer from './reducers/favoriteReducer'
import userReducer from './reducers/userReducer'

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

export default createStore(persistCombineReducers(rootPersistConfig, {
  favoriteMovies: favoriteReducer,
  user: userReducer,
}))
