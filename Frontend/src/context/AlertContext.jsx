import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);
    const [visible, setVisible] = useState(false);

    const showAlert = (message, type = "error") => {
        setAlert({ message, type });
        setVisible(true);

        // hide after 3s
        setTimeout(() => {
            setVisible(false);
            setTimeout(() => setAlert(null), 300); // wait for animation
        }, 3000);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {alert && (
                <div
                    className={`fixed top-5 right-5 z-50 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                        }`}
                >
                    <div>
                        <span>
                            {alert.type === "error" ? "❌" : "✅"}
                        </span>

                        <p>{alert.message}</p>

                        <button onClick={() => setVisible(false)}>
                            ✖
                        </button>
                    </div>
                </div>
            )}

        </AlertContext.Provider >
    );
};

export const useAlert = () => useContext(AlertContext);