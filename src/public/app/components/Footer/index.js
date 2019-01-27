import React, { Component } from 'react';
import { Navigation, PhotoInfo } from '../../components';

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      handleSetPhotoIndex,
      handleToggleMenu,
      highResPhotos,
      photosInfo,
      selectedPhotoIndex,
    } = this.props;
    const classNamePrefix = 'footer';
  
    return (
      <div className={classNamePrefix}>
        <PhotoInfo
          photosInfo={photosInfo}
          selectedPhotoIndex={selectedPhotoIndex}
        />

        <Navigation
          handleSetPhotoIndex={(index) => handleSetPhotoIndex(index)}
          handleToggleMenu={() => handleToggleMenu()}
          highResPhotos={highResPhotos}
          selectedPhotoIndex={selectedPhotoIndex}
        />
      </div>
    )
  }
}

export default Footer;