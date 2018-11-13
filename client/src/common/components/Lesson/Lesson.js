import React from 'react'
import PropTypes from 'prop-types'

function Lesson({id, caption, imageUrl}){
    return(
        <div className="col s12 m8 l9 main teal lighten-1">
            <span className='white-text'>
            Page {id} in Lesson 1
            </span>
            <i className='material-icons medium right'>volume_up</i>
            <figure>
                <img src={imageUrl} className='responsive-img ' alt={`image for lesson ${id}`}/>
                <figcaption>
                    <span className='white-text'>
                        {caption}
                    </span>
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