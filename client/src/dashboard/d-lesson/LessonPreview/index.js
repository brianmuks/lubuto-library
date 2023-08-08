//NOTE holds all create lesson components

import React, { useReducer,useEffect } from "react";
import Tools from "./../Tools";
import MainEditor from "./../MainEditor";
import StagedTools from "./../StagedTools";
import ResourceEditor from "./../ResourceEditor";
import { TOOLS_STATE } from "./../../d-context";
import { lessonReducer } from "./../../d-redux/reducers/lessonReducer";
import { withTracker } from "meteor/react-meteor-data";
import { COL_Lessons } from "../../../../../lib/Collections";
import { editStaggedTools } from "../../d-redux/actions/lessonActions";

const initialState = {
    data: {
        x: 0,
        y: 0,
        node: {},
        icons: [],
        _id: '',
        name: ''
    },
    tools: [],
    addedTools: [],
    staggedTools: [],
    editTool: {}
}

// todo: Push the icon name to the icon array, as items that have been moved

function LessonPreview(props) {
    const [state, dispatch] = useReducer(lessonReducer, initialState);

    useEffect(() => {

        if (!props.lesson) {
            return
        }
        let x = (props.lesson);
        var result = Object.keys(x).map(function (key) {
            return x[key];
        });
        // setTools(result)
        console.log(result);
        dispatch(editStaggedTools(result));
    }, [props.lesson]);

    return (
        <TOOLS_STATE.Provider value={{ state, dispatch }}>
            <section style={{position:'fixed'}}>
                <Tools isPreview/>
                <div className="row">
                    <MainEditor isPreview/>
                    <StagedTools isPreview />
                    <ResourceEditor isPreview/>
                </div>
            </section>
        </TOOLS_STATE.Provider>
    );
}



// export default CreateLesson;



export default withTracker(() => {
    Meteor.subscribe("lessons");
    Meteor.subscribe("users");
    return {
        lesson: COL_Lessons.findOne({}, { sort: { createdAt:-1}})
    };
})(LessonPreview);