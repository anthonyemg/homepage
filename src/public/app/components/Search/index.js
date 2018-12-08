import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super()

    this.state = {
      inputValue: '',
    };
  }

  handleInputOnChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleInputOnKeyDown(e) {
    const { inputValue } = this.state;

    if (e.keyCode === 13) {
      window.location.href = `https://www.google.com/search?q=${inputValue}`;
    }
  }

  render() {
    const { inputValue } = this.state;

    return (
      <div className="search">
        <input
          onChange={(e) => this.handleInputOnChange(e)}
          onKeyDown={(e) => this.handleInputOnKeyDown(e)}
          value={inputValue}
          placeholder="Search..."
        />       
      </div>
    )
  }
}

export default Search;