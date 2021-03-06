import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home/index'
import NotFound from './pages/404'
import 'antd/dist/antd.css'

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </HashRouter>
  )
}
