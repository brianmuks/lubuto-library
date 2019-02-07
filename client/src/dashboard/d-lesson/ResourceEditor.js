import React, { useContext,useState,useReducer,useEffect } from "react";
import Draggable from "react-draggable";
import {TOOLS_STATE} from './../d-context';
import { addTool,editStaggedTools, addAudioFiles } from "./../d-redux/actions/lessonActions";
import { getSound, getResourceEditorStyles } from "./methods";

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

function ResourceEditor() {

  const [stateStyles,_dispatch] = useReducer(reducer,initialState);
  const {state,dispatch} = useContext(TOOLS_STATE);
  const {staggedTools,editTool} = state;
  const [audioFile, setAudioFile] = useState(null)
  const [text, setText] = useState(editTool.text);

  useEffect(()=>{
    setText(editTool.text)
  }, [editTool.text])

  const styles = getResourceEditorStyles();
       const done = ()=>{
        const toolIndex = editTool.index;
         let tools=  staggedTools.map(i => (
           i.index == toolIndex && { ...i, audioFile,text,style: {...i.style,...stateStyles} } || i
         ))
         Object.keys(editTool).length && dispatch(editStaggedTools(tools))
       }         

  console.log(editTool,'editTool');
  return (
    <div className="col m7 offset-m3 grey lighten-3 resource-editor">
    <h6>Design</h6>
      <RenderSoundPicker _dispatch={_dispatch} onSoundSet={audioFile => setAudioFile(audioFile)} />
      <div className="row">
        {styles.map((style,key)=>(
             <RenderStyleTool  _dispatch={_dispatch} label={style.label} name={style.name}  key={key} index={key} />
    ))}

        <RenderText text={text} onChange={setText}/>

  </div>
  <button onClick={done} className='btn col 12 right'>Done</button>
     <div  className={ 'col s6 center'} >
    <i  style={stateStyles} className={`fa material-icons ${stateStyles.size}`}>{editTool.name}</i>
    </div>
      <br />
    </div>
  );
}


function RenderStyleTool({ name, label, index, _dispatch}){
 const {onChange,styles} =  useOnEdit(name,_dispatch);
  return <div key={index} className='input-field col s2'>
    <input  id={name} onChange={onChange} type="text" className="validate" />
    <label className="active"  htmlFor={name}>{label}</label>
</div>
} 


function RenderText({ onChange,text }) {
  return <div  className='input-field col s12'>
    <input defaultValue={text} autoFocus id={'r-text'} onChange={e => onChange(e.target.value)}  type="text" className="validate" />
    <label className="active" htmlFor={'r-text'}>Text</label>
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

function RenderSoundPicker({ onSoundSet, _dispatch}){

  const [audioFiles, setAudioFiles] = useState([])

  function fetchAudio(src){
    console.log(src);
    getSound('1_Kiikaonde')
    .then(files=>{
      _dispatch(addAudioFiles(files));
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

export default ResourceEditor;
