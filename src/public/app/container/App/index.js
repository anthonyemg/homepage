import React, { Component } from 'react';
import { Loading, Main } from '../../components';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      highResPhotos: [],
      isSearchLoading: false,
      loading: true,
      photosDetails: [],
      searchedUsername: '',
      selectedPhotoIndex: 0,
      userDetails: {},
      warningMessage: '',
    }
  }

  componentWillMount() {
    this.handleUserSearch('anthonyemg');
  
    document.onkeydown = (e) => this.handleKeyPress(e);
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
          this.handleFetchPhotos(res.user.id, username);
        } else {
          this.handleUpdateWarningMessage('Username is not found.');
        }
      })
      .catch(err => console.error('Fetch user details error:', err))
  }

  handleIsUsernameInvalid(boolean) {
    this.setState({ isUsernameInvalid: boolean });
  }

  handleAddPhotoSizes(photos, username) {
    const promises = photos.map(photo => {
      return fetch(`/photo-sizes/${photo.id}`);
    })

    Promise.all(promises)
      .then(res => Promise.all(res.map(res => res.json())))
      .then(res => this.handleHighResPhotos(res, username))
      .catch(err => console.error('Fetch photo sizes error:', err))
  }

  handleFetchPhotos(userID, username) {
    fetch(`/photos/${userID}`)
      .then(res => res.json())
      .then(res => {
        res.photos.photo.length !== 0 ?
          this.handleAddPhotoSizes(res.photos.photo, username) :
          this.handleUpdateWarningMessage('Photos are unavailable for this username.');
      })
      .catch((err) => console.error('Fetch photos error:', err));
  }

  handleHighResPhotos(photos, username) {
    const highResPhotos = photos.map(photo => {
      return photo.sizes.size[photo.sizes.size.length - 2].source;
    })

    this.handlePreloadPhotos(highResPhotos);
    this.setState({
      highResPhotos,
      searchedUsername: username,
      selectedPhotoIndex: this.handleRandomPhoto(highResPhotos.length),
    });
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

  render() {
    const {
      highResPhotos,
      isSearchLoading,
      loading,
      selectedPhotoIndex,
      userDetails,
      warningMessage,
    } = this.state;

    return (
      <div className="app">
        {loading &&
        <Loading />}

        <Main
          handlePhotoOnLoad={() => this.handlePhotoOnLoad()}
          handleSetPhotoIndex={(index) => this.handleSetPhotoIndex(index)}
          handleUpdateIsSearchLoading={(bool) => this.handleUpdateIsSearchLoading(bool)}
          handleUpdateWarningMessage={(message) => this.handleUpdateWarningMessage(message)}
          handleUserSearch={(username) => this.handleUserSearch(username)}
          highResPhotos={highResPhotos}
          isSearchLoading={isSearchLoading}
          loading={loading}
          selectedPhotoIndex={selectedPhotoIndex}
          userDetails={userDetails}
          warningMessage={warningMessage}
        />
      </div>
    )
  }
}

export default App;
