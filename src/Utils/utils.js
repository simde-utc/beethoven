import React, { Component } from 'react';
import {ErrorAlert} from './Error'



export  var printError = (error)=>{
    return(
      <ErrorAlert err={error}>
      </ErrorAlert>
    )
}
