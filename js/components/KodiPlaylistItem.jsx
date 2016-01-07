const React = require('react');

const KodiPlaylistItem = React.createClass({
  render: function() {
    return (
      <li>
        {this.props.children.toString()}
      </li>
    );
  }
});

module.exports = KodiPlaylistItem;