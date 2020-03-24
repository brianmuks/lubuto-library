import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';
import { RESULT_CODES } from './ResultCodes';
import { FILE_SERVER_PATH } from '../Constants';
import { FILE_TYPES } from './constants';
fs = Npm.require('file-system');//file system(fs)

const _collections = {
    users:Meteor.users,
}

// removed the forward slash to not confuse it with the root files
const path = FILE_SERVER_PATH; //NOTE: meant to save away from the app folder
// const path = `${process.env.PWD}/citiride/assets/Images`

if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
}   

export const fileDb = new FilesCollection({
    collectionName: 'Images',
    storagePath: path,
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (
          file.size <= 10485760 &&
          /mp3|jpg|jpeg|png|wav/i.test(file.extension)
        ) {
          return true;
        } else {
          return "Please upload files, with size equal or less than 10MB";
        }
    }
});

const _multer = require('multer');
const _fs = require('fs');
const _multerInstanceConfig = { dest: '/tmp' }; // Temp dir for multer
const _multerInstance = _multer(_multerInstanceConfig);


Picker.middleware(_multerInstance.single('photo'));

Picker.route('/api/upload', (params, req, res, next) => {
    // console.log('upload',req.file);
   
    var mediaType = 'image';
    // console.log('Picker.middleware():FILE:',req.file);
    if (req.file !== undefined && (req.file.mimetype.substr(0, 6) == 'image/')) {
        //media type is ok

    } else {
        //mediaType not recongnised
        // return(RESULT_CODES[0]);
        console.log("Error=1", RESULT_CODES[0]);
        res.end(JSON.stringify(RESULT_CODES[0]));
       // return
    }

    if (req.body.authToken.length == 0) {
        // return(RESULT_CODES[2]);
        console.log(RESULT_CODES[2]);

        res.end(JSON.stringify(RESULT_CODES[2]));
        return
    }
    const userId = req.body.authToken;
    const coll = req.body.coll;
    const _id = req.body._id;
    let file = null;
    // const mediaMetaData = JSON.parse(req.body.meta);
    const currentFileId = req.body.currentFileId; //if new  = null
    //      			const hashedToken = Accounts._hashLoginToken(req.body.authToken);//FIXME:
    // const user = Meteor.users.findOne({ 'services.resume.loginTokens.hashedToken': hashedToken });//FIXME:
    const user = Meteor.users.findOne({ _id: userId }); //FIXME:
    //user

    if (!user) {
        // console.log('USER:',user,'hashedToken:',hashedToken,'req.body.authToken:',req.body.authToken);

        res.end(JSON.stringify(RESULT_CODES[3]));
       // return

    }
    // console.log('req.body.postData:',req.body.postData);
    // res.end('Done');

    // return;

    _fs.stat(req.file.path, (_statError, _statData) => {



        let fileType = req.file.mimetype.toString().split('/');
        fileType = fileType[0];

            lessonNumber = null;
            lang = null;
        if(fileType === FILE_TYPES.audio){
            const langData = req.file.originalname.split('_');
             lessonNumber = langData[0] && parseInt(langData[0]) || 0;
             lang = langData[1];
        }


        const _addFileMeta = {
            fileName: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size,
            meta: {
                userId: this.userId,
                lang,
                lessonNumber
            }
        };
        _fs.readFile(req.file.path, (_readError, _readData) => {
            if (_readError) {
                res.end(JSON.stringify(RESULT_CODES[1]));
                return
                console.log(_readError);
            } else {
                // TODO: REMOVE EXISTING FILE 
               console.log(currentFileId == 'null')
                fileDb.write(_readData, _addFileMeta, (_uploadError, _uploadData) => {
                    if (_uploadError) {
                        res.end(JSON.stringify(RESULT_CODES[1]));
                        console.log(_uploadError);

                        return


                        // return(RESULT_CODES[0])
                    } else {
                        console.log('upload data=', _uploadData);
                        const path = _uploadData.versions.original.path;
                        const mediaId = _uploadData._id;
                         file = fileDb.findOne({ _id: mediaId });
                        let mediaUri = file.link();
                        console.log(
                          mediaUri,
                          "mediaUri"
                        );
                        if (mediaUri != undefined && process.env.NODE_ENV == 'development') {
                            // // NOTE:  development only
                            // const serverIP = ip.address();
                            // // mediaUri = mediaUri.replace('localhost', '192.168.8.');
                            // console.log('mediaUri', mediaUri, mediaId,serverIP);
                        }
                        _fs.unlink(req.file.path,err=>console.log('Err removing old files',err)); // remove temp upload


                        if (_collections[coll]) {//validate collection
                            // fileDb.remove({ _id: currentFileId });


                            fileDb.remove({ _id: currentFileId }, (error) => {
                                if (error) {
                                    console.error(`File wasn't removed, error:  ${error.reason} ${currentFileId}`);
                                } else {
                                    console.info('File successfully removed', currentFileId);
                                }
                            });


                            //update request
                            const query = {};
                            const randId = new Meteor.Collection.ObjectID().valueOf();
                           
                            console.log('sdfasdfdsafadsfsadfsda', currentFileId, mediaId)
                            if (_id == 'null'){
                                query['_id'] = randId;
                            }else{
                                query['_id'] = _id;
                            }
                        
                            _collections[coll].update(query, { $set: { mediaId, 'mediaUri': mediaUri}},{upsert:true}, (err, id) => {
                                if (err) {
                                    res.end(JSON.stringify(RESULT_CODES[5]));
                                    return;
                                }
                                res.end(JSON.stringify(RESULT_CODES[4]));
                            });

                        }
                        // TODO: get SimpleSchema for this collection
                        // res.end(JSON.stringify({'202':'Success'}));
                        return
                    }
                });
            }
        });

    });

});

