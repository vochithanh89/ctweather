function StatusCard({ title, children }) {
    return (
        <div className="flex flex-col w-64 p-5 rounded-2xl bg-white">
            <p>{title}</p>
            <div className="flex-1">{children}</div>
        </div>
    );
}

export default StatusCard;
