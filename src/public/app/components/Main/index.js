import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedPhotoIndex: 0,
    }
  }

  handlePhotoURL(photo) {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
  }

  handleSetPhotoIndex(index) {
    if (index >= 0 && index < this.props.photos.length) {
      this.setState({ selectedPhotoIndex: index })
    }
  }

  render() {
    const { photos } = this.props;
    const { selectedPhotoIndex } = this.state;

    return (
      <div
        className="main"
        style={{
          backgroundImage: `url(${this.handlePhotoURL(photos[selectedPhotoIndex])})`,
        }}
      >
        <button
          onClick={() => this.handleSetPhotoIndex(selectedPhotoIndex - 1)}
        >
          prev
        </button>

        <button
          onClick={() => this.handleSetPhotoIndex(selectedPhotoIndex + 1)}
        >
          next
        </button>
      </div>
    )
  }
}

export default Main;