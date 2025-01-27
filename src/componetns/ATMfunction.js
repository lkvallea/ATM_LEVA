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

                
                const result = await withdrawAmount(userData.id, inputValue);

                if (result.success) {
                    const updatedUser = {
                        ...userData,
                        balance: result.balance, 
                    };
                    setUserData(updatedUser); 
                    setInputValue(""); 
                    setCurrentScreen("success"); 
                }
            } catch (error) {
                console.error(error.error || error.message);

                if (error.error === "Insufficient balance.") {
                    alert("Insufficient balance. Please try again with a smaller amount.");
                } else {
                    alert(error.error || "Something went wrong. Please try again.");
                }

                setInputValue(""); 
                setCurrentScreen("withdraw"); 
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
                inputElement.value = ""; 
            }
            break;


        default:

            break;
    }
};
