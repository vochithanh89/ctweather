import { useEffect, useRef, useState } from 'react';

function useDelay(delay, isLoading) {
    const [isSuccess, setIsSuccess] = useState(false);
    const time = useRef();

    useEffect(() => {
        if (isLoading) {
            time.current = new Date();
            setIsSuccess(false);
        } else {
            const timeLoading = new Date() - time.current;
            if (timeLoading > delay) {
                setIsSuccess(true);
            } else {
                var timeoutId = setTimeout(() => {
                    setIsSuccess(true);
                }, [delay]);
            }
        }
        return () => clearTimeout(timeoutId);
    }, [isLoading, delay]);

    return isLoading ? false : isSuccess;
}

export default useDelay;
