import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'gyms',
    title: 'Gimnasios',
    type: 'item',
    icon: 'home',
    url: 'main/gyms'
  },
  {
    id: 'sedes',
    title: 'Sedes',
    type: 'item',
    icon: 'home',
    url: 'main/places'
  },
  {
    id: 'memberships',
    title: 'Membresias',
    type: 'item',
    icon: 'users',
    url: 'main/memberships'
  },
  {
    id: 'users',
    title: 'Usuarios',
    type: 'item',
    icon: 'users',
    url: 'main/users'
  },
  {
    id: 'clients',
    title: 'Clientes',
    type: 'item',
    icon: 'users',
    url: 'main/clients'
  },
]
