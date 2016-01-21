const React = require('react');

const KodiPlaylistItem = React.createClass({
  render: function() {
    let item = this.props.data;
    return (
      <li>
        {item.label} <small>{item.file}</small>
      </li>
    );
  }
});

module.exports = KodiPlaylistItem;