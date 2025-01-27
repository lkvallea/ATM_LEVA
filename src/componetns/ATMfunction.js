import { getUserByPIN, createToken, validateToken, withdrawAmount, depositAmount } from "../assets/api/mockApi";

export const handleButton = async (action, setCurrentScreen, inputValue,
    userData, setUserData, setInputValue, token, setToken, setActiveIndex) => {
    console.log(`Action triggered: ${action}`);
    switch (action) {
        case "login":
            setCurrentScreen("login");
            break;
        case "enter":
            try {
                const { isValidPin, user } = await getUserByPIN(inputValue);
                if (isValidPin) {
                    const token = await createToken();
                    setToken(token)
                    setUserData(user);
                    setCurrentScreen("dashboard");
                } else {
                    alert("Incorrect PIN");
                    setToken("")
                    localStorage.clear();
                    setActiveIndex(null)
                    setUserData(null);
                    setInputValue("");
                    setCurrentScreen('init')
                }
            } catch (error) {
                console.error("Error en PIN:", error.error || error);
                alert("Incorrect PIN");
                setInputValue("");
                setCurrentScreen("init");
                setActiveIndex(null)
                setUserData(null);
            }
            break;
        case "withdraw":
            setCurrentScreen("withdraw");
            break;
        case "confirmWithdraw":
            try {
                const isValidToken = await validateToken(token);

                if (!isValidToken) {
                    alert("Invalid token. Please try again.");
                    localStorage.clear();
                    setToken("")
                    setUserData(null);
                    setInputValue("");
                    setCurrentScreen("init");
                    setActiveIndex(null)
                }

                // Intentar realizar el retiro
                const result = await withdrawAmount(userData.id, inputValue);

                if (result.success) {
                    const updatedUser = {
                        ...userData,
                        balance: result.balance, // Actualiza el saldo del usuario
                    };
                    setUserData(updatedUser); // Actualiza el estado del usuario
                    setInputValue(""); // Limpia el valor del input
                    setCurrentScreen("success"); // Redirige a la pantalla de éxito
                }
            } catch (error) {
                console.error(error.error || error.message);

                if (error.error === "Insufficient balance.") {
                    alert("Insufficient balance. Please try again with a smaller amount.");
                } else {
                    alert(error.error || "Something went wrong. Please try again.");
                }

                setInputValue(""); // Limpia el valor del input
                setCurrentScreen("withdraw"); // Redirige de nuevo a la pantalla de retiro
            }

            break;

        case "deposit":
            setCurrentScreen("deposit");
            break;

        case "confirmDeposit":
            try {
                const isValidToken = await validateToken(token);
                if (!isValidToken) {
                    alert("Invalid token");
                    setCurrentScreen('init')
                }
                const result = await depositAmount(userData.id, inputValue);
                if (result.success) {
                    const updatedUser = {
                        ...userData,
                        balance: result.balance,
                    };
                    setUserData(updatedUser);
                    setCurrentScreen("success");
                }
            } catch (error) {
                console.error(error.error || error.message);
                alert(error.error || "Something went wrong. Please try again.");
                localStorage.clear();
                setToken("")
                setUserData(null);
                setInputValue("");
                setCurrentScreen("init");
                setActiveIndex(null)
            }
            break;

        case "balance":
            setCurrentScreen("balance");
            break;

        case "exit":
            localStorage.clear();
            setToken("")
            setUserData(null);
            setInputValue("");
            setCurrentScreen("init");
            setActiveIndex(null)
            break;
        case "cancel":
            setCurrentScreen("dashboard");
            break;
        case "other":
            setCurrentScreen("dashboard");
            break;
        case "delete":
            const inputElement = document.getElementsByClassName("screen-input")[0];
            if (inputElement) {
                inputElement.value = ""; // Borra el valor del input
            }
            break;


        default:

            break;
    }
};
