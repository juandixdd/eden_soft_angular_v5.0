import { CoreMenu } from '@core/types'


export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'home',
    translate: 'home',
    type: 'section',
    icon: 'home',
    children: [
      {
        id: 'home-page',
        title: 'Home',
        type: 'item',
        icon: 'home',
        url: 'main/home-page'
      },
      {
        id: '1',
        title: 'dashboard',
        type: 'item',
        icon: 'activity',
        url: 'main/dashboard'
      },

      {
        id: '2',
        title: 'Lista de Usuarios',
        type: 'item',
        icon: 'users',
        url: 'main/lista-usuarios'

      },
    ]
  },

  {
    id: 'Ventas',
    title: 'Ventas',
    translate: 'Ventas',
    type: 'section',
    icon: 'shopping-cart',
    children: [
      {
        id: '3',
        title: 'Clientes informativos',
        type: 'item',
        icon: 'users',
        url: 'main/cliente'
      },
      {
        id: '4',
        title: 'Ventas locales',
        type: 'item',
        icon: 'shopping-cart',
        url: 'main/ventas'
      }
    ]
  },



  {
    id: 'Configuracion',
    title: 'Configuracion',
    translate: 'Configuracion',
    type: 'section',
    icon: 'settings',
    children: [
      {
        id: '5',
        title: 'Roles',
        type: 'item',
        icon: 'users',
        url: 'main/roles'
      },
      {
        id: '6',
        title: 'Permisos',
        type: 'item',
        icon: 'grid',
        url: 'main/permisos'
      },
    ]
  },
  {
    id: 'Productos',
    title: 'Productos',
    translate: 'Productos',
    type: 'section',
    icon: 'coffee',
    children: [
      {
        id: '7',
        title: 'Categorias',
        type: 'item',
        icon: 'list',
        url: 'main/categorias'
      },
      {
        id: '8',
        title: 'Productos',
        type: 'item',
        icon: 'coffee',
        url: 'main/productos-admin'
      },
    ]
  },

  {
    id: 'Pedidos',
    title: 'Pedidos',
    translate: 'Pedidos',
    type: 'section',
    icon: 'shopping-bag',
    children: [
      {
        id: '9',
        title: 'Cotizacion',
        type: 'item',
        icon: 'clipboard',
        url: 'main/cotizacion'
      },
      {
        id: '10',
        title: 'Pedidos',
        type: 'item',
        icon: 'dollar-sign',
        url: 'main/pedidos'
      },
      {
        id: '11',
        title: 'Pedidos locales',
        type: 'item',
        icon: 'package',
        url: 'main/pedidos-local'
      }
    ]
  },


]

