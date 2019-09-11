import React from 'react'
import axios from 'axios'
import Card from '../common/Card'
import _ from 'lodash'


class DestinationIndex extends React.Component {

  constructor() {
    super()
    this.state = {

    }

    this.filterDestinations = this.filterDestinations.bind(this)
  }

  componentDidMount() {
    axios.get('/api/destinations')
      .then(res => {
        this.setState({
          destinations: res.data,
          searchCategories: this.props.match.params.categories, searchCost: this.props.match.params.cost,
          searchAirport: this.props.match.params.airport,
          categoryArray: this.props.match.params.categories.split(',').map(Number)

        })
      })
  }

  filterDestinations(){

    const categoryRe = new RegExp(this.state.searchCategories, 'i')
    const costRe = new RegExp(this.state.searchCost, 'i')

    const filterDestinationsCategory = _.filter(this.state.destinations, destination => {
      return categoryRe.test(destination.categories.map(category => category.id))
    })

    const filterDestinationsCost = _.filter(filterDestinationsCategory, destination => {
      return costRe.test(destination.cost)

    })
    return filterDestinationsCost
  }



  render() {


    if(!this.state.destinations) return <h2>Loading...</h2>
    console.log(this.state)

    return (
      <div className="container">
        {this.state.destinations && this.filterDestinations().map((destination, i) =>
          <div key={i}>
            <Card
              {...destination}
            />
          </div>
        )}
      </div>

    )
  }
}

// <section className="section">
//   {this.state.result && <h1>{this.state.result.data[2].address}</h1>}
// </section>


export default DestinationIndex
