import { useState, useEffect } from "react"

function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth >= 1024 : true
    )

    useEffect(() => {
        function handleResize() {
            setIsDesktop(window.innerWidth >= 1024)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return isDesktop
}

export default useIsDesktop;