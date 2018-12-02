import React, { Component } from 'react';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      showSearchBar: false,
    }
  }

  handleOnEnterKeyPress(e) {
    const { username } = this.state;
    if (e.key === 'Enter' && username !== '') {
      this.props.handleUserSearch(username);
      this.handleDisplaySearchBar(false);
    }
  }

  handleDisplaySearchBar(bool) {
    this.setState({ showSearchBar: bool });
  }

  handleOnEnterClick(username) {
    if (username !== '') {
      this.props.handleUserSearch(usernameusername);
      this.handleDisplaySearchBar(false);
    };
  }

  render() {
    const {
      handleSetPhotoIndex,
      handleUserSearch,
      selectedPhotoIndex,
    } = this.props;
    const { username, showSearchBar } = this.state;
  
    return (
      <div className="navigation">

        {showSearchBar ?
          <div className="navigation-search">
            <input
              onChange={(e) => this.setState({ username: e.target.value })}
              onKeyPress={(e) => this.handleOnEnterKeyPress(e)}
              value={username}
            />
            <div
              className="navigation-buttons material-icons"
              onClick={() =>  this.handleOnEnterClick(username)}
            >
              search
            </div>
          </div> :
          <div
            className="navigation-buttons material-icons"
            onClick={() => this.handleDisplaySearchBar(true)}
          >
            search
          </div>
        }

        <div
          className="navigation-buttons material-icons"
          onClick={() => handleSetPhotoIndex(selectedPhotoIndex - 1)}
        >
          arrow_back_ios
        </div>

        <div
          className="navigation-buttons material-icons"
          onClick={() => handleSetPhotoIndex(selectedPhotoIndex + 1)}
        >
          arrow_forward_ios
        </div>
      </div>
    )
  }
}

export default Navigation;