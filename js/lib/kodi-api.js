'use strict';

// const rpc = require('json-rpc2');
const urllib = require('url');
const $ = require('jquery');

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
        pathname: '/jsonrpc'
      }),
      user: this.config.user,
      password: this.config.password,
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
      callback(null, data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      callback(errorThrown);
    });

    // this.client.call(method, params, { path: '/jsonrpc' }, callback);
  }

  openFile(url, callback) {
    this.call('Player.Open', [ { file: url }, { resume: true } ], callback);
  }

  getItem(callback) {
    this.call('Player.GetItem', [ 1, [] ], callback);
  }
}

module.exports = KodiApi;