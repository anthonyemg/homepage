import React, { Component } from 'react';

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'anthonyemg',
    }
  }

  handleOnChange(e) {
    this.setState({ username: e.target.value })
  }

  handleOnEnterClick(username) {
    if (username !== '') {
      this.props.handleUserSearch(username);
    };
  }

  handleOnEnterKeyDown(e) {
    e.stopPropagation();
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

  render() {
    const {
      displayMenu,
      handleToggleMenu,
      isSearchLoading,
      username,
      warningMessage,
    } = this.props;

    return (
      <div
        className="side-menu-container"
        data-display-side-menu={displayMenu}
        onClick={() => handleToggleMenu()}
      >
        <div className="side-menu"
        onClick={(e) => e.stopPropagation()}
        >

        <div className="side-menu-navigation-search">
          {isSearchLoading &&
          <i className="side-menu-navigation-search-loading fa fa-spinner fa-spin"></i>}

          <input
            onChange={(e) => this.handleOnChange(e)}
            onKeyDown={(e) => this.handleOnEnterKeyDown(e)}
            value={username}
          />
          <div
            className="side-menu-navigation-search-button material-icons"
            onClick={() =>  this.handleOnEnterClick(username)}
          >
            search
          </div>
        </div> 

        {warningMessage !== '' && <div className="side-menu-navigation-search-warning">{warningMessage}</div>}

        </div>
      </div>
    )
  }
}

export default SideMenu;