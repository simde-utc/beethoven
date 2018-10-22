import {API_URL, PICSOUS_URL, WEEZEVENT_APP_KEY} from './config'

const brequest = (server, method, service = null , request, data = null, sessionid=null) =>{
  let url;
  switch(server)
  {
    case 'apiRequest':
      url = sessionid === null ?
      API_URL + service + '/' + request + '?system_id=payutc&app_key='+WEEZEVENT_APP_KEY :
      API_URL + service + '/' + request + '?system_id=payutc&app_key='+WEEZEVENT_APP_KEY + '&sessionid='+sessionid
      return fetch(
        url,
        {
          method : method,
          headers: {
            'Content-Type': 'application/json',
            'Nemopay-Version': '2018-07-03',
          },
          body : JSON.stringify(data),
          cache : 'no-store'
        }
      )

    case 'picsousRequest':
    url  = data!== null ?
    PICSOUS_URL +  request + '/' + data +'?random='+Math.random() :
    PICSOUS_URL +  request + '?random='+Math.random()

    return fetch(
      url,
      {
        method : method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        cache : 'no-store'
      }
    )

  }
}

export default brequest;
