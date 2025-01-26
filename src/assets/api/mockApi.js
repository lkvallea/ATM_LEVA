// mockApi.js

import mockData from '../mock/mockData.json';

// Carga inicial de datos simulados
let database = { ...mockData };

// Simulación de un GET por PIN
export const getUserByPIN = (pin) => {
  return new Promise((resolve, reject) => {
    const user = database.users.find((u) => u.pin === pin);
    if (user) {
      resolve(user); // Devuelve el usuario si lo encuentra
    } else {
      reject({ error: 'Usuario no encontrado' }); // Error si no lo encuentra
    }
  });
};

// Simulación de un PUT para actualizar el balance
export const updateBalance = (userId, amount) => {
  return new Promise((resolve, reject) => {
    const user = database.users.find((u) => u.id === userId);
    if (user) {
      user.balance += amount; // Actualiza el balance
      resolve(user); // Devuelve el usuario actualizado
    } else {
      reject({ error: 'Usuario no encontrado' }); // Error si no se encuentra
    }
  });
};
 