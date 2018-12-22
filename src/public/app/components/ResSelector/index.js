import React, { Component } from 'react';

class ResSelector extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected: 'low',
    };
  }

  handleToggle(selection) {
    const { handleRes } = this.props;

    handleRes(selection);
    this.setState({ selected: selection });
  }

  render() {
    const { selected } = this.state;

    return (
      <div className="res-selector">
        <span
          data-selected={selected === 'low'}
          onClick={() => this.handleToggle('low')}  
        >
          low
        </span>
        <span
          data-selected={selected === 'high'}
          onClick={() => this.handleToggle('high')}  
        >
          high
        </span>
      </div>
    )
  }
}

export default ResSelector;