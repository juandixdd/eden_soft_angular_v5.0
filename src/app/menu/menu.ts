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
    id: 'mmberships',
    title: 'Membresias',
    type: 'item',
    icon: 'users',
    url: 'main/memberships'
  },
  {
    id: 'clients',
    title: 'Clientes',
    type: 'item',
    icon: 'users',
    url: 'main/clients'
  },
]
