import { useEffect, useState, type ReactNode } from "react";

const ClientOnly = ({ children }: { children: ReactNode }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? <>{children}</> : null;
};

export default ClientOnly;
