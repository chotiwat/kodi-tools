const React = require('react');
const Xbmc = require('xbmc');

const KodiServerConfig = React.createClass({
  getInitialState: function() {
    return { host: '192.168.0.110', port: 8080, conn: null };
  },
  handleHostChange: function(e) {
    this.setState({ host: e.target.value });
  },
  handlePortChange: function(e) {
    this.setState({ port: e.target.value });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.conn) {
      this.state.conn.close();
      this.setState({ conn: null });
    } else {
      this.setState({
        conn: new Xbmc.TCPConnection({
          host: this.state.host,
          port: this.state.port
        })
      });
    }

    this.props.updateConnection(this.state.conn);
  },
  render: function() {
    let connectString = this.state.conn ? 'Disconnect' : 'Connect';
    return (
      <form className="server-config" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.host} disabled={!!this.state.conn}
          onChange={this.handleHostChange} />
        <input type="number" value={this.state.port} disabled={!!this.state.conn}
          onChange={this.handlePortChange} />
        <button type="submit">{connectString}</button>
      </form>
    );
  }
});

module.exports = KodiServerConfig;