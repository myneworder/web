import { del, post, put } from '../utils/Request';
import { djSelector } from '../selectors/boothSelectors';
import { tokenSelector } from '../selectors/userSelectors';

import {
  SKIP_DJ_START, SKIP_DJ_COMPLETE,
  MOVE_USER_START, MOVE_USER_COMPLETE,
  REMOVE_USER_START, REMOVE_USER_COMPLETE
} from '../constants/actionTypes/moderation';

import {
  removeMessage, removeMessagesByUser, removeAllMessages
} from './ChatActionCreators';

export function skipCurrentDJ(reason = '', shouldRemove = false) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    const dj = djSelector(getState());
    if (!dj) {
      return null;
    }
    const payload = {
      userID: dj._id,
      reason,
      remove: shouldRemove
    };
    dispatch({
      type: SKIP_DJ_START,
      payload
    });
    return post(jwt, `/v1/booth/skip`, payload)
      .then(res => res.json())
      .then(() => dispatch({
        type: SKIP_DJ_COMPLETE,
        payload
      }))
      .catch(error => dispatch({
        type: SKIP_DJ_COMPLETE,
        error: true,
        payload: error,
        meta: payload
      }));
  };
}

export function removeCurrentDJ(reason = '') {
  return skipCurrentDJ(reason, true);
}

export function removeWaitlistUserStart(user) {
  return {
    type: REMOVE_USER_START,
    payload: { user }
  };
}

export function removeWaitlistUserComplete(user) {
  return {
    type: REMOVE_USER_COMPLETE,
    payload: { user }
  };
}

export function removeWaitlistUser(user) {
  return (dispatch, getState) => {
    dispatch(removeWaitlistUserStart(user));

    const jwt = tokenSelector(getState());
    const currentDJ = djSelector(getState());
    let promise;
    if (currentDJ && currentDJ._id === user._id) {
      promise = dispatch(removeCurrentDJ());
    } else {
      promise = del(jwt, `/v1/waitlist/${user._id}`)
        .then(res => res.json());
    }

    return promise
      .then(() => dispatch(removeWaitlistUserComplete(user)))
      .catch(error => dispatch({
        type: REMOVE_USER_COMPLETE,
        error: true,
        payload: error
      }));
  };
}

export function moveWaitlistUserStart(user, position) {
  return {
    type: MOVE_USER_START,
    payload: { user, position }
  };
}

export function moveWaitlistUserComplete(user, position) {
  return {
    type: MOVE_USER_COMPLETE,
    payload: { user, position }
  };
}

export function moveWaitlistUser(user, position) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch(moveWaitlistUserStart(user, position));
    put(jwt, `/v1/waitlist/move`, { userID: user._id, position })
      .then(res => res.json())
      .then(() => dispatch(moveWaitlistUserComplete(user, position)))
      .catch(error => dispatch({
        type: MOVE_USER_COMPLETE,
        error: true,
        payload: error,
        meta: { user, position }
      }));
  };
}

export function deleteChatMessage(id) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    del(jwt, `/v1/chat/${id}`)
      .then(res => res.json())
      .then(() => dispatch(removeMessage(id)))
      .catch(error => dispatch({
        type: undefined,
        error: true,
        payload: error,
        meta: { id }
      }));
  };
}

export function deleteChatMessagesByUser(userID) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    del(jwt, `/v1/chat/user/${userID}`)
      .then(res => res.json())
      .then(() => dispatch(removeMessagesByUser(userID)))
      .catch(error => dispatch({
        type: undefined,
        error: true,
        payload: error,
        meta: { userID }
      }));
  };
}

export function deleteAllChatMessages() {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    del(jwt, `/v1/chat`)
      .then(res => res.json())
      .then(() => dispatch(removeAllMessages()))
      .catch(error => dispatch({
        type: undefined,
        error: true,
        payload: error
      }));
  };
}
