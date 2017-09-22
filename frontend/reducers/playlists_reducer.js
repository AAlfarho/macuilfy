import merge from 'lodash/merge';
import {
  RECEIVE_PLAYLISTS,
  RECEIVE_PLAYLIST,
  REMOVE_PLAYLIST
} from '../actions/playlist_actions';

const PlaylistsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};
  switch (action.type) {
    case RECEIVE_PLAYLISTS:
    debugger;
      return merge({}, state, action.playlists.playlist_detail);
    case RECEIVE_PLAYLIST:
    debugger;
      nextState = merge({}, state);
      const key = parseInt(Object.keys(action.playlist.playlist_detail)[0]);
      nextState[key] = action.playlist.playlist_detail[key];
      return nextState;
    case REMOVE_PLAYLIST:
    debugger;
      nextState = merge({}, state);
      delete nextState[parseInt(Object.keys(action.playlist.playlist_detail)[0])];
      return nextState;
    default:
      return state;
  }
};

export default PlaylistsReducer;