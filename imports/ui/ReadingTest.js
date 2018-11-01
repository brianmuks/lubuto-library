import React, { Component } from "react"
import Draggable from 'react-draggable'
import Icons from './Components/Icons'
import Icon from './Components/Icon'

export default class Slides extends Component {

  // keeping the icons in the state in case we need to reset the view after saving
  state = {
    icons: Icons
  }
  handleStart = (e, pos) => {
    // it could be good if we can clone the element
  }
  handleDrag = (e, pos) => {
    console.log(pos)
  }
  
  // we can save the location of the item after being dropped
  handleStop = (e, pos) => {
    const { x, y, deltaX, deltaY } = pos
    console.log(x, y, deltaX, deltaY)
  }
 
  
  
  render() {
     // keeping all events in one place
    const dragHandlers = {onStart: this.handleStart, onStop: this.handleStop}
    const { icons } = this.state
    return (
      <div className="row">
       {
         icons.map((icon, i) => (
           <Draggable key={i} {...dragHandlers}>
            <div>
              <Icon name={icon.name} size={icon.size} />
              </div>
           </Draggable>
         ))
       }
       <Draggable {...dragHandlers} >
          <div className='col m2'>
           <input type='text' placeholder={'text'} />
          </div>
          
       </Draggable>
      </div>
    )
  }
}

