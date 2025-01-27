import mockData from '../../componetns/mockData.json';

let database = { ...mockData };

export const getUserByPIN = async (pin) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {     
      const user = database.users.find((u) => u.pin === pin);
      if (user) {
        resolve({ isValidPin: true, user });
      } else {
        reject({ error: "Invalid PIN" });
      }
    }, 500);
  });
};

export const withdrawAmount = async (userId, amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Buscar el usuario en la base de datos
      const user = database.users.find((u) => u.id === userId);

      if (user) {
        const numericAmount = parseFloat(amount); // Asegura que amount sea un número
        if (isNaN(numericAmount) || numericAmount <= 0) {
          reject({ error: "Invalid amount. Please enter a valid number." });
          return;
        }

        // Validación del monto a retirar
        if (numericAmount > user.balance) {
          alert("Insufficient balance. Please try again with a smaller amount.");
          reject({ error: "Insufficient balance." });
          return;
        }

        // Resta el monto del saldo del usuario
        user.balance -= numericAmount;
        resolve({ success: true, balance: user.balance }); // Devuelve el saldo actualizado
      } else {
        reject({ error: "User not found" });
      }
    }, 500); // Simula un retraso de 500ms
  });
};


export const depositAmount = async (userId, amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = database.users.find((u) => u.id === userId);
      if (user) {
        const numericAmount = parseFloat(amount); 
        if (numericAmount > 0) { 
          user.balance += numericAmount; 
          resolve({ success: true, balance: user.balance }); 
        } else {
          reject({ error: "Invalid amount. Please enter a valid number." });
        }
      } else {
        reject({ error: "User not found" });
      }
    }, 500); 
  });
};


export const createToken = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = Math.random().toString(36).substr(2); 
      sessionStorage.setItem("token",token);
      resolve(token);
    }, 300); 
  });
};

export const validateToken = async (token) => {
  const privateKey = sessionStorage.getItem("token")
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (String(token) === String(privateKey)) {  
        resolve(true);
      } else {
        reject(new Error("Invalid token"));
      }
    }, 300); 
  });
};
