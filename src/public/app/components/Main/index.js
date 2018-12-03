import React, { Component } from 'react';
import { Navigation } from '../index.js';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedPhotoIndex: 0,
    }
  }
  
  handleSetPhotoIndex(index) {
    if (index >= 0 && index < this.props.highResPhotos.length) {
      this.setState({ selectedPhotoIndex: index })
    }
  }

  render() {
    const {
      handleUpdateWarningMessage,
      handleUserSearch,
      highResPhotos,
      loading,
      warningMessage,
    } = this.props;
    const { selectedPhotoIndex } = this.state;

    return (
      <div className="main">
        <img
          onLoad={() => this.props.handleUpdateLoading(false)}
          src={highResPhotos[selectedPhotoIndex]}
          style={loading ? { visibility: 'hidden' } : {}}
        />

        <Navigation
          handleSetPhotoIndex={(index) => this.handleSetPhotoIndex(index)}
          handleUserSearch={(username) => handleUserSearch(username)}
          selectedPhotoIndex={selectedPhotoIndex}
          warningMessage={warningMessage}
          handleUpdateWarningMessage={(message) => handleUpdateWarningMessage(message)}
        />
      </div>
    )
  }
}

export default Main;