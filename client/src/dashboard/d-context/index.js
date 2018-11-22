import { createContext } from "react";


const initialState = {
    tools: []
}

export const TOOLS_STATE = createContext(initialState);
