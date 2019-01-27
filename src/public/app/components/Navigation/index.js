import React, { Component } from 'react';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  handleNextPhotoIndex(index, direction, length) {
    if (direction === 'left' && index === 0) {
      return length - 1;
    }
    if (direction === 'left') {
      return index - 1;
    }
    if (direction === 'right' && index === (length - 1)) {
      return 0;
    }
    if (direction === 'right') {
      return index + 1;
    }
  }

  render() {
    const {
      handleSetPhotoIndex,
      handleToggleMenu,
      highResPhotos,
      selectedPhotoIndex,
    } = this.props;
    const classNamePrefix = "navigation";

    return (
      <div className={classNamePrefix}>
        <div className={`${classNamePrefix}--buttons`}>
          <div
            className="material-icons"
            onClick={() => handleSetPhotoIndex(this.handleNextPhotoIndex(selectedPhotoIndex, 'left', highResPhotos.length))}
          >
            arrow_back_ios
          </div>

          <div
            className="material-icons"
            onClick={() => handleSetPhotoIndex(this.handleNextPhotoIndex(selectedPhotoIndex, 'right', highResPhotos.length))}
          >
            arrow_forward_ios
          </div>

          <div
            className="material-icons"
            onClick={() => handleToggleMenu()}
          >
            more_vert
          </div>
        </div>
      </div>
    )
  }
}

export default Navigation;