import React, { Component, Fragment } from "react";

export default class LessonView extends Component {

    state = {
        content: ''
    }
     updateState = content => {
        this.setState({ content })
    }

    renderMainPage = () =>  {
        const pathId = FlowRouter.getParam('_id');
        switch (parseInt(pathId)) {
            case 1:
                this.updateState('This is Page 1, listen carefully and answer')
            break;
            case 2:
                this.updateState('This is Page 2, You have to finish the previous question')
            break;
            case 2:
                this.updateState('This is Page 3, Keep up the pace')
            break;
            case 3:
                this.updateState('This is Page 4, Page 4 is quite special, it has a different language')
            break;
            default:
                this.updateState(`I have no Idea what is on Page ${pathId}`)
                break;
        }
    }

  render() {
    const { content } = this.state;
    return (
      <Fragment>
        <div className="row">
          <div
            className="col s12 m4 l3 sidebar"
          >
             <div className="collection">
                <a href="/page/1" onClick={this.renderMainPage} className="collection-item">Page 1</a>
                <a href="/page/2" onClick={this.renderMainPage} className="collection-item active">Page 2</a>
                <a href="/page/3" onClick={this.renderMainPage} className="collection-item">Page 3</a>
                <a href="/page/4" onClick={this.renderMainPage} className="collection-item">Page 4</a>
            </div>
            
            <a href='/overview'>Create Lesson </a>
          </div>
          <div className="col s12 m8 l9 main teal lighten-1">
                { content }
          </div>
        </div>

      </Fragment>
    );
  }
}
