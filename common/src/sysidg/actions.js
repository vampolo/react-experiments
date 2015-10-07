export const LOAD = 'LOAD';
export const LOAD_ERROR = 'LOAD_ERROR';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';

const post = (fetch, endpoint, body) =>
  fetch('/assets/sysdig.json', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status === 200) return response.json();
    throw response;
  });


export function loadSysdigEvents() {
  return ({fetch}) => ({
    types: [
      LOAD,
      LOAD_SUCCESS,
      LOAD_ERROR
    ],
    payload: {
      promise: post(fetch)
    }
  });
}
