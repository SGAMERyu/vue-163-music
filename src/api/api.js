import axios from 'axios';

axios.defaults.baseURL = `http://localhost:3000`

export const api = new Proxy({}, {
  get(target, prop){
    let method = /^[a-z]+/g.exec(prop)[0];
    let path = prop
              .substring(method.length)
              .replace(/([A-Z])/g, '/$1')
              .replace(/(\$)([a-z]+)/g, '?$2=')
              .toLowerCase();
    return function(data = "", options = {}, and=false){
      let url = `${path}${data}`;
      if(and){
        for(let [key, value] of Object.entries(options)){
          url += `&${key}=${value}`;        
        }
      } 
      return axios({ method, url })
    }
  } 
})