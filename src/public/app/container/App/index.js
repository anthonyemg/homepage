import React, { Component } from 'react';
import { Loading, Main } from '../../components';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      highResPhotos: [],
      isSearchLoading: false,
      key: 0,
      loading: true,
      photosDetails: [],
      searchedUsername: '',
      selectedPhotoIndex: 0,
      userDetails: {},
      warningMessage: '',
      selectedRes: 'low'
    }
  }

  componentWillMount() {
    this.handleUserSearch('anthonyemg');
  
    window.onkeydown = (e) => this.handleKeyPress(e);
  }

  handleKeyPress(e) {
    const { selectedPhotoIndex } = this.state;

    if (e.keyCode === 37) {
      this.handleSetPhotoIndex(selectedPhotoIndex - 1);
    }
    if (e.keyCode === 39) {
      this.handleSetPhotoIndex(selectedPhotoIndex + 1);
    }
  }

  handleUpdateIsSearchLoading(bool) {
    this.setState({ isSearchLoading: bool });
  }

  handleUpdateWarningMessage(message) {
    this.setState({
      isSearchLoading: false,
      warningMessage: message
    });
  }

  handleFetchUserDetails(username) {
    fetch(`/user-details/${username}`)
      .then(res => res.json())
      .then(res => {
        if (res.stat === 'ok') {
          this.handleFetchPhotosIds(res.user.id, username);
        } else {
          this.handleUpdateWarningMessage('Username is not found.');
        }
      })
      .catch(err => console.error('Fetch user details error:', err))
  }

  handleIsUsernameInvalid(boolean) {
    this.setState({ isUsernameInvalid: boolean });
  }

  handleFetchPhotosSizes(photos, username) {
    const promises = photos.map(photo => {
      return fetch(`/photo-sizes/${photo.id}`);
    })

    return Promise.all(promises);
  }

  handleFetchPhotosInfo(photos) {
    const promises = photos.map(photo => {
      return fetch(`/photo-info/${photo.id}`);
    })

    return Promise.all(promises);
  }

  handleFetchPhotosAndIds(photos, username) {
    const fetchPhotosInfo = this.handleFetchPhotosInfo(photos);
    const fetchPhotosSizes = this.handleFetchPhotosSizes(photos, username);

    Promise.all([fetchPhotosInfo, fetchPhotosSizes])
      .then(res => Promise.all(res.map(res => Promise.all(res.map(res => res.json())))))
      .then(res => {
        this.setState({
          highResPhotos: this.handleHighResPhotos(res[1]),
          key: Math.random(),
          photosInfo: res[0],
          searchedUsername: username,
          selectedPhotoIndex: 0,
        })
        
      })
      .catch(err => console.error('Fetch photos and IDs error:', err))
  }

  handleFetchPhotosIds(userID, username) {
    fetch(`/photos-ids/${userID}`)
      .then(res => res.json())
      .then(res => {
        res.photos.photo.length !== 0 ?
          this.handleFetchPhotosAndIds(res.photos.photo, username) :
          this.handleUpdateWarningMessage('Photos are unavailable for this username.');
      })
      .catch((err) => console.error('Fetch photos error:', err));
  }

  handleHighResPhotos(photos) {
    const { selectedRes } = this.state;
    const res = {
      low: 2,
      high: 1,
    }

    const highResPhotos = photos.map(photo => {
      return photo.sizes.size[photo.sizes.size.length - res[selectedRes]].source;
    })

    this.handlePreloadPhotos(highResPhotos);

    return highResPhotos;
  }

  handlePhotoOnLoad() {
    if (this.state.loading !== false) {
      this.setState({ loading: false })
    }

    this.handleUpdateIsSearchLoading(false);
  }

  handlePreloadPhotos(highResPhotos) {    
    const preloadPhotos = highResPhotos.map((picture) => {
      const img = new Image();
      img.src = picture;
      
      return img;
    });
    
    this.preloadedImages = preloadPhotos;
  }

  handleRandomIndex(length) {
    return Math.floor(Math.random() * length);
  }

  handleRandomPhoto(length) {
    let index = this.handleRandomIndex(length)

    while (index === this.state.selectedPhotoIndex) {
      index = this.handleRandomIndex(length);
    }

    return index;
  }

  handleUserSearch(username) {
    this.handleFetchUserDetails(username);
    this.setState({ isSearchLoading: true });
  }

  handleSetPhotoIndex(index) {
    if (index >= 0 && index < this.state.highResPhotos.length) {
      this.setState({ selectedPhotoIndex: index })
      this.handleUpdateIsSearchLoading(true);
    }
  }

  handleRes(res) {
    this.setState({ selectedRes: res });
    this.handleUserSearch(this.state.searchedUsername);
  }

  render() {
    const {
      highResPhotos,
      isSearchLoading,
      key,
      loading,
      photosInfo,
      selectedPhotoIndex,
      userDetails,
      warningMessage,
    } = this.state;
    const classNamePrefix = "app";

    return (
      <div className={classNamePrefix}>
        {loading &&
        <Loading />}

        <Main
          handlePhotoOnLoad={() => this.handlePhotoOnLoad()}
          handleRes={(res) => this.handleRes(res)}
          handleSetPhotoIndex={(index) => this.handleSetPhotoIndex(index)}
          handleUpdateIsSearchLoading={(bool) => this.handleUpdateIsSearchLoading(bool)}
          handleUpdateWarningMessage={(message) => this.handleUpdateWarningMessage(message)}
          handleUserSearch={(username) => this.handleUserSearch(username)}
          highResPhotos={highResPhotos}
          isSearchLoading={isSearchLoading}
          key={key}
          loading={loading}
          photosInfo={photosInfo}
          selectedPhotoIndex={selectedPhotoIndex}
          userDetails={userDetails}
          warningMessage={warningMessage}
        />
      </div>
    )
  }
}

export default App;
