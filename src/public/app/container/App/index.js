import React, { Component } from 'react';
import { Loading, Main } from '../../components';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      highResPhotos: [],
      loading: true,
      photosDetails: [],
      userDetails: {},
      warningMessage: '',
    }
  }

  componentWillMount() {
    this.handleFetchUserDetails('anthonyemg');
  }

  handleUpdateWarningMessage(message) {
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
          this.setState({ photosDetails: res.photos.photo }) :
          this.handleUpdateWarningMessage('Photos are unavailable for this username.');
      })
      .then(() => this.handleAddPhotoSizes())
      .catch((err) => console.error('Fetch photos error:', err));
  }

  handleHighResPhotos(photos) {
    const highResPhotos = photos.map(photo => {
      return photo.sizes.size[photo.sizes.size.length - 3].source;
    })

    this.handlePreloadPhotos(highResPhotos);
    this.setState({ highResPhotos });
  }

  handleUpdateLoading(bool) {
    if (this.state.loading !== bool) {
      this.setState({ loading: bool })
    }
  }

  handlePreloadPhotos(highResPhotos) {    
    const preloadPhotos = highResPhotos.map((picture) => {
      const img = new Image();
      img.src = picture;
      
      return img;
    });
    
    this.preloadedImages = preloadPhotos;
  }

  handleUserSearch(username) {
    this.handleFetchUserDetails(username);
  }

  render() {
    const {
      highResPhotos,
      loading,
      userDetails,
      warningMessage,
    } = this.state;

    return (
      <div className="app">
        {loading && <Loading />}

        <Main 
          handleUpdateLoading={(bool) => this.handleUpdateLoading(bool)}
          handleUpdateWarningMessage={(message) => this.handleUpdateWarningMessage(message)}
          handleUserSearch={(username) => this.handleUserSearch(username)}
          highResPhotos={highResPhotos}
          loading={loading}
          userDetails={userDetails}
          warningMessage={warningMessage}
        />
      </div>
    )
  }
}

export default App;
