import { HOST_URL } from "./constants";




export const getUrlParam = param=>{
    const urlParams = getUrlParams();
    return urlParams.get(param);
}

export const getUrlParams = ()=>(
    new URLSearchParams(window.location.search)
    )


    export const generateFileUrl = ({file})=>(
                `${HOST_URL}/${file._downloadRoute}/${
          file._collectionName
        }/${file._id}/original/${file._id}${file.ext}`
    )


       export const getFileUrl = ({fileName})=>{
         let dotIndex = fileName.indexOf(".");
        const file = fileName.toString().substr(0, dotIndex);
        return `${HOST_URL}/cdn/storage/Images/${file}/original/${fileName}`;
       }