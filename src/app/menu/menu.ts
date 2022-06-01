import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'clients',
    title: 'Clientes',
    type: 'item',
    icon: 'users',
    url: 'main/clients'
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
          {
            id: 'Acceso',
            title: 'Login',
            type: 'item',
            icon: 'meh',
            url: 'main/login'
          },
          {
            id: 'Acceso',
            title: 'Registro Usuarios',
            type: 'item',
            icon:'users',
            url: 'main/registro-usuarios'
          }
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
  }


]

