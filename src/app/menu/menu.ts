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
    id: 'cotizacion',
    title: 'Cotización',
    type: 'item',
    icon: 'clipboard',
    url: 'main/cotizacion'
  },

  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'Acceso',
    type: 'collapsible',
    icon: 'home',
    children: [
      {
        id: 'login',
        title: 'Recuperar contraseña',
        type: 'item',
        icon: 'meh',
        url: 'main/login'
      },
    ]
  }


]

