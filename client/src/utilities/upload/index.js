



export const uploadImage = ({ image, collection, currentFileId, _id, updateProgress, transferComplete, transferFailed, transferCanceled }) => {

    var media = null;
   // var mediaUri = image.mediaUri;
    var xhr = new XMLHttpRequest();

    media = {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
    };
  
    var body = new FormData();
    body.append('authToken', Meteor.userId());
    body.append('photo', image);
    body.append('currentFileId', currentFileId);
    body.append('coll', collection);
    body.append('_id', _id);
    // body.append('meta', JSON.stringify(meta));

    // xhr.open('POST', `${SERVER_DOMAIN}/api/upload`);



    // xhr.open('POST', `https://{online-address}/api/upload`);
    xhr.open('POST', `http://localhost:3000/api/upload`);
    // console.warn(http://${url}/api/upload);


    xhr.addEventListener("progress", updateProgress);
    xhr.addEventListener("load", transferComplete);
    xhr.addEventListener("error", transferFailed);
    xhr.addEventListener("abort", transferCanceled);

    xhr.onprogress = event => console.log('progress', event.loaded, event.lengthComputable)
    var x = xhr.send(body);
}