import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home-page',
    title: 'Home',
    type: 'item',
    icon: 'home',
    url: 'main/home-page'
  },
  {
    id: 'dashboard',
    title: 'dashboard',
    type: 'item',
    icon: 'activity',
    url: 'main/dashboard'
  },

  {
    id: 'Usuarios',
    title: 'Lista de Usuarios',
    type: 'item',
    icon: 'users',
    url: 'main/lista-usuarios'

  },

  {
    id: 'Ventas',
    title: 'Ventas',
    translate: 'Ventas',
    type: 'collapsible',
    icon: 'shopping-cart',
    children: [
      {
        id: 'cliente',
        title: 'Clientes-informativos',
        type: 'item',
        icon: 'users',
        url: 'main/cliente'
      },
      {
        id: 'ventas',
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
    type: 'collapsible',
    icon: 'settings',
    children: [
      {
        id: 'roles',
        title: 'Roles',
        type: 'item',
        icon: 'users',
        url: 'main/roles'
      },
      {
        id: 'permisos',
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
    type: 'collapsible',
    icon: 'coffee',
    children: [
      {
        id: 'categorias',
        title: 'Categorias',
        type: 'item',
        icon: 'list',
        url: 'main/categorias'
      },
      {
        id: 'productos-admin',
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
    type: 'collapsible',
    icon: 'shopping-bag',
    children: [
      {
        id: 'Cotizacion',
        title: 'Cotizacion',
        type: 'item',
        icon: 'clipboard',
        url: 'main/cotizacion'
      },
      {
        id: 'Pedidos',
        title: 'Pedidos',
        type: 'item',
        icon: 'dollar-sign',
        url: 'main/pedidos'
      },
      {
        id: 'Pedidos-local',
        title: 'Pedidos locales',
        type: 'item',
        icon: 'package',
        url: 'main/pedidos-local'
      }
    ]
  },


]

