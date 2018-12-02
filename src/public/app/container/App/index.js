import React, { Component } from 'react';
import { Loading, Main } from '../../components';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      photos: [],
    }
  }

  componentWillMount() {
    const promises = [fetch('/photos')]

    Promise.all(promises)
      .then(res => Promise.all(res.map(res => res.json())))
      .then(res => {
        this.setState({ 
          loading: false,
          photos: res[0].photos.photo,
        })
      })
      .catch((err) => console.error('Promise.all error', err));
  }

  render() {
    const {
      loading,
      photos,
    } = this.state;

    return loading ?
      <Loading /> :
      <Main
        photos={photos}
      />;
  }
}

export default App;
