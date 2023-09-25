import React, { Fragment, useEffect, useState } from "react";
import { withTracker } from "meteor/react-meteor-data";

// import { List, message, Avatar, Spin } from 'antd';
import Spin from "meteor-import-antd/Spin";
import message from "meteor-import-antd/Message";
import Avatar from "meteor-import-antd/Avatar";
import List from "meteor-import-antd/List";
import { COL_MEDIA } from '../../common/lib/'



// import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import RenderImage from "./RenderImage";
import RenderAudio from "./RenderAudio";
import { deleteFile } from "./methods";




const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

let data = [];
function ManageMedia({ totalFiles }) {
    totalFiles = totalFiles || 0;

    // const [data, setData] = useState([]);
    const [isWorking, setIsworking] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    // const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        data = fetchData();
    })


    const removeFile = ({ file }) => {

        const status = confirm(
            "Are you sure you want to delete this item"
        );

        const _id = file._id;
        status &&
            _id &&
            deleteFile({ _id })
                .then(resp => {
                    M.toast({ html: `${file.name} deleted` });
                })
                .catch(err => {
                    M.toast({ html: "Sorry error occured !" });
                });


    }

    const fetchData = callback => {
        return COL_MEDIA.find({}, { sort: { 'meta.createdAt': -1 }, skip: data.length, limit: 10 }).fetch()
    };

    const handleInfiniteOnLoad = () => {


        if (isWorking) return null;
        setIsworking(true);

        // message.success('Loading files...');


        if (data.length >= totalFiles) {
            message.warning('All files loaded');
            setHasMore(false);
            setIsworking(false)
            return;
        }
        const files = fetchData();

        data = data.concat(files);
        // alert(data.length)
        // data = ([]);
        setIsworking(false);



    };

    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <div className="container">
                    <h4>Total:{totalFiles}</h4>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={() => handleInfiniteOnLoad()}
                        hasMore={!isWorking && hasMore}
                        useWindow={true}
                    >
                        <List
                            dataSource={data}
                            renderItem={file => (
                                <List.Item key={file.id}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<a href="https://ant.design">{file.name}</a>}
                                        description={file.email}
                                    />
                                    {/* <div>


                                        {file.isImage && <RenderImage removeFile={({ file }) => removeFile({ file })} file={file} />
                                            ||
                                            <RenderAudio removeFile={({ file }) => removeFile({ file })} file={file} />}


                                    </div> */}
                                </List.Item>
                            )}
                        >
                            {isWorking && hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
            </main>
            <Footer />
        </>
    );

}


export default withTracker(() => {
    Meteor.subscribe("langs");
    Meteor.subscribe("users");
    return {
        totalFiles: COL_MEDIA.find({}, { sort: { 'meta.createdAt': -1 } }).count()
    };
})(ManageMedia);









