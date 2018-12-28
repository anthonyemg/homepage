import React, { Component } from 'react';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleSetPhotoIndex,
      handleToggleMenu,
      selectedPhotoIndex,
    } = this.props;
    const classNamePrefix = "navigation";

    return (
      <div className={classNamePrefix}>
        <div className={`${classNamePrefix}--buttons`}>
          <div
            className="material-icons"
            onClick={() => handleSetPhotoIndex(selectedPhotoIndex - 1)}
          >
            arrow_back_ios
          </div>

          <div
            className="material-icons"
            onClick={() => handleSetPhotoIndex(selectedPhotoIndex + 1)}
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