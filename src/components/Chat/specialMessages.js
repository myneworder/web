import LogMessage from './LogMessage';
import JoinMessage from './NotificationMessages/JoinMessage';
import LeaveMessage from './NotificationMessages/LeaveMessage';
import NameChangedMessage from './NotificationMessages/NameChangedMessage';
import SkipMessage from './NotificationMessages/SkipMessage';

export default {
  log: LogMessage,
  userJoin: JoinMessage,
  userLeave: LeaveMessage,
  userNameChanged: NameChangedMessage,
  skip: SkipMessage
};
