import React from 'react';

const AddComment = React.createClass({
  onInputChange(gif) {
    this.props.onSearchTermChange(gif);
  },
  render() {
    return (
      <form
        className='ui form add-gif'
        onChange={ () => this.onInputChange(this.refs.gif.value) }
        onSubmit={
          event => {
            event.preventDefault();
            this.refs.gif.value = '';
          }
        }
        >
        <div className='inline-fields'>
          <div className='field'>
            <input
              ref='gif'
              type='text'
              placeholder='Type to search for gifs'
            />
          </div>
        </div>
      </form>
    )
  }
});

export default AddComment;
