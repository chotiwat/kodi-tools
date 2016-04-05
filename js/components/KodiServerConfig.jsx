const React = require('react');

const KodiServerConfig = React.createClass({
  getInitialState: function() {
    return this.props.config;
  },
  updateConfig: function() {
    this.props.updateConfig(this.state);
  },
  handleHostChange: function(e) {
    this.setState({ host: e.target.value }, this.updateConfig);
  },
  handlePortChange: function(e) {
    this.setState({ port: e.target.value }, this.updateConfig);
  },
  handleUserChange: function(e) {
    this.setState({ user: e.target.value }, this.updateConfig);
  },
  handlePasswordChange: function(e) {
    this.setState({ pass: e.target.value }, this.updateConfig);
  },
  render: function() {
    return (
      <form className="server-config">
        <div className="control-group">
          <label htmlFor="host">Host: </label> 
          <input id="host" type="text" value={this.state.host} onChange={this.handleHostChange} /> 
          <label htmlFor="port">Port: </label>
          <input id="port" type="number" value={this.state.port} onChange={this.handlePortChange} />
        </div>
        <div className="control-group">
          <label htmlFor="user">User: </label> 
          <input id="user" type="text" value={this.state.user} onChange={this.handleUserChange} /> 
          <label htmlFor="pass">Pass: </label>
          <input id="pass" type="password" value={this.state.pass} onChange={this.handlePasswordChange} />
        </div>
      </form>
    );
  }
});

module.exports = KodiServerConfig;