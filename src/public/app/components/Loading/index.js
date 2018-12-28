import React, { Component } from 'react';

class Loading extends Component {
  render() {
    const classNamePrefix = 'loading';

    return (
      <div className={classNamePrefix}>
        <i className={`${classNamePrefix}__spinner fa fa-spinner fa-spin`}></i>
      </div>
    )
  }
}

export default Loading