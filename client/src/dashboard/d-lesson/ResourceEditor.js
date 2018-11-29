import React, { useContext,useState } from "react";
import Draggable from "react-draggable";
import {TOOLS_STATE} from './../d-context';

const initialState = {
  color:null,
  backGroundColor:null,
  size:null,
  padding:0,
  styles:{}
}

function ResourceEditor() {

  const {state} = useContext(TOOLS_STATE);
  const {staggedTools,editTool} = state;



  const styles = [{name:'color',label:'Color'},{label:'Background Color',name:'background-color'}
                  ,{name:'width',label:'Container Width'},{name:'height',label:'Container Height'}
                 ]

  return (
    <div className="col m7 offset-m3 grey lighten-3 resource-editor">
    <h6>Edit Tool</h6>
    
      <div className="row ">
    {styles.map((style,key)=>(
    <div key={key} className="input-field col s2">
      <input defaultValue=""  id="first_name2" onChange={()=>{}} type="text" className="validate" />
      <label className="active" htmlFor="first_name2">{style.name}</label>
    </div>
    ))}

  <buuton className='btn '>Ok</buuton>
  </div>
     <div className={ 'col s6 center'} >
    <i style={{color:'red',padding:'20px'}}  className="fa material-icons">{editTool.name}</i>
    </div>
      <br />
    </div>
  );
}


function useOnEdit(name,val){
  
      const [styles,onChange] = useState(initialState.styles);
      let newStyle = {};

      const formatStyles = (val,name)=>(
          newStyle[name] =val
      )  


      return{
      
      }

}



export default ResourceEditor;
