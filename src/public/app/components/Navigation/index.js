import React, { Component } from 'react';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'anthonyemg',
    }
  }

  handleOnEnterKeyDown(e) {
    const { username } = this.state;
    const {
      handleUpdateWarningMessage,
      handleUserSearch,
      warningMessage,
    } = this.props;

    if (e.keyCode === 13 && username !== '') {
      handleUserSearch(username);
    }
    if (e.keyCode !== 13 && warningMessage !== '') {
      handleUpdateWarningMessage('');
    }
  }

  handleOnEnterClick(username) {
    if (username !== '') {
      this.props.handleUserSearch(username);
    };
  }

  render() {
    const {
      handleSetPhotoIndex,
      isSearchLoading,
      selectedPhotoIndex,
      warningMessage,
    } = this.props;
    const { username } = this.state;

    return (
      <div className="navigation">
        <div className="navigation-search">
          {warningMessage !== '' && <span className="navigation-search-warning">{warningMessage}</span>}

          {isSearchLoading &&
          <i className="navigation-search-warning fa fa-spinner fa-spin"></i>}

          <input
            onChange={(e) => this.setState({ username: e.target.value })}
            onKeyDown={(e) => this.handleOnEnterKeyDown(e)}
            value={username}
          />
          <div
            className="navigation-search-button material-icons"
            onClick={() =>  this.handleOnEnterClick(username)}
          >
            search
          </div>
        </div> 

        <div className="navigation-buttons">
          <div
            className="material-icons"
            onClick={() => handleSetPhotoIndex(selectedPhotoIndex - 1)}
          >
            arrow_back_ios
          </div>

          <div
            className="material-icons"
            onClick={() => handleSetPhotoIndex(selectedPhotoIndex + 1)}
          >
            arrow_forward_ios
          </div>
        </div>
      </div>
    )
  }
}

export default Navigation;