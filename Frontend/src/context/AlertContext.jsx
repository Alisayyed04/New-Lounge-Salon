import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);
    const [visible, setVisible] = useState(false);

    const showAlert = (message, type = "error") => {
        setAlert({ message, type });
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
            setTimeout(() => setAlert(null), 300);
        }, 3000);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {alert && (
                <div
                    className={`fixed top-6 right-6 z-[9999] transition-all duration-300
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
                >
                    <div
                        className={`flex items-center gap-4 px-5 py-4 rounded-xl
                        backdrop-blur-xl border shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                        
                        ${alert.type === "error"
                                ? "bg-red-900/30 border-red-500/30 text-red-300"
                                : "bg-green-900/30 border-green-500/30 text-green-300"
                            }`}
                    >

                        {/* ICON */}
                        <div className="text-xl">
                            {alert.type === "error" ? "❌" : "✅"}
                        </div>

                        {/* MESSAGE */}
                        <p className="text-sm font-medium tracking-wide">
                            {alert.message}
                        </p>

                        {/* CLOSE */}
                        <button
                            onClick={() => setVisible(false)}
                            className="ml-2 text-sm opacity-70 hover:opacity-100 transition"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);