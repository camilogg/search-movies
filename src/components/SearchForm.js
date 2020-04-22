import React, { Component } from 'react'

const API_KEY = '257c9783'

const getData = async (movie) => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`
  )
  const data = await response.json()
  return data
}

class SearchForm extends Component {
  state = {
    inputMovie: '',
  }

  _handleChange = (e) => {
    this.setState({ inputMovie: e.target.value })
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    const { inputMovie } = this.state
    getData(inputMovie)
      .then((results) => {
        const { Search = [] } = results
        this.props.onResults(Search)
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <div className='field has-addons'>
          <div className='control'>
            <input
              className='input'
              type='text'
              placeholder='Movie to search...'
              onChange={this._handleChange}
            />
          </div>
          <div className='control'>
            <button className='button is-info'>Search</button>
          </div>
        </div>
      </form>
    )
  }
}

export default SearchForm
