const users = [
  {
    id: '1',
    firstName: 'Maurice',
    lastName: 'Moss',
    email: 'maurice@moss.com',
    password: 'abcdefg'
  },
  {
    id: '2',
    firstName: 'Roy',
    lastName: 'Trenneman',
    email: 'roy@trenneman.com',
    password: 'imroy'
  },
  {
    id: 'c5d95cdc-928d-4fde-a3e4-944611ae3b3f',
    facebookId: '3409592505749871',
    firstName: 'Bartolome',
    lastName: 'Gallego',
    email: 'rvgallego@hotmail.com',
  }
];

export default {
  getUsers: () => users,
  addUser: (user) => users.push(user),
};