import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResSelector } from '../../components';

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.handleCheckIfTargetIsMain = this.handleCheckIfTargetIsMain.bind(this);
  }

  componentDidUpdate(prev) {
    if (!prev.displayMenu && this.props.displayMenu) {
      this.inputField.focus();
      document.querySelector('.main').addEventListener('click', this.handleCheckIfTargetIsMain, true);
    }

    if (prev.displayMenu && !this.props.displayMenu) {
      document.querySelector('.main').removeEventListener('click', this.handleCheckIfTargetIsMain, true);
    }
  }

  handleCheckIfTargetIsMain(e) {
    if (e.target.classList.contains('main')) {
      this.props.handleToggleMenu();
    }
  }

  handleOnChange(e) {
    this.setState({ username: e.target.value })
  }

  handleOnEnterClick(username) {
    if (username !== '') {
      this.props.handleUserSearch(username);
    };
  }

  handleOnEnterKeyDown(e) {
    e.stopPropagation();
    const { username } = this.state;
    const {
      handleUpdateWarningMessage,
      handleUserSearch,
      warningMessage,
    } = this.props;

    if (e.keyCode === 13 && username !== '') {
      handleUserSearch(username);
    }
    if (e.keyCode !== 13 && warningMessage !== '') {
      handleUpdateWarningMessage('');
    }
  }

  render() {
    const {
      displayMenu,
      handleRes,
      isSearchLoading,
      username,
      warningMessage,
    } = this.props;
    const classNamePrefix = 'side-menu';

    return (
      <div className={classNamePrefix}
        data-display-side-menu={displayMenu}
      >

      <span>Search flickr by username</span>

      <div
        className={`${classNamePrefix}--navigation-search`}
      >
        {isSearchLoading &&
        <i className={`${classNamePrefix}--spinner fa fa-spinner fa-spin`}></i>}
  
        <input
          onChange={e => this.handleOnChange(e)}
          onKeyDown={e => this.handleOnEnterKeyDown(e)}
          value={username}
          ref={el => { this.inputField = el } }
        />
        <div
          className={`${classNamePrefix}--search-button material-icons`}
          onClick={() =>  this.handleOnEnterClick(username)}
        >
          search
        </div>
      </div> 

      {warningMessage !== '' && <div className={`${classNamePrefix}--search-warning`}>{warningMessage}</div>}

      <ResSelector handleRes={(res) => handleRes(res)} />

      </div>
    )
  }
}

SideMenu.propTypes = {
  displayMenu: PropTypes.bool,
};

SideMenu.defaultProps = {
  displayMenu: false,
};

export default SideMenu;