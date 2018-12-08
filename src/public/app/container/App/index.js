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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userDetails !== this.state.userDetails) {
      console.log('componentDidUpdate if')
      // this.setState({ selectedPhotoIndex: 0 });
    }
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
    this.handleUpdateIsSearchLoading(false);
    this.setState({ warningMessage: message });
  }

  handleFetchUserDetails(username) {
    fetch(`/user-details/${username}`)
      .then(res => res.json())
      .then(res => {
        if (res.stat === 'ok') {
          this.setState({ userDetails: res });
          this.handleFetchPhotos(res.user.id);
        } else {
          this.handleUpdateWarningMessage('Username is not found.');
        }
      })
      .catch(err => console.error('Fetch user details error:', err))
  }

  handleIsUsernameInvalid(boolean) {
    this.setState({ isUsernameInvalid: boolean });
  }

  handleAddPhotoSizes() {
    const promises = this.state.photosDetails.map(photo => {
      return fetch(`/photo-sizes/${photo.id}`);
    })

    Promise.all(promises)
      .then(res => Promise.all(res.map(res => res.json())))
      .then(res => this.handleHighResPhotos(res))
      .catch(err => console.error('Fetch photo sizes error:', err))
  }

  handleFetchPhotos(userID) {
    fetch(`/photos/${userID}`)
      .then(res => res.json())
      .then(res => {
        res.photos.photo.length !== 0 ?
          this.setState({
            photosDetails: res.photos.photo, 
            selectedPhotoIndex: this.handleRandomPhoto(res.photos.photo.length),
          }) :
          this.handleUpdateWarningMessage('Photos are unavailable for this username.');
      })
      .then(() => this.handleAddPhotoSizes())
      .catch((err) => console.error('Fetch photos error:', err));
  }

  handleHighResPhotos(photos) {
    const highResPhotos = photos.map(photo => {
      return photo.sizes.size[photo.sizes.size.length - 2].source;
    })

    this.handlePreloadPhotos(highResPhotos);
    this.setState({ highResPhotos });
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

  handleRandomPhoto(length) {
    const a =  Math.floor(Math.random() * length);
console.log('handleRandomPhoto', a)
    return a;
  }

  handleUserSearch(username) {
    if (username.trim() !== this.state.searchedUsername) {
      this.handleFetchUserDetails(username);
      this.setState({ searchedUsername: username, isSearchLoading: true });
    } else {
      if (this.state.selectedPhotoIndex !== 0) {
        // this.setState({ selectedPhotoIndex: 0 });
      }
    }
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
