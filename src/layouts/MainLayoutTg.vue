<template>
    <q-layout view="lHh Lpr lFf">
      <q-header reveal elevated>
        <q-toolbar>

          <q-toolbar-title>
            {{collector.nickname}}
          </q-toolbar-title>

          <!-- <q-btn flat round dense icon="search" /> -->

          <div class="cursor-pointer text-right" style="">

            <q-toggle
                    v-model="collector.participate"
                    checked-icon="check"
                    color="red"
                    label="Участвую"
                    unchecked-icon="clear"
                    left-label
                    @click='inActive'
                    :disable='switchEnable'
                  />
          </div>

      </q-toolbar>
  </q-header>

      <q-page-container>
        <q-page padding style="" class="full-height">

          <q-btn size='sm' class='q-ma-sm' round color="secondary" icon="info" @click='showPopup'/>
          <q-btn size='sm' class='q-ma-sm' round color="secondary" icon="refresh" @click='testOrders'/>


          <router-view :key="$route.fullPath"/>

          <!-- <div class="text-green">{{initData}}</div> -->

        </q-page>

      </q-page-container>
    </q-layout>
</template>

<script setup>
  import { postQueryTG } from 'boot/axios'

  import { useQuasar } from 'quasar';
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';

  import {isEmpty} from 'lodash';

  import { useTGStore } from 'stores/storeTG'
  import { storeToRefs } from 'pinia'

  const storeTG = useTGStore();
  const {collector} = storeToRefs(storeTG);
  const {setCollector, reverseActive} = storeTG;

  const router = useRouter();

  //const qtyOrder = computed(() => {return myStory.getQtyOrder});
  const $q = useQuasar()

  const switchEnable = ref(true)

  const alert = function(msg) {
      $q.dialog({
        title: 'Инфо...',
        message: msg
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }

  const drawerLeft = ref($q.screen.width > 5700)
  const drawerRight = ref($q.screen.width > 5500)

  //let collector = ref({id:1, nickname: 'Nemo', participate: false})

  let tgbot;

  let initData = ref({})

  const initDataNotEmpty = computed(() => {
    return !isEmpty(initData.value)
  })

  onMounted(() => {
    // console.log('myheader mounted');
    //console.log($appNameNickname);
    try {
      tgbot = window.Telegram.WebApp; //получаем объект webapp телеграма

  		tgbot.expand(); //расширяем на все окно
      //console.log(tgbot.initData)

      initData.value = tgbot && tgbot.initDataUnsafe || {};

    } catch (e) {
        //console.log(e)
    } finally {

    }

    initDataNotEmpty.value && authData()
    //queryResp1 = getCurrentInstance().appContext.config.globalProperties.$appNameNickname

  })

  const showPopup = () => {

    if (initDataNotEmpty.value) {

      tgbot.showPopup({
                      title: 'Popup title',
                      message: 'Popup message',
                      buttons: [
                          {id: 'delete', type: 'destructive', text: 'Delete all'},
                          {id: 'faq', type: 'default', text: 'Open FAQ'},
                          {type: 'cancel'},
                      ]
                  }, function(buttonId) {
                      if (buttonId === 'delete') {
                          // DemoApp.showAlert("'Delete all' selected");
                      } else if (buttonId === 'faq') {
                          tgbot.openLink('https://telegram.org/faq');
                      }
                  });
    } else {

      $q.notify({
        color: 'negative',
        position: 'top',
        message: `Мы не в Телеге, Увы!`,
        icon: 'report_problem'
      })

    }

  }
  const sendTime = () => {
    for (let i = 0; i < 3; i++) {
               tgbot.sendData(new Date().toString());
           }
  }
  const inActive = async () => {

    // if (!initDataNotEmpty.value) {
    //   $q.notify({
    //     color: 'negative',
    //     position: 'top',
    //     message: `Go в Телеграмм... @Artamon!`,
    //     icon: 'report_problem'
    //   })
    //
    //   return
    // }

    reverseActive();

    //console.log({...collector.value})
    // return

    const res = await postQueryTG({oper:'inActive', collector: {...collector.value} })

    //console.log(res.resp)

    if (res.resp) {
      setCollector(res.resp);
    } else {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: `Loading failed ${res.error}`,
        icon: 'report_problem'
      })
    }
  }

  const authData = async () => {

    const res = await postQueryTG({oper:'initData', id: initData.value.user.id, nickname: initData.value.user.first_name})

    //console.log(res.resp)

    if (res.resp) {
      setCollector(res.resp);
    } else {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: `Loading failed ${res.error}`,
        icon: 'report_problem'
      })
    }

  //  console.log(queryResp)

  }

  const testOrders = async () => {

    const res = await postQueryTG({oper:'initData', id: initData.value.user ? initData.value.user.id : 999})

    //console.log(res.resp)

    if (res.resp) {
      setCollector(res.resp);
      $q.notify({
        color: 'positive',
        position: 'top',
        message: `O e detka`,
        icon: 'report_problem'
      })
    } else {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: `Loading failed ${res.error}`,
        icon: 'report_problem'
      })
    }

  //  console.log(queryResp)

  }

</script>
