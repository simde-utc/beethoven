import { API_URL, PICSOUS_URL, WEEZEVENT_APP_KEY } from './config';

const brequest = (server, method, service = null, request, data = null, sessionid = null) => {
  let url;
  switch (server) {
    case 'apiRequest':
      url = sessionid === null
        ? `${API_URL + service}/${request}?system_id=payutc&app_key=${WEEZEVENT_APP_KEY}`
        : `${API_URL + service}/${request}?system_id=payutc&app_key=${WEEZEVENT_APP_KEY}&sessionid=${sessionid}`;
      return fetch(
        url,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Nemopay-Version': '2018-07-03',
          },
          body: JSON.stringify(data),
        },
      );

    case 'picsousRequest':
      url = data !== null




        ? `${PICSOUS_URL + request}/${data}`
        : `${PICSOUS_URL + request}`;


      return fetch(
        url,
        {
          method: method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          
        },
      );

      default:
        break;
  }
};

export default brequest;
