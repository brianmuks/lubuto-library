import React, { useContext, useState, useEffect } from "react";
import { initModal } from "../utilities/Form";

export const VIEW_PROFILE_MODAL_ID = 'VIEW_PROFILE_MODAL_ID';

function ViewProfile({  }) {
    initModal('#' + VIEW_PROFILE_MODAL_ID);
    return (
        <div id={VIEW_PROFILE_MODAL_ID} className="modal ">
            <div className="modal-content">

                <Profile/>
            </div>
            <div className="modal-footer">
                {/* <a href="#!" onClick={e=>{}} className=" waves-effect waves-green btn-flat red-text left">update</a> */}
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
        </div>
    );
}

function Profile() {

    const [p, setProfile] = useState({});


    useEffect(()=>{

        if (Meteor.user()) {
            let profile = Meteor.user().profile;
            profile['username'] = Meteor.user().username; 
            setProfile(profile); 
        }

    })

    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Gender</th>
                <th>Password</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>{p.name}</td>
                <td>{p.username}</td>
                <td>{p.gender}</td>
                <td>{p.pwd}</td>
            </tr>
        </tbody>
    </table>


}

export default ViewProfile;
