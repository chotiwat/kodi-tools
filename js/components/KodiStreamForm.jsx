const React = require('react');

const KodiStreamForm = React.createClass({
  getInitialState: function() {
    return { streamUrl: '' };
  },
  handleStreamChange: function(e) {
    
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({ streamUrl: e.target.value });
    this.props.playStream(this.state.streamUrl);
  },
  render: function() {
    return (
      <form className="stream-form" onSubmit={this.handleSubmit}>
        <input type="url" value={this.state.streamUrl} onChange={this.handleStreamChange} />
        <button type="submit">Play</button>
      </form>
    );
  }
});

module.exports = KodiStreamForm;