import React from 'react'
import Select from 'react-select'
import Rating from 'react-rating'
import axios from 'axios'
import Auth from '../../lib/Auth'


class DestinationNew extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {
        name: '',
        airport: '',
        country: '',
        image: '',
        cost: null,
        categories: [],
        description: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)

  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()

    const formData = {
      ...this.state.formData
    }

    axios.post('/api/destinations/', formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.props.history.push(`${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  handleRatingChange(rating) {
    const formData = {...this.state.formData, cost: rating}

    this.setState({ formData })
  }

  handleCategoryChange(selectedCategory) {

    const formData = { ...this.state.formData, categories: (selectedCategory || []).map(option => option.value) }

    this.setState({ formData })
  }

  componentDidMount() {
    axios.get('/api/categories/')
      .then(res => this.setState({
        categoryChoices: res.data.map(option => ({ label: option.name, value: option.id }))
      }))
  }

  render() {
    console.log(this.state)
    const { name, airport, country, image, cost, categories, description} = this.state.formData
    const isEnabled = name !== '' && airport !== '' && country !== '' && image !== '' && cost !== null && categories !== [] && description !== ''

    const { selectedCategory } = this.state

    return (
      <section className="section">
        <div className="container">
          <h2 className="title is-3">Make a Destination!</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="columns is-multiline">
              <div className="column is-half-desktop is-half-tablet">
                <div className="field">
                  <label className="label" htmlFor="name">Name</label>
                  <p className="help" id="name-hint"> Enter the name of the destination
                  </p>
                  <div className="control">
                    <input
                      id = "name"
                      aria-describedby="name-hint"
                      className="input"
                      name="name"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
                </div>
                <div className="field">
                  <label className="label" htmlFor="airport">Airport</label>
                  <p className="help" id="airport-hint"> Enter the IATA airport code, e.g. LAX for Los Angeles International
                  </p>
                  <div className="control">
                    <input
                      id="airport"
                      aria-describedby="airport-hints"
                      className="input"
                      name="airport"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.airport && <small className="help is-danger">{this.state.errors.airport}</small>}
                </div>
                <div className="field">
                  <label className="label" id="country">Country</label>
                  <div className="control">
                    <p className="help" id="country-hint"> Enter the country
                    </p>
                    <input
                      id="country"
                      ria-describedby="country-hint"
                      className="input"
                      name="country"
                      onChange={this.handleChange}
                    />
                    {this.state.errors.country && <small className="help is-danger">{this.state.errors.country}</small>}
                  </div>
                </div>
                <div className="field">
                  <label className="label" id="image">Image</label>
                  <div className="control">
                    <p className="help" id="image-hint"> Enter an image url
                    </p>
                    <input
                      id="image"
                      aria-describedby="image-hint"
                      className="input"
                      name="image"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
                </div>
                <div className="field">
                  <label className="label" id="cost">Cost</label>
                  <div className="control">
                    <p className="help" id="cost-hint"> Enter the cost from 1 (least expensive) to 5 (most expensive)
                    </p>
                    <Rating name='cost'
                      id='cost'
                      aria-describedby="cost-hint"
                      initialRating={this.state.formData.cost}
                      onChange={this.handleRatingChange}
                    />
                  </div>
                  {this.state.errors.cost && <small className="help is-danger">{this.state.errors.cost}</small>}
                </div>
                <div className="field">
                  <label className="label" id="category">Category</label>
                  <div className="control">
                    <p className="help" id="category-hint"> Enter the category (can select more than one)
                    </p>
                    <Select
                      id="category"
                      aria-describedby="category-hint"
                      value={selectedCategory}
                      options={this.state.categoryChoices}
                      isMulti
                      onChange={this.handleCategoryChange}
                    />
                  </div>
                  {this.state.errors.categories && <small className="help is-danger">{this.state.errors.categories}</small>}
                </div>
                <div className="field">
                  <label className="label" id="description">Description</label>
                  <div className="control">
                    <p className="help" id="description-hint"> Enter a full description
                    </p>
                    <textarea
                      id="description"
                      aria-describedby="description-hint"
                      className="textarea"
                      name="description"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.description && <small className="help is-danger">{this.state.errors.description}</small>}
                </div>
              </div>
            </div>
            <button className="button is-active" disabled={!isEnabled}>Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default DestinationNew
