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
  const [copies, setCopies] = useState(1);//copies to make of the selected tool to be edited

  
  useEffect(()=>{
    setText(editTool.text)
  }, [editTool.text])

  const duplicateTool = e=>{
 
    if (!editTool.name) {
      M.toast({html:'Please select a tool duplicate'});
      return;
    }


    const arrCounter = Array(parseInt(copies)).fill(0);
    arrCounter.forEach(()=>{
      const toolIndex = editTool.index;
      const tool = { ...editTool, audioFile, text, style: { ...editTool.style, ...stateStyles }}
      dispatch(addTool(tool, Math.random() + toolIndex) );
    })

  }

  const styles = getResourceEditorStyles();

       const done = ()=>{

         if (!editTool.name) {
           M.toast({ html: 'Please select a tool edit' });
           return;
         }

        const toolIndex = editTool.index;
         let tools=  staggedTools.map(i => (
           i.index == toolIndex && { ...i, audioFile,text,style: {...i.style,...stateStyles} } || i
         ))
         Object.keys(editTool).length && dispatch(editStaggedTools(tools))
         
         $('.style-tool-clear').val('');

        }         

  console.log(editTool,'editTool');
  return (
    <div className="col m7 offset-m3 grey lighten-3 resource-editor">
    <h6>Design</h6>
      <RenderSoundPicker _dispatch={_dispatch} onSoundSet={audioFile => setAudioFile(audioFile)} />
      <RenderDuplicateButton setCopies={n=>setCopies(n)} onClick={duplicateTool} />
    

      <div className="row">
        {styles.map((style,key)=>(
          <RenderStyleTool stateStyles={editTool.style}  _dispatch={_dispatch} label={style.label} name={style.name}  key={key} index={key} />
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


function RenderDuplicateButton({ onClick,setCopies}){
  return(
    <div className="col m4">
      <input title="set the number of copies" onChange={e=>setCopies(e.target.value)} type="number" className="validate col right m6" />
      <i title='Make copies of this tool' onClick={onClick} className={` material-icons right col pointer`}>library_books</i>
    </div>
  )
}


function RenderStyleTool({ name, label, index, _dispatch, stateStyles}){
  
const initVal = stateStyles && stateStyles[name] || '';  
const [val,setVal] = useState(initVal)
// initVal.length && alert(initVal)


 const _onChange = e=>{
   const formatedStyle =onToolEdit({name,e});
   setVal(e.target.value);
   _dispatch({ type: EDIT_TOOL, newStyle: formatedStyle })
 }
  
// val && $(`#${name}`).val(val);
 return <div key={index} className='input-field col s2'>
    <input  id={name} value={val} onChange={_onChange} type="text" className=" style-tool-clear" />
    <label className="active"  htmlFor={name}>{label}</label>
   {M.updateTextFields()}
</div>
} 


function RenderText({ onChange,text }) {
  return <div  className='input-field col s12'>
    <input defaultValue={text} autoFocus id={'r-text'} onChange={e => onChange(e.target.value)}  type="text" className="validate" />
    <label className="active " htmlFor={'r-text'}>Text</label>
  </div>
} 


function onToolEdit({e,name}){
      let newStyle = {};
      const formatedStyle = (e)=>{
        newStyle[name] =e.target.value;
        return newStyle;
      }
      return formatedStyle(e)
}

function RenderSoundPicker({ onSoundSet, _dispatch}){

  const [audioFiles, setAudioFiles] = useState([])

  function fetchAudio(src){
    //TODO: use RJX here for debouncing.
    console.log(src);
    getSound({ src: 'audio/kao', filter: src})
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
      <div className="input-field col s2">
        <input  onChange={val => fetchAudio(val.target.value)} type="number" className="validate" />
        <label>Sound Source</label>
      </div>
      <div className="input-field col s6">
        <select defaultValue={''} onChange={val => onSoundSet(val.target.value)} className="browser-default" >
          <option value={''}  >Sound</option>
          <RenderAudioOptions audioFiles={audioFiles} />
        </select>
      </div>
    </div>
  )
}


function RenderAudioOptions({ audioFiles}){
  if(!audioFiles) return null;
 return audioFiles.map((item,index)=>(
    <option value={item} key={index}>{item.replace('.wav','')}</option>
  ))
}

export default ResourceEditor;
