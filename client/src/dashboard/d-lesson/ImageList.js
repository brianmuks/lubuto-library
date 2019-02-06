import React, { useEffect, useState } from "react";
import { initModal, initAutocomplete } from "../../utilities/Form";
import { getImages } from "./methods";
import { IMAGE_EXTERNAL_URL } from "../../utilities/constants";
export const MODAL_ID = 'image-list-tool-modal';    

function ImageList(){

  

    const [imageFiles, setimageFiles] = useState([]);
    const [imageFilesFiltered, setimageFilesFiltered] = useState([]);
    const x = 1;

    useEffect(() => {
        initModal('#' + MODAL_ID); 
        getImages('images')
            .then(res => {
                setimageFiles(res);
                setimageFilesFiltered(res);
            })
            .catch(err => {
                console.log('getImages():Error', err);
            })
    }, [x])

    const onFilter = (event)=>{
        let val = event.target.value;
        val = val.toLowerCase();
        console.log(val.trim().length);
        if (val.trim().length === 0) {
            setimageFilesFiltered(imageFiles);

            console.log('set to degault _imageFiles', );
            return
        }

        const filteredImageFiles = imageFiles.filter(path=>(
            path.toLowerCase().indexOf(val) !==-1
            ));
            //TODO: USE RXJS FOR DEBOUNCE > IMPROVES PERFORMANCE
        setimageFilesFiltered(filteredImageFiles);
    }




    return(
        <>
            <div id={MODAL_ID} className="modal bottom-sheet">
                <RenderAutoComplete onFilter={onFilter}/>
                <div className="modal-content">
                   <div className="row">
                        <RenderImages imageFiles={imageFilesFiltered} />
                   </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat col s12 red-text">Cancel</a>
                </div>
            </div>
            </>
    )
}


function RenderAutoComplete({ onFilter}){

    return(
        <div className="row">
            <div className="image-list-autocomplete">
                <h4 className='center'>Pick Image</h4>

            <div className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">search</i>
                        <input onChange={onFilter} type="text" id="image-list-autocomplete-input" className="autocomplete" />
                            <label for="autocomplete-input">SEARCH</label>
        </div>
                    </div>
                </div>
                </div>
            </div>
    )

}




function RenderImages({imageFiles}){
    

 


    return imageFiles.map((item,index)=>(
        <div key={index} className="col s2">
            <div className="card">
                <div className="card-image ">
                    <img className='image-list-img' src={`${IMAGE_EXTERNAL_URL}/${item }`} />
                </div>
                <div className="card-action">
                    <a className='teal-text' href="#">Select</a>
                </div>
            </div>
        </div>
    ))
}



export function openImageList(){
    $('#'+MODAL_ID).modal('open');
}

export default ImageList;