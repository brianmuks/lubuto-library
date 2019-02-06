import React, { useEffect, useState } from "react";
import { initModal } from "../../utilities/Form";
import { getImages } from "./methods";
export const MODAL_ID = 'image-list-tool-modal';    

function ImageList(){

    useEffect(()=>{
        initModal('#'+MODAL_ID); 
        // openImageList()
    })

    return(
        <>
            <div id={MODAL_ID} className="modal bottom-sheet">
                <div className="modal-content">
                    <h4>Pick Image</h4>
                   <div className="row">
                        <RenderImages />
                   </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat col s12 red-text">Cancel</a>
                </div>
            </div>
            </>
    )
}




function RenderImages(){
    

    const [imageFiles, setimageFiles] = useState([])
    const x = 1;

    useEffect(()=>{
        getImages('images')
        .then(res=>{
            setimageFiles(res)
        })
        .catch(err=>{
            console.log('getImages():Error',err);
        })
    }, [x])


    return imageFiles.map((item,index)=>(

        <div key={index} className="col s2">
            <div className="card">
                <div className="card-image">
                    <img src="https://materializecss.com/images/sample-1.jpg" />
                    <span className="card-title">Card Title</span>
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