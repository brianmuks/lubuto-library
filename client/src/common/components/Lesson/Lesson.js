import React from 'react'
import PropTypes from 'prop-types'

function Lesson({id, caption, imageUrl}){
    return(
        <div className="col s12 m8 l9 main teal lighten-1">
            <span className='white-text'>
            PageId {id || 0} in Lesson 1
            </span>
            <i className='material-icons medium right'>volume_up</i>
            {
                !id ? (
                <figure>
                    <img src={'/4.jpg'} className='responsive-img ' alt={`image for lesson `}/>
                    <figcaption>
                        <span className='white-text'>
                            {' This is the Default Page, Click a lesson '}
                        </span>
                    </figcaption>
                </figure>
                )
                :
            <figure>
                <img src={imageUrl} className='responsive-img ' alt={`image for lesson ${id}`}/>
                <figcaption>
                    <span className='white-text'>
                        {caption}
                    </span>
                </figcaption>
            </figure>

            }
        </div>
    )
}


Lesson.propTypes = {
    id: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}

export default Lesson