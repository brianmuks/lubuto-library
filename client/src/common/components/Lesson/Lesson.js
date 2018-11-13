import React from 'react'
import PropTypes from 'prop-types'

function Lesson({id, caption, imageUrl}){
    return(
        <div className="col s12 m8 l9 main teal lighten-1">
            Page {id} Loaded
            <i className='material-icons right'>volume_up</i>
            <figure>
                <img src={imageUrl} className='responsive-img ' alt={`image for lesson ${id}`}/>
                <figcaption>
                    {caption}
                </figcaption>
            </figure>
        </div>
    )
}

Lesson.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}

export default Lesson