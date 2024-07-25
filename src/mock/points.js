import { toCamelCase } from '../util.js'

export const points = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 11300,
    dateFrom: '2025-07-10T00:55:56.845Z',
    dateTo: '2025-07-11T11:01:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: 'taxi'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808d',
    basePrice: 11200,
    dateFrom: '2025-07-12T22:02:56.845Z',
    dateTo: '2025-07-13T11:03:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e05',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa34',
      'b4c3e4e6-9053-42ce-b747-e281314baa35',
      'b4c3e4e6-9053-42ce-b747-e281314baa36'
    ],
    type: 'bus'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808e',
    basePrice: 11100,
    dateFrom: '2025-07-14T22:55:56.845Z',
    dateTo: '2025-07-15T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e06',
    isFavorite: false,
    offers: [],
    type: 'ship'
  }];

export const defaultPoint = [
  {
    id: '000',
    basePrice: '000',
    dateFrom: '2001-01-01T00:00:00.845Z',
    dateTo: '2001-01-01T00:00:00.845Z',
    destination: '',
    isFavorite: false,
    offers: [],
    type: 'flight'
  }
]
