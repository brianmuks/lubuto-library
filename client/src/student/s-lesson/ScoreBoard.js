import React, { useContext,useState,useReducer } from "react";
import Draggable from "react-draggable";
import {TOOLS_STATE} from '../s-context';
import { addTool,editStaggedTools } from "../s-redux/actions/lessonActions";
import { getSound } from "./methods";

const initialState = {
 
}

const EDIT_TOOL = 'EDIT_TOOL';

function reducer(state,action){

  switch (action.type) {
    case EDIT_TOOL:
      console.log(state)
    return Object.assign(
      {...state},
      {...action.newStyle}
    )
    default:
      return state
  }

}

function ScoreBoard() {


  const [stateStyles,_dispatch] = useReducer(reducer,initialState);

  const {state,dispatch} = useContext(TOOLS_STATE);
  const {staggedTools,editTool} = state;
  const [audioFile, setAudioFile] = useState(null)




  const styles = [{name:'color',label:'Color'},{label:'Background Color',name:'background-color'}
                  ,{name:'padding',label:'Padding'},{name:'fontSize',label:'Size'},{name:'border-radius',label:'Border'}
    , { name: 'width', label: 'Container Width' }, { name: 'height', label: 'Container Height' }, 
    { name: 'z-index', label: 'Z-index' }
                 ]

       const done = ()=>{
        const toolIndex = editTool.index;
         let tools=  staggedTools.map(i => (
           i.index == toolIndex && { ...i, audioFile, style: {...i.style,...stateStyles} } || i
         ))
         Object.keys(editTool).length && dispatch(editStaggedTools(tools))
       }         


  return (
    <div className="col m5 offset-m4 grey lighten-3 resource-editor">
    <h6>Score Board</h6>



      <div className="row">
    {styles.map((style,key)=>(
      <StyleTool _dispatch={_dispatch} label={style.label} name={style.name}  key={key} index={key} />
    ))}

  </div>
     <div  className={ 'col s6 center'} >
    <i  style={stateStyles} className={`fa material-icons ${stateStyles.size}`}>{editTool.name}</i>
    </div>
      <br />
    </div>
  );
}


function StyleTool({name,label,index,_dispatch}){
 const {onChange,styles} =  useOnEdit(name,_dispatch);
  return <div key={index} className="input-field col s2">
  <input defaultValue="" value={index+1} disabled id={name} onChange={onChange} type="text" className="validate" />
  {/* <label className="active" htmlFor={name}>{label}</label> */}
    { index%2 &&<i className='material-icons'>thumb_down_alt</i> ||
      <i className='material-icons'>thumb_up_alt</i> 
      }
</div>
} 

function useOnEdit(name,_dispatch){
      let newStyle = {};
      const formatStyle = (e)=>{
        newStyle[name] =e.target.value;
        return newStyle;
      }
      return{
        onChange:e=>_dispatch({type:EDIT_TOOL,newStyle:formatStyle(e)}),
              }
}

function RenderSoundPicker({onSoundSet}){

  const [audioFiles, setAudioFiles] = useState([])

  function fetchAudio(src){
    console.log(src);
    getSound('1_Kiikaonde')
    .then(files=>{
      setAudioFiles(files)
    })
    .catch(err=>{
      console.log('error getting audions',err);
    });

  }

  return (
    <div>


      <div className="input-field col s6">
        <select onChange={val => fetchAudio(val.target.value)}>
          <option value="" disabled selected>source</option>
          <option value="1">Lesson 1</option>
          <option value="2">Lesson 2</option>
          <option value="3">Lesson 3</option>
        </select>
        <label>Sound Source</label>
      </div>

      <div className="input-field col s6">

        <select onChange={val => onSoundSet(val.target.value)} className="browser-default" >
          <option value={null}  selected>Sound</option>

          <RenderAudioOptions audioFiles={audioFiles} />
        </select>
      </div>
    </div>
  )
}




function RenderAudioOptions({ audioFiles}){
 return audioFiles.map((item,index)=>(
    <option value={item} key={index}>{item.replace('.wav','')}</option>
  ))



}

export default ScoreBoard;
