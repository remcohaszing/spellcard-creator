const baseURL = 'https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=';
const API_KEY = 'AIzaSyDdya6SSKVMJoLim-E795PQzvSa4wOhnGw';


let promise;


export default function getWebFonts() {
  if (promise == null) {
    promise = new Promise(async (resolve) => {
      const response = await fetch(baseURL + API_KEY);
      const { items } = await response.json();
      resolve(items);
    });
  }
  return promise;
}
