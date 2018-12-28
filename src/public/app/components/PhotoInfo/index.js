import React, { Component } from 'react';

class PhotoInfo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      photosInfo,
      selectedPhotoIndex
    } = this.props;
    const classNamePrefix = 'photo-info';

    return (
      <div className={`${classNamePrefix}`}>

        <a
          className={`${classNamePrefix}__username`}
          href={`https://www.flickr.com/photos/${photosInfo[selectedPhotoIndex].photo.owner.nsid}`}
        >
          {photosInfo[selectedPhotoIndex].photo.owner.username && photosInfo[selectedPhotoIndex].photo.owner.username}
        </a>

        <span>taken: {photosInfo && photosInfo[selectedPhotoIndex].photo.dates.taken.slice(0,10)}</span>
  
        {photosInfo[selectedPhotoIndex].photo.location &&
        <span>location: {photosInfo[selectedPhotoIndex].photo.location.country._content}</span>}

      </div>
    )
  }
}

export default PhotoInfo;