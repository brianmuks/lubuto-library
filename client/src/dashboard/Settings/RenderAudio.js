import React, { Fragment, useEffect } from "react";
import { generateFileUrl } from "../../utilities/Tasks";



export default function RenderAudio({ file, removeFile }) {
    const src = generateFileUrl({ file });

    const onMouseOver = () => {
        $(`#${file._id}-del-btn`).removeClass("hide");
    };
    const onMouseLeave = () => {
        $(`#${file._id}-del-btn`).addClass("hide");
    };

    return (
        <div
            className=" col m4"
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
        >
            <span
                onClick={() => removeFile({ file })}
                className="red-text right hide cursor"
                id={`${file._id}-del-btn`}
            >
                X
      </span>
            <audio controls>
                <source src={src} type={`audio/${file.ext}`} />
        Your browser does not support the audio element.
      </audio>
            <p className="grey-text ">{file.name}</p>
        </div>
    );
}