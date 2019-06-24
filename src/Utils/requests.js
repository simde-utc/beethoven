import { API_URL, PICSOUS_URL, WEEZEVENT_APP_KEY } from './config';


//##########################################################
//Explications rapides
// method : POST GET DELETE PATCH ...
// request : nom de la route
// data : id (1400) ou object : ({var1:'blabla', var2:'blalba'})
//isObject : 1 si data est object 0 sinon
//isVariable : 1 si data sous forme de ?var1=blabla
//##########################################################

export const picsousRequest = (method, request, data, isObject, asVariable=0) =>{
  let url
  if(data!== null)
  {
    url = isObject===1
    ? `${PICSOUS_URL + request}/`
    : `${PICSOUS_URL + request}/${data}` //rajouter / à la fin si on les vire de apiCalls
  }
  else {
    url = `${PICSOUS_URL + request}/`
  }
  url = asVariable === 0
  ? url+'?random='+Math.random()
  : `${PICSOUS_URL + request}/${data}`+'&random='+Math.random()
  if(data!==null && isObject===1)
  {
    return fetch(
      url,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
      }
    )
  }
  else
  {
    return fetch(
      url,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

//##########################################################
//Explications rapides
// method : POST GET DELETE PATCH ...
// service : service de weez (POSS3, GESUSER....)
//request : nom de la route
// data : object : ({var1:'blabla', var2:'blalba'})
//sessionId : bah le sessionId 
//##########################################################

export const weezRequest = (method, service, request, data, sessionid=null) =>{
  let url = sessionid === null
  ? `${API_URL+service}/${request}?system_id=payutc&app_key=${WEEZEVENT_APP_KEY}`
  : `${API_URL+service}/${request}?system_id=payutc&app_key=${WEEZEVENT_APP_KEY}&sessionid=${sessionid}`
  return(
    fetch(
      url,
      {
        method,
        headers:{
          'Content-Type': 'application/json',
          'Nemopay-Version':'2018-07-03',
        },
        body: JSON.stringify(data)
      }
    )
  )
}
