const React = require('react');

const KodiFileLink = React.createClass({

  handleNavigate: function(event) {
    event.preventDefault();
    this.props.navigate(this.props.data, this.props.level);
  },

  render: function() {
    return (
      <a href="#" className={this.props.className} onClick={this.handleNavigate}>
        {this.props.data.label}
      </a>
    );
  }

});

module.exports = KodiFileLink;