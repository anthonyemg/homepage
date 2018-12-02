import React, { Component } from 'react';


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