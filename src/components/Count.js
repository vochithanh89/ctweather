import { memo, useEffect, useRef, useState } from 'react';

function Count({ value }) {
    const [count, setCount] = useState(0);
    const intervalId = useRef();

    const fixed = value >= 10 ? 0 : 1;

    useEffect(() => {
        const step = value / 100;
        setCount(0);
        intervalId.current = setInterval(() => {
            setCount((pre) => {
                if (pre >= value) {
                    clearInterval(intervalId.current);
                    return value;
                }
                return pre + step;
            });
        }, [10]);
    }, [value]);

    return <>{count.toFixed(fixed)}</>;
}

export default memo(Count);
