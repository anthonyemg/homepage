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
        className="menu-container"
        data-display-menu={displayMenu}
        onClick={() => handleToggleMenu()}
      >
        <div className="menu"
        onClick={(e) => e.stopPropagation()}
        >
        </div>
      </div>
    )
  }
}

export default Menu;