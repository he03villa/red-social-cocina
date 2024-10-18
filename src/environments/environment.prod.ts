export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000/api/',
  api: {
    user: {
      name: 'usuarios',
      service: {
        saveUser: 'create',
        login: 'login',
      }
    }
  }
};
