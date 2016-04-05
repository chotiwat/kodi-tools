const React = require('react');
const KodiDirectoryPane = require('./KodiDirectoryPane');
const KodiFileLink = require('./KodiFileLink');

const KodiAddonBrowser = React.createClass({
  getInitialState: function() {
    return {
      breadcrumbs: [],
      files: []
    };
  },
  componentDidMount: function() {
    this.listAddons();
  },
  listAddons: function() {
    this.props.getApi().call('Addons.GetAddons', ['xbmc.addon.video'], (err, response) => {
      console.log('addons:', response);
      if (!err) {
        this.setState({
          breadcrumbs: [],
          files: response.addons.map(addon => {
            return {
              label: addon.addonid,
              file: 'plugin://' + addon.addonid + '/',
              filetype: 'directory'
            };
          })
        });
      }
    });
  },
  navigate: function(file, level) {
    if (file.filetype === 'directory') {
      console.log('dir', file);
      this.props.getApi().call('Files.GetDirectory', [file.file], (err, response) => {
        if (err) {
          console.error('getdir', err);
        } else {
          let breadcrumbs = this.state.breadcrumbs.slice(0, level);
          this.setState({
            breadcrumbs: breadcrumbs.concat(file),
            files: response.files
          });
        }
      });
    } else {
      // TODO: play file
      console.log('file', file);
      this.props.playStream(file.file);
    }
  },
  handleListAddons: function(event) {
    event.preventDefault();
    this.listAddons();
  },
  render: function() {
    let breadcrumbs = this.state.breadcrumbs.map((directory, index) => {
      return (
        <li key={directory.file}>
          <KodiFileLink navigate={this.navigate} data={directory} level={index} />
        </li>
      )
    });

    // let kodiAddons = this.state.addons.map((addon, index) => {
    //   return (<KodiAddon key={addon.addonid} data={addon} />)
    // });
    return (
      <div>
        <ol className="breadcrumb">
          <li><a href="#" onClick={this.handleListAddons}>Addons</a></li>
          {breadcrumbs}
        </ol>
        <KodiDirectoryPane data={this.state.files} navigate={this.navigate} />
      </div>
    );
  }

});

module.exports = KodiAddonBrowser;