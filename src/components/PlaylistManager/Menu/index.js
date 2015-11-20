import cx from 'classnames';
import React from 'react';
import naturalCmp from 'natural-compare';
import PlaylistRow from './Row';
import PlaylistCreateRow from './NewPlaylist';
import SearchResultsRow from './SearchResultsRow';

const byName = (a, b) => naturalCmp(a.name.toLowerCase(), b.name.toLowerCase());

const Menu = ({ className, playlists, selected, searchQuery, searchResults }) => {
  const sorted = playlists.slice().sort(byName);
  const searchIsSelected = selected ? '' : 'is-selected';
  return (
    <div className={cx('PlaylistMenu', className)}>
      <PlaylistCreateRow className="PlaylistMenu-row" />
      {searchQuery && (
        <SearchResultsRow
          className={cx('PlaylistMenu-row', searchIsSelected)}
          query={searchQuery}
          size={searchResults}
        />
      )}
      {sorted.map(pl => {
        return <PlaylistRow key={pl._id} className="PlaylistMenu-row" playlist={pl} />;
      })}
    </div>
  );
};

export default Menu;
