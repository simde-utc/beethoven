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
