import React, { Fragment, useEffect,useState } from "react";
import M from "materialize-css";
import { uploadImage } from "../../utilities/upload";
import { withTracker } from "meteor/react-meteor-data";
import { HOST_URL } from "../../utilities/constants";
import { deleteFile } from "./methods";

const Images = new FilesCollection({ collectionName: "Images" });

function Upload({ files }) {
  const [targetElem, setTargetElem] = useState(null);
  const [prevSrc, saveSrc] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [file, saveFile] = useState(null);
  const [targetId, setTargetId] = useState(null);

    useEffect(()=>{
        console.log(files,'files')
    },[files]);


  const done = ({ _id, currentFileId }) => {
    file &&
      uploadImage({
        image: file,
        collection: null,
        _id,
        currentFileId,
        transferComplete
      });
  };

  const previewFile = e => {
    const file = e.target.files[0];
    saveFile(file);
    if (file) {
      const src = URL.createObjectURL(file);
      setImageSrc(src);
      //   targetElem.src = src;
      $(".d-news-img").attr("src", src);
    }
  };

  const onUpload = (e, slider) => {
    console.log(slider);

    setTargetId(slider && slider.mediaId);
    setAdvertsId(slider && slider._id);
    if (targetElem) {
      targetElem.src = prevSrc;
    }
    setTargetElem(e.target);
    saveSrc(e.target.src);
  };

  const transferComplete = () => {
    setTargetElem(null);
    saveSrc(null);
    saveFile(null);
    setTargetId(null);
    M.toast({ html: "file uploaded!" });
  };

  return (
    <div className="row">
      <h3 className="center">Upload files</h3>
      <RenderFileUpload onChange={previewFile} upload={done} />
      <div className="card-image center">
        <img width={250} height={250} src={imageSrc} className="d-news-img" />
      </div>

      <div className='col m11 '>
          <h4 className='center'>Files</h4>
          <hr className='cyan' />
        <RenderFiles files={files} />
      </div>
    </div>
  );
}

function RenderFiles({files}){

    const removeFile = ({file})=>{

        const status = confirm(
          "Are you sure you want to delete this item"
        );

      const _id = file._id;
     status &&
       _id &&
       deleteFile({ _id })
         .then(resp => {
           console.log(resp);
           M.toast({ html: `${file.name} deleted` });
         })
         .catch(err => {
           console.log(err);
           M.toast({ html: "Sorry error occured !" });
         });

        //  Images.remove({_id:file._id});
        // console.log(file._id, "file", status);
}
    return files.map(
      file =>
        (file.isImage && (
          <RenderImage removeFile={removeFile} file={file} />
        )) || <RenderAudio removeFile={removeFile} file={file} />
    );
}

function RenderImage({ file, removeFile }) {
  const src = `${HOST_URL}/${file._downloadRoute}/${file._collectionName}/${
    file._id
  }/original/${file._id}${file.ext}`;

  const onMouseOver = () => {
    $(`#${file._id}-del-btn`).removeClass("hide");
  };
  const onMouseLeave = () => {
    $(`#${file._id}-del-btn`).addClass("hide");
  };

  return (
    <div
      className="col m4"
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
    >
      <span
        onClick={() => removeFile({ file })}
        className="red-text right hide cursor"
        id={`${file._id}-del-btn`}
      >
        X
      </span>
      <img width={50} height={50} src={src} />
      <p className="grey-text">{file.name}</p>
    </div>
  );
}

function RenderAudio({file}) {
        const src = `${HOST_URL}/${file._downloadRoute}/${
          file._collectionName
        }/${file._id}/original/${file._id}${file.ext}`; 

     const onMouseOver = ()=>{
        $(`#${file._id}-del-btn`).removeClass('hide')
     }   
     const onMouseLeave = () => {
       $(`#${file._id}-del-btn`).addClass("hide");
     };   

    return (
      <div
        className=" col m4"
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
      >
        <span
          className="red-text right hide cursor"
          id={`${file._id}-del-btn`}
        >
          X
        </span>
        <audio controls>
          <source src={src} type={`audio/${file.ext}`} />
          Your browser does not support the audio element.
        </audio>
        <p className="grey-text ">{file.name}</p>
      </div>
    );

}


function RenderFileUpload({ onChange, upload }) {
  return (
    <div className="container">
      <div className="file-field input-field ">
        <div className="">
          <span className="center col">Upload file</span>
          <input type="file" onChange={onChange} id="file-upload" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button onClick={upload} className=" waves-light btn blue-grey btn right">
        <i className="material-icons right">send</i>Submit
      </button>
    </div>
  );
}


export default withTracker(() => {
  Meteor.subscribe("langs");
  Meteor.subscribe("users");
  return {
    files: Images.find({}, { sort: { extension: 1 } }).fetch()
  };
})(Upload);


