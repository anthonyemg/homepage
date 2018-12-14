import React, { Component } from 'react';
import { Navigation, Menu, Search } from '../index.js';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayMenu: false,
    }
  }

  handleToggleMenu() {
    console.log('handleToggleMenu', !this.state.displayMenu)
    this.setState({ displayMenu: !this.state.displayMenu })
  }

  render() {
    const { displayMenu } = this.state;
    const {
      handlePhotoOnLoad,
      handleSetPhotoIndex,
      handleUpdateIsSearchLoading,
      handleUpdateWarningMessage,
      handleUserSearch,
      highResPhotos,
      isSearchLoading,
      loading,
      selectedPhotoIndex,
      warningMessage,
    } = this.props;

    return (
      <div className="main">
        <img
          onLoad={() => handlePhotoOnLoad()}
          src={highResPhotos[selectedPhotoIndex]}
          style={loading ? { visibility: 'hidden' } : {}}
        />

        {!loading &&
        <Search />}

        <Menu
          displayMenu={displayMenu}
          handleToggleMenu={() => this.handleToggleMenu()}
        />

        <Navigation
          handleSetPhotoIndex={(index) => handleSetPhotoIndex(index)}
          handleToggleMenu={() => this.handleToggleMenu()}
          handleUpdateIsSearchLoading={(bool) => handleUpdateIsSearchLoading(bool)}
          handleUpdateWarningMessage={(message) => handleUpdateWarningMessage(message)}
          handleUserSearch={(username) => handleUserSearch(username)}
          isSearchLoading={isSearchLoading}
          selectedPhotoIndex={selectedPhotoIndex}
          warningMessage={warningMessage}
        />
      </div>
    )
  }
}

export default Main;