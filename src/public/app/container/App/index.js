import React, { Component } from 'react';
import { Loading, Main } from '../../components';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      photosDetails: [],
      highResPhotos: [],
    }
  }

  componentWillMount() {
    this.handleFetchPhotos();
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

  handleFetchPhotos() {
    fetch('/photos')
      .then(res => res.json())
      .then(res => this.setState({ photosDetails: res.photos.photo }))
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

  handleLoading(bool) {
    if (this.state.loading !== bool) {
      this.setState({ loading: bool })
    }
  }

  handlePreloadPhotos(highResPhotos) {    
    const preloadPhotos = highResPhotos.map((picture) => {
      const img = new Image();
      img.src = picture;
      
      return img
    });
    
    this.preloadedImages = preloadPhotos;
  }

  render() {
    const {
      loading,
      highResPhotos,
    } = this.state;

    return (
      <div className="app">
        {loading && <Loading />}

        <Main 
          handleLoading={(bool) => this.handleLoading(bool)}
          highResPhotos={highResPhotos}
          loading={loading}
        />
      </div>
    )
  }
}

export default App;
