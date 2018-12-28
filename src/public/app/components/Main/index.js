import React, { Component } from 'react';
import {
  Footer,
  Search,
  SideMenu,
} from '../index.js';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayMenu: false,
    }
  }

  handleToggleMenu() {
    this.setState({ displayMenu: !this.state.displayMenu })
  }

  render() {
    const { displayMenu } = this.state;
    const {
      handlePhotoOnLoad,
      handleRes,
      handleSetPhotoIndex,
      handleUpdateIsSearchLoading,
      handleUpdateWarningMessage,
      handleUserSearch,
      highResPhotos,
      isSearchLoading,
      loading,
      photosInfo,
      selectedPhotoIndex,
      warningMessage,
    } = this.props;
    const classNamePrefix = 'main';

    return (
      <div className={classNamePrefix}>
        <img
          onLoad={() => handlePhotoOnLoad()}
          src={highResPhotos[selectedPhotoIndex]}
          style={loading ? { visibility: 'hidden' } : {}}
        />

        {!loading &&
        <Search />}

        <SideMenu
          displayMenu={displayMenu}
          handleRes={(res) => handleRes(res)}
          handleToggleMenu={() => this.handleToggleMenu()}
          handleUpdateIsSearchLoading={(bool) => handleUpdateIsSearchLoading(bool)}
          handleUpdateWarningMessage={(message) => handleUpdateWarningMessage(message)}
          handleUserSearch={(username) => handleUserSearch(username)}
          isSearchLoading={isSearchLoading}
          warningMessage={warningMessage}
        />

        {!loading &&
        <Footer
          handleSetPhotoIndex={(index) => handleSetPhotoIndex(index)}
          handleToggleMenu={() => this.handleToggleMenu()}
          photosInfo={photosInfo}
          selectedPhotoIndex={selectedPhotoIndex}
        />}

      </div>
    )
  }
}

export default Main;