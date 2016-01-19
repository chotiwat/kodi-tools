const React = require('react');

const KodiServerConfig = React.createClass({
  getInitialState: function() {
    return { host: '192.168.0.110', port: 8080, user: 'kod', pass: 'kod' };
  },
  handleHostChange: function(e) {
    this.setState({ host: e.target.value });
  },
  handlePortChange: function(e) {
    this.setState({ port: e.target.value });
  },
  handleUserChange: function(e) {
    this.setState({ user: e.target.value });
  },
  handlePasswordChange: function(e) {
    this.setState({ pass: e.target.value });
  },
  // handleSubmit: function(e) {
  //   e.preventDefault();
  //   let config;
  //   if (this.state.config) {
  //     config = null;
  //   } else {
  //     config = {
  //       host: this.state.host,
  //       port: this.state.port,
  //       user: 'kod',
  //       pass: 'kod'
  //     };
  //   }

  //   this.setState({ config: config });
  //   this.props.updateConfig(config);
  // },
  render: function() {
    this.props.updateConfig({
      host: this.state.host,
      port: this.state.port,
      user: this.state.user,
      pass: this.state.pass
    });
    let connectString = this.state.config ? 'Disconnect' : 'Connect';
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