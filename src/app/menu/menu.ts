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
    ]
  },

  {
    id: 'Acceso',
    title: 'Acceso',
    translate: 'Acceso',
    type: 'collapsible',
    icon: 'user',
    children: [
      {
        id: 'login',
        title: 'Recuperar contraseña',
        type: 'item',
        icon: 'meh',
        url: 'main/login'
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

