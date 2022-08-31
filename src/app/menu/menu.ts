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
        id: 'cliente',
        title: 'Clientes-informativos',
        type: 'item',
        icon: 'users',
        url: 'main/cliente'
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
  }


]

