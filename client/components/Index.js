import React from 'react';
import _debounce from 'lodash/debounce';

import AddGif from './AddGif';
import BrowseGifs from './BrowseGifs';

export default class Index extends React.Component {
  gifSearch(term) {
    this.props.browseGifs(term);
  }
  render() {
    const gifSearch = _debounce(term => this.gifSearch(term), 300);

    return (
      <div className='ui container'>
        <AddGif onSearchTermChange={gifSearch} />
        <BrowseGifs {...this.props} />
      </div>
    )
  }
}
