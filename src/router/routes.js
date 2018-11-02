export default [
  {
    path: '/',
    component: () => import('layouts/Default'),
    children: [{ path: '', component: () => import('pages/Index') }]
  },

  {
    // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
