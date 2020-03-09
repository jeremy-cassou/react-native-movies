const initialState = []

/**
 * Toggle movie from favorite list
 * @param {Object} state State to reduce
 * @param {Object} action Action to execute
 */
function toggleFavorite (state, action) {
  if (state.some((item) => item.id === action.value.id)) {
    return state.filter((item) => item.id !== action.value.id)
  }
  return [...state, action.value]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return toggleFavorite(state, action)
    default:
      return state
  }
}
