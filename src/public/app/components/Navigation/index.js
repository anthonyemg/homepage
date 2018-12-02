import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    const { handleSetPhotoIndex, selectedPhotoIndex } = this.props;
  
    return (
      <div className="navigation">
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