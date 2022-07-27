import clsx from 'clsx';

function Container({ children, className }) {
    return <div className={clsx('flex min-h-screen', className)}>{children}</div>;
}

export default Container;
