import React, { Component } from 'react';
import ErrorAlert from './Error';
import MyAlert from './Alert';


export const printError = error => (
  <ErrorAlert err={error} />
);

export const printAlert = (type, message) => (
  <MyAlert type={type} message={message} />
);


// reccupération du ticket cas présent dans l'URL
export const getTicketCas = () => {
  let ticketCas;
  const ticketRegex = /(\?|&)ticket=([^&=]+)/;
  if (ticketRegex.test(window.location.href)) {
    const match = ticketRegex.exec(window.location.href);
    ticketCas = match[2];
  }
  return ticketCas;
};


// checkRight(['a','b','c'], ['a', 'z'])
// return boolean
export const checkRights = (list, rights) => {
  let validate = 0;
  let isIn;
  rights.forEach((element) => {
    isIn = list.filter(elt => elt === element);
    if (isIn.length > 0) validate++;
  });
  return validate === rights.length;
};
