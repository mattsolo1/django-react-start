import React from 'react'
import ReactDOM from 'react-dom'
import InitialSettingsProvider from '../../shared/components/InitialSettingsProvider'
import World from './components/World'

class Hello extends React.Component {
  // REVIEW: could also use class properties here
  constructor(props) {
    super(props)

    this.defaultSettings = {
      text: 'Hello ',
      url: 'http://weknowmemes.com/wp-content/uploads/2013/12/most-photographed-places-in-the-world-map.jpg',
    }
  }

  render() {
    console.log('initial settings in hello', this.props.initialSettings)
    // REVIEW: initial settings will override default settings in this component
    const currentSettings = {
      ...this.defaultSettings,
      ...this.props.initialSettings,
    }
    console.log('currentSettings', currentSettings)
    return (<div>
      <br />
      {currentSettings.text}<br />
      <br />
      <World {...currentSettings} />
    </div>)
  }
}

Hello.propTypes = {
  initialSettings: React.PropTypes.object.isRequired,
}
// REVIEW: does this prop override what was copied in InitialSettingsProvider? No.
// REVIEW: could just delete this?
ReactDOM.render(
  <InitialSettingsProvider>
    <Hello initialSettings={{ test: 'from prop' }} />
    <Hello initialSettings={{ test: 'from prop' }} />
    <Hello initialSettings={{ test: 'from prop' }} />
  </InitialSettingsProvider>,
  document.getElementById('reactjs-root'),
)
