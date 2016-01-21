const React = require('react');
const KodiFileLink = require('./KodiFileLink');

const KodiDirectoryPane = React.createClass({

  render: function() {
    let files = this.props.data.map(file => {
      return (
        <KodiFileLink key={file.file} className="list-group-item" data={file} navigate={this.props.navigate} />
      );
    })
    return (
      <div className="panel panel-default">
        <div className="list-group">
          {files}
        </div>
      </div>
    );
  }

});

module.exports = KodiDirectoryPane;