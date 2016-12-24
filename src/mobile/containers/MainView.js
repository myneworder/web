import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectPanel } from '../../actions/PanelSelectActionCreators';
import { toggleRoomHistory } from '../../actions/OverlayActionCreators';
import {
  mediaSelector,
  startTimeSelector
} from '../../selectors/boothSelectors';
import {
  sizeSelector as waitlistSizeSelector,
  positionSelector as waitlistPositionSelector
} from '../../selectors/waitlistSelectors';
import { playlistsSelector } from '../../selectors/playlistSelectors';

import { openDrawer } from '../actions/DrawerActionCreators';
import MainView from '../components/MainView';

const mapStateToProps = createStructuredSelector({
  selected: state => state.selectedPanel,
  media: mediaSelector,
  startTime: startTimeSelector,
  waitlistPosition: waitlistPositionSelector,
  waitlistSize: waitlistSizeSelector,
  playlists: playlistsSelector
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onTabChange: selectPanel,
  onOpenRoomHistory: toggleRoomHistory,
  onOpenDrawer: openDrawer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
