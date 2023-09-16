import { useCallback, useEffect, useState } from "react";



const useViewport = () => {
    const hasWindow = typeof window !== "undefined";
    const getWindowDimension = useCallback(() => ({ width: window.innerWidth, height: window.innerHeight }), []);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimension());

    useEffect(() => {
        window.addEventListener("resize", () => setWindowDimensions(getWindowDimension()));
        return () => window.removeEventListener("resize", () => setWindowDimensions(getWindowDimension()));
    }, [hasWindow, getWindowDimension]);

    return windowDimensions;
};

export default useViewport;
