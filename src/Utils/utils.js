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


//reccupération du ticket cas présent dans l'URL
export const getTicketCas = ()=>{
  let ticketCas;
  let ticketRegex = /(\?|&)ticket=([^&=]+)/;
  if(ticketRegex.test(window.location.href)){
    let match = ticketRegex.exec(window.location.href);
    ticketCas = match[2];
   }
   return ticketCas;
}

//suppression des cookies de connexion CAS
export const deleteCookies =(name)=>
{
console.log(document.cookie)
document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
