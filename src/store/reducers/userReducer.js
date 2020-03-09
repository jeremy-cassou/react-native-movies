const initialState = {
  avatar: null,
}

/**
 * Set an avatar for user
 * @param {Object} state State to reduce
 * @param {Object} action Action to execute
 */
function setAvatar (state, action) {
  return { ...state, avatar: action.value }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_AVATAR':
      return setAvatar(state, action)
    default:
      return state
  }
}
