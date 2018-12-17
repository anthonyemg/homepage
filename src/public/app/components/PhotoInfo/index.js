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

    return (
      <div className="photo-info">
        <a href={`https://www.flickr.com/photos/${photosInfo[selectedPhotoIndex].photo.owner.nsid}`}>{photosInfo[selectedPhotoIndex].photo.owner.username && photosInfo[selectedPhotoIndex].photo.owner.username}</a>
        <span>taken: {photosInfo && photosInfo[selectedPhotoIndex].photo.dates.taken}</span>
        {photosInfo[selectedPhotoIndex].photo.location && <span>location: {photosInfo[selectedPhotoIndex].photo.location.country._content}</span>}
      </div>
    )
  }
}

export default PhotoInfo;