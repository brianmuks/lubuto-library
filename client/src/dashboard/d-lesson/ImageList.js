import React, { useEffect, useState, useContext } from "react";
import { initModal, initAutocomplete } from "../../utilities/Form";
import { getImages } from "./methods";
import { TOOLS_STATE } from "./../d-context";
import { IMAGE_EXTERNAL_URL } from "../../utilities/constants";
import { addImageFiles } from "../d-redux/actions/lessonActions";
import { withTracker } from "meteor/react-meteor-data";

import { generateFileUrl } from "../../utilities/Tasks";
export const MODAL_ID = "image-list-tool-modal";

function ImageList({ onImageSelect }) {
  const { state, dispatch } = useContext(TOOLS_STATE);
  //TODO: use imageFiles from context
  const [imageFiles, setimageFiles] = useState([]);

  const [imageFilesFiltered, setimageFilesFiltered] = useState([]);
  const x = 1;

  useEffect(() => {
    initModal("#" + MODAL_ID);

    getImages()
    .then(files=>{
    setimageFiles(files);
    setimageFilesFiltered(files);
    dispatch(addImageFiles(files));

    })
    .catch(err=>{
      M.toast({html:'failed to fetch imgaes'})
    })


  }, [0]);

  const onFilter = event => {
    let val = event.target.value;
    val = val.toLowerCase();
    if (val.trim().length === 0) {
      setimageFilesFiltered(imageFiles);

      return;
    }

    const filteredImageFiles = imageFiles.filter(
      path => path.toLowerCase().indexOf(val) !== -1
    );
    //TODO: USE RXJS FOR DEBOUNCE > IMPROVES PERFORMANCE
    // If you need you can use a debounce I created here

    // https://gist.github.com/OlivierJM/1c73d8ef0d62d6e983e68838881e5302
    // const debounce = (func, delay) => {
    //     let inDebounce
    //     return function(...args){ // curry the the other arguments
    //       // const args = argumets
    //       const context = this
    //       clearTimeout(inDebounce)
    //       inDebounce = setTimeout(() => func.apply(context, args), delay)
    //     }
    // }
    setimageFilesFiltered(filteredImageFiles);
  };

  return (
    <>
      <div id={MODAL_ID} className="modal bottom-sheet">
        <RenderAutoComplete onFilter={onFilter} />
        <div className="modal-content">
          <div className="row">
            <RenderImages
              onImageSelect={onImageSelect}
              imageFiles={imageFilesFiltered}
            />
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat col s12 red-text"
          >
            Cancel
          </a>
        </div>
      </div>
    </>
  );
}

function RenderAutoComplete({ onFilter }) {
  return (
    <div className="row image-fileter">
      <div className="image-list-autocomplete">
        <h4 className="center">Pick Image</h4>

        <div className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">search</i>
              <input
                onChange={onFilter}
                type="text"
                id="image-list-autocomplete-input"
                className="autocomplete"
              />
              <label htmlFor="autocomplete-input">SEARCH</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderImages({ imageFiles, onImageSelect }) {
  // avoid crashing the app if there is no imageFiles
  if (!imageFiles) return null;
  return imageFiles.map((file, index) => (
    <div
      onClick={() => onImageSelect(file, index)}
      key={index}
      className="col s2"
    >
      <div className="card">
        <div className="card-image ">
          <img className="image-list-img" src={generateFileUrl({ file })} />
        </div>
        <div className="card-action">
          <a className="teal-text" href="#">
            Select
          </a>
        </div>
      </div>
    </div>
  ));
}

export function openImageList() {
  $("#" + MODAL_ID).modal("open");
}


export default withTracker(() => {
  Meteor.subscribe("images");
  return {
    // images: Images.find({ isImage :true}, { sort: { extension: 1 } }).fetch()
  };
})(ImageList);



