<template>
  <q-page class="q-py-md">
      <div class="row justify-center q-gutter-md">

          <q-card class="col-xs-5 col-sm-2 col-md-1 cursor-pointer"
          v-for="n in nomenkl"
          :key='n.id'
          style='min-width: 160px'
           v-ripple:orange-5.center
           @click="$router.push(`${n.guid}`)"
          >
            <q-skeleton height="180px" class="row justify-center" animation='none' square>
              <q-img fit='fill' :src="`${n.url_picture}`" style='max-width: 180px;' />
            </q-skeleton>

            <q-card-section style='overflow: auto'>
              <div class="text-subtitle2 text-center"  >{{ n.name }}</div>
            </q-card-section>
          </q-card>
        <!-- </q-responsive> -->
      </div>
    </q-page>
</template>

<script setup>
  defineProps({nomenkl: Array});
</script>
