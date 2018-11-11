// utilities for accounts
import { useState } from "react";


/**
 * @name useFormInput
 * @param {String} initialValue 
 * @description use state hooks to set the current value from the input field
 * @returns { string, function }  containing the value and the onChange function
 */
export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  };
}

/**
 * @todo this can be enhanced
 * @param {String} password 
 * @param {String} password2 
 * @description checks if the 2 given password are longer than 6chars and are equal
 * @returns {Boolea}
 */
export function validatePassword(password, password2){
    if (password.length > 6 ) {
        return false
    } else if (password.trim() !== password2.trim()) {
        return false
    } else {
        return true
    }
}
