import React from 'react'

const World = ({ url }) =>
  <iframe src={url} width="100%" height="100%" />

World.propTypes = {
  url: React.PropTypes.string.isRequired,
}

export default World
