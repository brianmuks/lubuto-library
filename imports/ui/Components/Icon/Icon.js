import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({name, size}) => (
    <i className={`material-icons ${size}`}>{name}</i>
)

Icon.propTypes = {
    size: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default Icon