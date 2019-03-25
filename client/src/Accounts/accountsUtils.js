// utilities for accounts
import { useState } from "react";
import { Meteor } from "meteor/meteor";

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
    if (password.length < 3 ) {//easy to remeber for children
        return false
    } else if (password.trim() !== password2.trim()) {
        return false
    } else {
        return true
    }
}

/**
 * @param {String} initialError
 * @returns {Object} error, setError
 */
export function useError(initialError){
    const [error, setError] = useState(initialError)
    return {
        error,
        setError
    }
}

/**
 * 
 */
export function useLogout(){
    const [isLoggedOut, setLogout] = useState(false)
    const logOutUser = () => Meteor.logout(err => err ? M.toast({html: err.reason}) : location.reload())
    return {
      isLoggedOut,
      logOutUser
    }
  }

/**
 * @description checks if the user is logged in or not
 * @returns the role of the user is they are logged in and null if not logged in
 */

 function checkUserRole(){
     const user =  Meteor.user()
     if(!user){
        return null
    }
    return user.profile.role
 }
 export { checkUserRole }