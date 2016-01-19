const React = require('react');
const KodiServerConfig = require('./KodiServerConfig');
const KodiPlaylist = require('./KodiPlaylist');
const KodiStreamForm = require('./KodiStreamForm');
// const request = require('request');
// const urllib = require('url');
const KodiApi = require('../lib/kodi-api');

const KodiToolBox = React.createClass({
  config: {},
  api: null,
  componentDidMount: function() {
    setInterval(this.refreshPlaylist, 3000);
  },
  refreshPlaylist: function() {
    console.log('refreshing playlist..');
    this.api.getItem(function(err, response) {
      console.log(err, response)
      if (!err) {
        console.log(response);
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
    // request.get(urllib.format({
    //   protocol: 'http',
    //   hostname: this.config.host,
    //   port: this.config.port,
    //   pathname: '/jsonrpc',
    //   // auth: this.config.user + ':' + this.config.pass,
    //   query: {
    //     jsonrpc: '2.0',
    //     method: 'Player.Open',
    //     id: 1,
    //     params: [
    //       {
    //         file: url
    //       },
    //       {
    //         resume: true
    //       }
    //     ]
    //   }
    // }), {
    //   auth: {
    //     user: this.config.user,
    //     pass: this.config.pass
    //   },
    //   protocol: 'http:',
    //   // json: true
    // }, (response) => {
    //   console.log(response);
    // });

    this.api.openFile(url, (err, response) => {
      console.log(err, response);
    });

    // request.post(urllib.format({
    //   protocol: 'http',
    //   hostname: this.config.host,
    //   port: this.config.port,
    //   pathname: '/jsonrpc'
    // }), {
    //   auth: {
    //     user: this.config.user,
    //     pass: this.config.pass
    //   },
    //   protocol: 'http:',
    //   json: true,
    //   body: {
    //     jsonrpc: '2.0',
    //     method: 'Player.Open',
    //     id: 1,
    //     params: [
    //       {
    //         file: url
    //       },
    //       {
    //         resume: true
    //       }
    //     ]
    //   }
    // }, (response) => {
    //   console.log(response);
    // });
  },
  render: function() {
    return (
      <div className="toolbox">
        <KodiServerConfig updateConfig={this.updateConfig} />
        <KodiPlaylist data={[{ key: 'aaa' }, { key: 'bbb' }]} />
        <KodiStreamForm playStream={this.playStream} />
      </div>
    );
  }
});

module.exports = KodiToolBox;