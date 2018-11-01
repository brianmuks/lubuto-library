import React, {Component} from 'react';



export default class Slides extends Component {

  render() {
      return (
        <div className="row ">
        <ul className="collection with-header">
        <li className="collection-header"><h4>Lesson Type</h4></li>
        <li className="collection-item"><div>Pronounciation<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
        <li className="collection-item"><div>Spelling<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
        <li className="collection-item"><div>Vows<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
        <li className="collection-item"><div>Descriptive Learning<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
        <li className="collection-item"><div>Word Matching<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
      </ul>

      </div>
            )
            }



}
