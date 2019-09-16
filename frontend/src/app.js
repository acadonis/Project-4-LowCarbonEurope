import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


import DestinationIndex from './components/destinations/DestinationIndex'
import DestinationSearch from './components/destinations/DestinationSearch'
import DestinationNew from './components/destinations/DestinationNew'
import DestinationShow from './components/destinations/DestinationShow'
import Home from './components/pages/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'

import './style.scss'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Navbar />
        <ToastContainer   position="bottom-right" hideProgressBar={true} />
        <Switch>
          <Route exact path="/destinations/:id" component={DestinationShow} />
          <Route path="/destinations/new" component={DestinationNew} />
          <Route path="/destinations/:categories/:cost/:airport" component={DestinationIndex} />
          <Route path="/search" component={DestinationSearch} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
