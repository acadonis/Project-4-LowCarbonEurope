import React from 'react'
// import {Link } from 'react-router-dom'
import Rating from 'react-rating'
import Select from 'react-select'
// import Autosuggest from 'react-autosuggest'

import { categories } from '../../lib/Categories'


class DestinationSearch extends React.Component {
  constructor(){
    super()
    this.state = {
      formData: {
        cost: ''
      }
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }


  handleCategoryChange(selectedCategories) {
    const formData = { ...this.state.formData, categories: selectedCategories ? selectedCategories.map(option => option.value) : [] }
    this.setState({ formData })
  }

  handleRatingChange(rating) {
    const formData = { ...this.state.formData, cost: rating }
    this.setState({ formData })

  }

  handleChange(e){
    const formData = { ...this.state.formData, airport: e.target.value }
    this.setState({ formData })
  }

  handleSubmit(){
    this.props.history.push('/destinations/' + this.state.formData.categories + '/' + this.state.formData.cost + '/' + this.state.formData.airport)

  }

  render(){
    const selectedCategories = (this.state.formData.categories || [ ]).map(category => ({ label: category, value: category }))
    console.log(this.state)
    return (
      <div>
        <section className="section">
          <div className="container">
            <h1 className="title is-3">Please choose the following!</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="columns is-multiline">
                <div className="column is-one-third-desktop is-one-third-tablet">
                  <div className="field">
                    <label className="label">Category</label>
                    <Select
                      value= {selectedCategories}
                      options={categories}
                      isMulti
                      onChange={this.handleCategoryChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Cost</label>
                    <Rating name='cost'
                      initialRating={this.state.formData.cost}
                      onChange={this.handleRatingChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Starting Airport</label>
                    <input
                      type="text"
                      placeholder="Please use IATA code e.g. LHR for London Heathrow!" className="input"
                      onChange={this.handleChange}/>
                  </div>
                  <button className="button" type="submit">Fly!s</button>
                </div>
              </div>
            </form>

          </div>
        </section>
      </div>

    )
  }
}

export default DestinationSearch
