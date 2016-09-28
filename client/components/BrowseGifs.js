import React from 'react';

const BrowseGifs = React.createClass({
  onPausePlay(gif, e) {
    if (e.target.src === gif.medium_fixed) {
      e.target.src = gif.medium;
      return;
    }
    e.target.src = gif.medium_fixed;
  },

  displayGifs(gifs) {
    return gifs.data.map((gif, i) => {
      return (
        <a key={i}>
          <img
            role='presentation'
            src={gif.medium_fixed}
            className='gif'
            onClick={this.onPausePlay.bind(this, gif)}
          />
        </a>
      )
    });
  },

  render() {
    const { gifs } = this.props;

    if (gifs.error) {
      return (
        <div className='ui error'>
          Please Check your internet connection
        </div>
      )
    }

    if (gifs.isSearching) {
      return (
        <div className='ui loading'>
          <div className='ui active inverted dimmer'>
            <div className='ui small text loader'>Fetching gifs</div>
          </div>
          <p></p>
        </div>
      )
    }

    return (
      <div className='ui feed'>
        <h5> Click to play or pause a gif </h5>
        <div className='event'>
          <div className='ui images'>
            { gifs.data ? this.displayGifs(gifs) : '' }
          </div>
        </div>
      </div>
    )
  }
});

export default BrowseGifs;
