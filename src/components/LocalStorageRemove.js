import {useEffect} from "react";

function LocalStorageRemove() {
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.clear();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <>
        </>
    );
}

export default LocalStorageRemove;