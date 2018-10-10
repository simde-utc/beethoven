import React, { Component } from 'react';
import ErrorAlert from './Error'





export const printError = (error)=>{
    return(
      <ErrorAlert err={error}>
      </ErrorAlert>
    )
}
