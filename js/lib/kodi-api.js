'use strict';

// const rpc = require('json-rpc2');
const urllib = require('url');
const $ = require('jquery');
const async = require('async');

class KodiApi {
  constructor(config) {
    this.config = config;
    // this.client = rpc.Client.$create(config.port, config.host, config.user, config.pass);
  }

  call(method, params, callback) {
    $.ajax({
      type: 'GET',
      url: urllib.format({
        protocol: 'http',
        hostname: this.config.host,
        port: this.config.port,
        pathname: '/jsonrpc',
        auth: this.config.user + ':' + this.config.pass
      }),
      // mimeType: 'application/json',
      dataType: 'jsonp',
      jsonpCallback: 'jsonCallback',
      // auth: this.config.user + ':' + this.config.pass,
      data: 'request=' + encodeURIComponent(JSON.stringify({
        jsonrpc: '2.0',
        method: method,
        id: 1,
        params: params
      }))
    })
    .done(function(data) {
      callback(null, data.result);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      callback(errorThrown);
    });

    // this.client.call(method, params, { path: '/jsonrpc' }, callback);
  }

  openFile(url, callback) {
    this.call('Player.Open', [ { file: url }, { resume: true } ], callback);
  }

  getPlaylist(callback) {
    async.waterfall([
      cb => {
        this.call('Player.GetActivePlayers', [], cb);
      },
      (activePlayers, cb) => {
        console.log('activePlayers', activePlayers);
        let player;
        activePlayers.forEach(activePlayer => {
          console.log(activePlayer);
          if (activePlayer.type === 'picture')
            return;
          if (activePlayer.type === 'video' || !player) {
            player = activePlayer;
          }
        });
        console.log('player', player);
        if (player) {
          this.call('Player.GetProperties', [player.playerid, ['playlistid']], cb);
        } else {
          cb(new Error('No active player found'));
        }
      },
      (player, cb) => {
        this.call('Playlist.GetItems', [player.playlistid, [
          'duration',
          'title',
          'file'
        ]], cb);
      }
    ], callback);
  }
}

module.exports = KodiApi;