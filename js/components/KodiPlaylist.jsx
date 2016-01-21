const React = require('react');
const KodiPlaylistItem = require('./KodiPlaylistItem');

const KodiPlaylist = React.createClass({
  render: function() {
    const playlistItems = this.props.data.map(function(playlistItem, index) {
      return (
        <KodiPlaylistItem key={index} data={playlistItem} />
      );
    });
    return (
      <ul className="playlist">
        {playlistItems}
      </ul>
    );
  }
});

module.exports = KodiPlaylist;