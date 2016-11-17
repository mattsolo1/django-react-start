import React from 'react'

class InitialSettingsProvider extends React.Component {
  // REVIEW: you no longer have to set initial state in a constructor
  // REVIEW: you can use *class properties* instead, see below
  // REVIEW: class properties are part of babel-preset-stage-2
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     initialized: false,
  //     error: null,
  //   }
  // }

  // REVIEW: can also use class properties to set prop types directly in the component
  // REVIEW: normally this should go before the state
  static propTypes = {
    children: React.PropTypes.element.isRequired,  //require 1 child component
  }

  // REVIEW: setting initial state using class properties, which is cleaner
  state = { initialized: false, error: null }

  componentWillMount() {
    // check if initialSettings already embedded in page
    // REVIEW: if settings change, is there a way to invalidate old settings
    // REVIEW: and send new settings to the client?
    // REVIEW: for some reason my browser is already populated with window.initialJSON
    // REVIEW: and I cannot get rid of this even with a hard reload
    // REVIEW: maybe the localStorage api would be safer
    console.log('initial json', window.initialJSON)
    console.log('initial url', window.initialUrl)
    // REVIEW: have to set this to false to get to next code
    if (false) {
    // if (window.initialJSON) {
      console.log('settings retrieved from browser')
      this.initialSettings = window.initialJSON
      this.setState({
        initialized: true,
      })
      return
    }
    console.log('next step')
    // retrieve initialSettings from server since they weren't embedded in the page
    this.initialSettings = {
      // REVIEW: testing to see if props here get overridden if
      // REVIEW: specified in JSX prop or in child components
      test: 'from provider',
      // url: 'https://earth.nullschool.net/#current/wind/surface/level/overlay=cape/orthographic=278.37,28.60,346',
    }
    if (!window.initialUrl) {
      console.log('settings not in page')
      this.setState({ initialized: true })
      return
    }
    // REVIEW: you might not want to use native fetch because it's not supported in all browsers
    // REVIEW: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API#Browser_compatibility
    // REVIEW: consider the npm package, 'isomorphic-fetch'
    console.log(window.initialUrl)
    // REVIEW: where is this window.initialUrl set?
    // REVIEW: I think this code is inaccessible unless the previous block is commented out
    fetch(window.initialUrl, { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          console.log('fetched')
          return response.json()
        }
        throw new Error(`${window.initialUrl}  ${response.statusText} (${response.status})`)
      })
      .then((responseJSON) => {
        console.log('initialSettings = ', responseJSON)
        this.initialSettings = responseJSON
        this.setState({ initialized: true })
      })
      .catch((exception) => {
        console.log('fetching error')
        this.setState({ error: exception })
      })
  }

  // REVIEW fyi class properties also allow you to use arrow functions
  // REVIEW to automatically bind "this" to the react component which is handy
  myFunction = () => {
    console.log('state from my function', this.state)
  }
  // REVIEW: We need to  map over the children and clone them individually
  renderChildrenOld = () => {
    return React.cloneElement(this.props.children, {
      initialSettings: this.initialSettings,
    })
  }
  renderChildren = () => {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        initialSettings: this.initialSettings,
      })
    })
  }
  // REVIEW: cloneElement to propagate props makes it a bit hard to
  // REVIEW: see where the props are coming from inside the component
  // REVIEW: also has problems with prop types
  render() {
    // REVIEW:initialSettings not populated
    console.log('initial settings from provider', this.initialSettings)
    if (this.state.initialized) {
      return <div>{this.renderChildren()}</div>
    }

    if (!this.state.error) {
      return <div style={{ padding: '100px', width: '100%' }}><center>Loading ...</center></div>
    }

    return <div>ERROR: {this.state.error}</div>
  }
}

export default InitialSettingsProvider
