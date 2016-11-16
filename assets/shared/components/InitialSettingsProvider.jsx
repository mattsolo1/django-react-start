import React from 'react'


class InitialSettingsProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initialized: false,
      error: null,
    }
  }

  componentWillMount() {
    // check if initialSettings already embedded in page
    if (window.initialJSON) {
      this.initialSettings = window.initialJSON
      this.setState({
        initialized: true,
      })
      return
    }

    // retrieve initialSettings from server since they weren't embedded in the page
    this.initialSettings = {}
    if (!window.initialUrl) {
      this.setState({ initialized: true })
      return
    }

    fetch(window.initialUrl, { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
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
        this.setState({ error: exception })
      })
  }

  render() {
    if (this.state.initialized) {
      return React.cloneElement(this.props.children, {
        initialSettings: this.initialSettings,
      })
    }

    if (!this.state.error) {
      return <div style={{ padding: '100px', width: '100%' }}><center>Loading ...</center></div>
    }

    return <div>ERROR: {this.state.error}</div>
  }
}


InitialSettingsProvider.propTypes = {
  children: React.PropTypes.element.isRequired,  //require 1 child component
}

export default InitialSettingsProvider
