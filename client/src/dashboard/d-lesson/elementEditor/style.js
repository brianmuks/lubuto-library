import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { EDIT_TOOL } from "../../d-redux/constants";

function onToolEdit({ e, name }) {
  let newStyle = {};
  const formatedStyle = (e) => {
    newStyle[name] = e.target.value;
    return newStyle;
  };
  return formatedStyle(e);
}

const ElementStyleEditor = ({
  name,
  label,
  index,
  visibility,
  _dispatch,
  stateStyles,
  tool,
  style,
  onStyleChange,
}) => {

  const initVal = (stateStyles && stateStyles[name]) || "";
  const [val, setVal] = useState(null);
  //initVal.length && alert(initVal)

  useEffect(() => {
    // setVal("muks");
    visibility && tool.style && setVal(tool.style[name]);
    !visibility && setVal("muks");
  }, [visibility]);

  const _onChange = (e) => {
    const formatedStyle = onToolEdit({ name, e });
    setVal(e.target.value);
    const newStyle = formatedStyle;
    _dispatch({ type: EDIT_TOOL, newStyle });
    onStyleChange && onStyleChange({ newStyle });
  };

  return (
    <React.Fragment>
      <span
        style={{
          //   backgroundColor: "#4a4343",
          width: "500px",
          display: "block",
          //   height: "70px",
          marginTop: "30px",
          //   color: "white",
        }}
      >
        {name}
      </span>
      <Input
        style={{
          backgroundColor: "#4a4343",
          width: "200px",
          height: "70px",
          //   marginTop: "50px",
          color: "white",
        }}
        id={"tool_style_input"}
        //   key={Math.random() * index}
        //   defaultValue={tool.style && tool.style[name] ? tool.style[name] : ""}
        // addonBefore={label}
        onChange={_onChange}
        value={val}
        placeholder={label}
      />
    </React.Fragment>
  );
};

export default ElementStyleEditor;
