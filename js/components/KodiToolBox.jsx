const React = require('react');
const KodiServerConfig = require('./KodiServerConfig');
const KodiPlaylist = require('./KodiPlaylist');
const KodiStreamForm = require('./KodiStreamForm');
const XbmcApi = require('xbmc').XbmcApi;

const KodiToolBox = React.createClass({
  config: {},
  updateConnection: function(conn) {
    if (conn) {
      this.xbmcApi.setConnection(conn);
    }
  },
  playStream: function(url) {
    this.xbmcApi.player.openFile(url);
  },
  render: function() {
    return (
      <div className="toolbox">
        <KodiServerConfig updateConnection={this.updateConnection} />
        <KodiPlaylist data={[{ key: 'aaa' }, { key: 'bbb' }]} />
        <KodiStreamForm playStream={this.playStream} />
      </div>
    );
  }
});

module.exports = KodiToolBox;