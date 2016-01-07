const React = require('react');
const ReactDom = require('react-dom');
const $ = require('jquery');

const KodiToolBox = require('./components/KodiToolBox');

ReactDom.render(
  <KodiToolBox />,
  $('#content').get(0)
);