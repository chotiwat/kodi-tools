const React = require('react');
const KodiPlaylistItem = require('./KodiPlaylistItem');

const KodiPlaylist = React.createClass({
  render: function() {
    const playlistItems = this.props.data.map(function(playlistItem) {
      return (
        <KodiPlaylistItem key={playlistItem.key}>
          {JSON.stringify(playlistItem)}
        </KodiPlaylistItem>
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