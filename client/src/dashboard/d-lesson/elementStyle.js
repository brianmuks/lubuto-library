import React, { useContext, useState, useReducer, useEffect } from "react";
import { Card, Input } from "antd";

function ElementStyle({
  name,
  label,
  index,
  _dispatch,
  stateStyles,
  style,
  onStyleChange,
}) {
  const initVal = (stateStyles && stateStyles[name]) || "";
  const [val, setVal] = useState(initVal);
  //initVal.length && alert(initVal)

  useEffect(() => {
    console.log("ElementStyle");

    // initVal == val && setVal("");
    return () => {
      setVal("");
    };
  });

  const _onChange = (e) => {
    const formatedStyle = onToolEdit({ name, e });
    setVal(e.target.value);
    const newStyle = formatedStyle;
    _dispatch({ type: EDIT_TOOL, newStyle });
    onStyleChange && onStyleChange({ newStyle });
  };

  return (
    <Input
      style={{
        backgroundColor: "#4a4343",
        width: "200px",
        height: "70px",
        marginTop: "50px",
        color: "white",
      }}
      key={index}
      defaultValue={initVal}
      // addonBefore={label}
      onChange={_onChange}
      value={val}
      placeholder={label}
    />
  );
}

export default ElementStyle;

function onToolEdit({ e, name }) {
  let newStyle = {};
  const formatedStyle = (e) => {
    newStyle[name] = e.target.value;
    return newStyle;
  };
  return formatedStyle(e);
}
