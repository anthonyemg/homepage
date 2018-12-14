import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    const { displayMenu, handleToggleMenu } = this.props;

    return (
      <div
        className="menu"
        data-display-menu={displayMenu}
      >
        <button
          onClick={() => handleToggleMenu()}
        >
          close
        </button>
      </div>
    )
  }
}

export default Menu;