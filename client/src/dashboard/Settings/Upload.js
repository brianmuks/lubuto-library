import React, { Fragment, useEffect, useState } from "react";
import M from "materialize-css";
import { uploadImage } from "../../utilities/upload";
import { withTracker } from "meteor/react-meteor-data";
import { HOST_URL } from "../../utilities/constants";
import { deleteFile } from "./methods";
import { generateFileUrl } from "../../utilities/Tasks";
import Message from "meteor-import-antd/Message";
import Spin from "meteor-import-antd/Spin";
import { COL_MEDIA } from '../../common/lib/'
import RenderImage from "./RenderImage";
import RenderAudio from "./RenderAudio";



function Upload({ files }) {
  const [targetElem, setTargetElem] = useState(null);
  const [prevSrc, saveSrc] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [file, saveFile] = useState(null);
  const [targetFiles, saveTargetFiles] = useState(null);
  const [targetId, setTargetId] = useState(null);
  const [isWorking, setIsWorking] = useState(null);
  const [filesCount, setFilesCount] = useState(0);

  useEffect(() => {
    console.log(files, 'files')
  }, [files]);


  const done = ({ _id, currentFileId }) => {

    if (!targetFiles) return;

    setIsWorking(true);

    for (let index = 0; index < targetFiles.length; index++) {
      const _file = targetFiles[index];

      uploadImage({
        image: _file,
        collection: null,
        _id,
        currentFileId,
        transferComplete,
        transferFailed,
        updateProgress
      });

    }


  };



  const updateProgress = (loaded, computed) => {
    console.log('updateProgress():data', loaded, computed);
    //    Message.success("Sorry, Search key word short");
  }


  const transferFailed = () => {
    setIsWorking(false);
    Message.warning("Sorry, Failed to upload file");
  }

  const previewFile = e => {
    const file = e.target.files[0];
    const files = e.target.files;
    const fileCount = files.length;
    saveFile(file);
    saveTargetFiles(files);
    if (file) {
      const src = URL.createObjectURL(file);
      setImageSrc(src);
      setFilesCount(fileCount)
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
    setIsWorking(false);
    Message.success("File successfully uploaded!");

  };

  return (
    <div className="row">
      <h5 className="center">Upload files ({filesCount})</h5>

      <RenderFileUpload isWorking={isWorking} onChange={previewFile} upload={done} />
      <div className="cardSorry, Search key word short-image center">
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

function RenderFiles({ files }) {

  const removeFile = ({ file }) => {

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


  }
  return files.map(
    file =>
      (file.isImage && (
        <RenderImage removeFile={({ file }) => removeFile({ file })} file={file} />
      )) || <RenderAudio removeFile={({ file }) => removeFile({ file })} file={file} />
  );
}






function RenderFileUpload({ onChange, upload, isWorking }) {
  return (
    <div className="container">
      <div className="file-field input-field ">
        <div className="col m-6 push-right">
          {isWorking && <Spin size="large" color="green" wrapperClassName="green" />}

        </div>
        <div className="">
          <span className="center col">Upload file</span>
          <input type="file" multiple={true} onChange={onChange} id="file-upload" />
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
    files: COL_MEDIA.find({}, { sort: { 'meta.createdAt': -1 }, limit: 5 }).fetch()
  };
})(Upload);


