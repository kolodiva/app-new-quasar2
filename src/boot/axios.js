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

    api = axios.create({ baseURL: 'http://localhost:3000'})

  } else {

    api = axios.create({ baseURL: 'https://kolodiva.com'})
  }

export default boot(({ app, ssrContext, store }) => {

if (process.env.SERVER) {

  let cookies = Cookies.parseSSR(ssrContext);

  let connid = cookies.get('connectionid');

  if (!connid) {
    connid = uuidv4() + '-' +  uuidv4()
  }

  cookies.set('connectionid', useNomenklatorStore(store).setConnectionId(connid), {expires: 30, path: '/', secure: true, sameSite: 'None'});
}

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, axios }
