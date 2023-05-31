import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Cookies } from 'quasar'
import { useNomenklatorStore } from 'stores/storeNomenklator'
import { v4 as uuidv4 } from "uuid";
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

let api

if (process.env.NODE_ENV === 'development') {

    // api = axios.create({ baseURL: 'http://localhost:3000/api1'})
    api = axios.create({ baseURL: 'http://localhost:5173/api1'})

  } else {

    api = axios.create({ baseURL: 'https://kolodiva.com/api1'})
  }

export default boot(async ({ app, ssrContext, store, urlPath }) => {

  const cookies = process.env.SERVER
      ? Cookies.parseSSR(ssrContext)
      : Cookies // otherwise we're on client

  let connid = cookies.get('connectionid');


  if (/^\/(?!robots).*$/mi.test(urlPath)) {

    let connidnew;

    if (connid) {

        const connidnew = await useNomenklatorStore(store).setConnectionId(connid);

      } else {

        //если его не было то создаем его и он попадет в БД при первом добавлении товара, просто так не стоит тащить нового в базу мало ли ск их будет
        connidnew = uuidv4() + '-' +  uuidv4();
    }

    if (connidnew && connidnew !== connid) {
      cookies.set('connectionid', connidnew, {expires: 30, path: '/', secure: true, sameSite: 'None'});
    }
  }


  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

})

// const postQueryTG = async (params) => {
//
//   try {
//     const res = await api.post('tg1', params, {
//           headers: {
//           'content-type': 'application/json',
//           // 'Access-Control-Allow-Headers': 'Authorization',
//         }
//       })
//
//       return {resp: res.data, error: null};
//
//   } catch (e) {
//     return {resp: null, error: e};
//   }
// }


export { api, axios }
