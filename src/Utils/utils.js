import React, { Component } from 'react';
import ErrorAlert from './Error'
import MyAlert from './Alert'




export const printError = (error)=>{
    return(
      <ErrorAlert err={error}>
      </ErrorAlert>
    )
}

export const printAlert = (type, message)=>{
  return(
    <MyAlert type = {type} message={message}>
    </MyAlert>
  )
}


//checkRight(['a','b','c'], ['a', 'z'])
//return boolean
export const checkRights = (list, rights)=>{
  let validate = 0;
  let isIn;
  rights.forEach((element)=>{
    isIn  = list.filter(elt => elt===element)
    if (isIn.length>0) validate++;
  })
  return validate === rights.length
}
