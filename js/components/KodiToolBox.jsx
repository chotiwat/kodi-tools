const React = require('react');
const KodiServerConfig = require('./KodiServerConfig');
const KodiPlaylist = require('./KodiPlaylist');
const KodiStreamForm = require('./KodiStreamForm');
const KodiAddonBrowser = require('./KodiAddonBrowser');
// const request = require('request');
// const urllib = require('url');
const KodiApi = require('../lib/kodi-api');

const KodiToolBox = React.createClass({
  config: { host: '192.168.0.110', port: 8080, user: 'kod', pass: 'kod' },
  api: null,
  getInitialState: function() {
    return {
      playlist: [] 
    };
  },
  componentWillMount: function() {
    this.api = new KodiApi(this.config);
  },
  refreshPlaylist: function() {
    console.log('refreshing playlist..');
    this.api.getPlaylist((err, response) => {
      console.log(err, response)
      if (!err) {
        this.setState({ playlist: response.items || [] });
      }
    });
  },
  updateConfig: function(config) {
    if (config) {
      this.config = config;
      this.api = new KodiApi(config);
      // this.xbmcApi.setConnection(conn);
    }
  },
  playStream: function(url) {
    console.log('playStream', this.config, {
        jsonrpc: '2.0',
        method: 'Player.Open',
        id: 1,
        params: [
          {
            file: url
          },
          {
            resume: true
          }
        ]
      });

    this.api.openFile(url, (err, response) => {
      console.log(err, response);
      this.refreshPlaylist();
    });
  },
  getApi: function() {
    return this.api;
  },
  render: function() {
    return (
      <div className="toolbox">
        <KodiServerConfig config={this.config} updateConfig={this.updateConfig} />
        <button className="btn btn-xs" type="button" onClick={this.refreshPlaylist}>
          Refresh Playlist
        </button>
        <KodiPlaylist data={this.state.playlist} />
        <KodiStreamForm playStream={this.playStream} />
        <KodiAddonBrowser getApi={this.getApi} playStream={this.playStream} />
      </div>
    );
  }
});

module.exports = KodiToolBox;