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
    id: 'Ventas',
    title: 'Ventas',
    translate: 'Ventas',
    type: 'collapsible',
    icon: 'shopping-cart',
    children: [
      {
        id: 'cotizacion',
        title: 'Cotización',
        type: 'item',
        icon: 'clipboard',
        url: 'main/cotizacion'
      },
      {
        id: 'cliente',
        title: 'Clientes',
        type: 'item',
        icon: 'users',
        url: 'main/cliente'
      },
      {
        id: 'pedidos',
        title: 'Pedidos',
        type: 'item',
        icon: 'shopping-cart',
        url: 'main/pedidos'
      },
      {
        id: 'ventas',
        title: 'Ventas',
        type: 'item',
        icon: 'shopping-cart',
        url: 'main/ventas'
      }
    ]
  },

  {
    id: 'Acceso',
    title: 'Usuarios',
    type: 'collapsible',
    icon: 'user',
    children: [
      {
        id: 'Acceso',
        title: 'Acceso',
        type: 'collapsible',
        icon: 'user',
        children: [
          {
            id: 'Acceso',
            title: 'Recuperar contraseña',
            type: 'item',
            icon: 'meh',
            url: 'main/recuperar-contraseña'
          },
          {
            id: 'Acceso',
            title: 'Restaurar contraseña',
            type: 'item',
            icon: 'meh',
            url: 'main/restaurar-clave'
          },
                   
        ]

      },
      {
        id: 'userlist',
        title: 'Lista de Usuarios',
        type: 'item',
        icon: 'meh',
        url: 'main/lista-usuarios'
      },
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
    ]
  },
  {
    id:'Produccion',
    title:'Produccion',
    translate:'Produccion',
    type:'collapsible',
    icon: 'coffee',
    children:[
      {
        id: 'categorias',
        title: 'Categorias',
        type: 'item',
        icon: 'list',
        url: 'main/categorias'
      },
      {
        id: 'orden-de-produccion',
        title: 'Orden de Produccion',
        type: 'item',
        icon: 'clipboard',
        url: 'main/orden-de-produccion'
      },
      {
        id: 'productos-admin',
        title: 'Productos',
        type: 'item',
        icon: 'coffee',
        url: 'main/productos-admin'
      },
    ]
  }


]

