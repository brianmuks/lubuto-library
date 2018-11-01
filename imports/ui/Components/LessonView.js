import React, { Component, Fragment } from "react";

export default class LessonView extends Component {
    state = {
        tasks: [
            {name:"Box 1",category:"origin", bgcolor: "red"},
            {name:"Box 2", category:"origin", bgcolor:"teal"},
            {name:"Box 3", category:"complete", bgcolor:"skyblue"}
          ],
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    //cat ==> category
    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       console.log('dropping:',id);
       const { tasks } = this.state;
       let filteredTasks = tasks.filter(task => {
           if (task.name === id) {
               task.category = cat;
           }
           return task;
       });
       const el = ev.currentTarget;
       const boxLocation = el.getBoundingClientRect();
       const { left, top, right, bottom, x, y, width, height } = boxLocation
       
       this.setState({
           ...this.state,
           filteredTasks,
           left, 
           top, 
           right, 
           bottom,
           x, 
           y, 
           width, height
       });
  
    }

    render() {
        var tasks = {
            origin: [],
            complete: []
        }
        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.bgcolor}}
                >
                    {t.name}
                </div>
            );
        });
        
        return (
            <div className="container-drag">
                <h2 className="header">Draggable Lessons</h2>
                <div className="origin"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "origin")}}>
                    <span className="task-header">Origin</span>
                    {tasks.origin}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete}
                </div>


            </div>
        );
    }
}
