import React, { Component } from 'react';
import { Navigation, Search } from '../index.js';

class Main extends Component {
  constructor(props) {
    super(props)
  
  }

  render() {
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

        <Navigation
          handleSetPhotoIndex={(index) => handleSetPhotoIndex(index)}
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