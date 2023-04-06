
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GoodsTopPage.vue') },
      // { path: 'catalog', component: () => import('pages/GoodsPage.vue') },
      { path: '/catalog/:id', component: () => import('pages/GoodsPage.vue') },
      { path: 'basket', component: () => import('pages/BasketPage.vue') },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ErrorNotFound.vue') }
    ]
  }
]

export default routes
