<template>
    <q-layout view="lHh Lpr lFf">
      <q-header reveal elevated>
        <q-toolbar>

          <q-toolbar-title>
            Сборка: {{collector.nickname}}
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
                  />
          </div>

      </q-toolbar>
  </q-header>

      <q-drawer
        side="left"
        v-model="drawerLeft"
        bordered
        :width="150"
        :breakpoint="500"
        behavior="mobile"
        overlay
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-for="n in 10" :key="n">Пункт меню {{ n }} / 10</div>
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding style="" class="full-height">

          <q-btn class='q-ma-sm' round color="secondary" icon="refresh" @click='showPopup'/>

          <router-view :key="$route.fullPath"/>

        </q-page>

      </q-page-container>
    </q-layout>
</template>

<script setup>
  import { postQueryTG } from 'boot/axios'

  import { useQuasar } from 'quasar';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';

  const router = useRouter();

  //const qtyOrder = computed(() => {return myStory.getQtyOrder});
  const $q = useQuasar()

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

  let participate = ref(false)

  let collector = ref({id:999, participate: false})

  let tgbot;

  onMounted(() => {
    // console.log('myheader mounted');
    //console.log($appNameNickname);
    try {
      tgbot = window.Telegram.WebApp; //получаем объект webapp телеграма

  		tgbot.expand(); //расширяем на все окно
      //console.log(tgbot)

    } catch (e) {
        //console.log(e)
    } finally {

    }

    initData()
    //queryResp1 = getCurrentInstance().appContext.config.globalProperties.$appNameNickname

  })

  const showPopup = () => {

    if (tgbot) {

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
    }

  }

  const inActive = async () => {
    //console.log(collector.value)
    const res = await postQueryTG({oper:'inActive', collector: collector.value })

    if (res.resp) {
      collector.value = res.resp;
    } else {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: `Loading failed ${res.error}`,
        icon: 'report_problem'
      })
    }
  }

  const initData = async () => {

    const res = await postQueryTG({oper:'initData', id: collector.value.id})

    //console.log(res.resp)

    if (res.resp) {
      collector.value = res.resp;
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
