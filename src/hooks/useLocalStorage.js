import { useEffect } from "react";

function useLocalStorage(key, value, enabled = true) {
    useEffect(() => {
        if (!enabled) return;

        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Unable to save tasks:", error);
        }
    }, [key, value, enabled]);
}

export default useLocalStorage;