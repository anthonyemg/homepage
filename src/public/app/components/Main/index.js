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
    const { highResPhotos, loading } = this.props;
    const { selectedPhotoIndex } = this.state;

    return (
      <div className="main">
        <img
          onLoad={() => this.props.handleLoading(false)}
          src={highResPhotos[selectedPhotoIndex]}
          style={loading ? { visibility: 'hidden' } : {}}
        />

        <Navigation
          handleSetPhotoIndex={(index) => this.handleSetPhotoIndex(index)}
          selectedPhotoIndex={selectedPhotoIndex}
        />
      </div>
    )
  }
}

export default Main;