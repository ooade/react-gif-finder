import React from 'react';

const Main = React.createClass({
  render() {
    return (
      <div className='main'>
        <div className='nav'>
          <h3 className='ui header'> Browse Gifs </h3>
        </div>
        {React.cloneElement({ ...this.props }.children, { ...this.props })}
      </div>
    )
  }
});

export default Main;
