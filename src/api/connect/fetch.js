import { API_URL } from "../../config";

export const fetch_ = async(path, options={}) => {
  const headers = options.headers = options.headers || {};
  headers['Content-Type'] = "application/json";
  options.method = options.method ? options.method : "POST";
  options.credentials = 'include';
  if(options.method && options.method !== "GET") {
    options.body = (options.data) ? JSON.stringify(options.data) : {};
  }


  delete options.data;

  return fetch(`${API_URL}${path}`, options).then(
    async(response) => {
      if(!response.ok) {
        throw response.message;
      }
      const contentType = response.headers.get('Content-Type') || '';
      if(contentType.indexOf('application/json') === -1) {
        return null;
      }
      response = await response.json();
      return response;
    }
  ).catch((err) => { throw err; })
}
