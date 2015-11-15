import assign from 'object-assign';
import EventEmitter from 'eventemitter3';
import values from 'object-values';
import dispatcher from '../dispatcher';

let users = {};

const UserStore = assign(new EventEmitter, {
  getUser(id) {
    return users[id];
  },
  getUsers() {
    return values(users);
  },
  getOnlineUsers() {
    return values(users);
  },

  dispatchToken: dispatcher.register(({ type, payload }) => {
    switch (type) {
    case 'setUsers':
      users = payload.users.reduce((map, user) => {
        return assign(map, { [user._id]: user });
      }, {});
      UserStore.emit('change');
      break;
    case 'join':
      users[payload.user._id] = payload.user;
      UserStore.emit('change');
      break;
    case 'leave':
      delete users[payload.userID];
      UserStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default UserStore;