import React, { Component } from 'react';
import {ErrorAlert} from './Error'





const printError = (error)=>{
    return(
      <ErrorAlert err={error}>
      </ErrorAlert>
    )
}

export const errors = {
  printError
}
