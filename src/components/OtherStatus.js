import Count from './Count';

function OtherStatus({ count, units, iconUrl, iconText }) {
    return (
        <div className="w-full h-full flex flex-col justify-between">
            <p>
                <span className="text-5xl leading-normal">
                    <Count value={count} />
                </span>
                <span className="h-full">{units}</span>
            </p>
            <div className="flex items-center">
                <img
                    className="w-8 h-8 p-[0.4rem] mr-2 border border-solid border-gray-200 rounded-full"
                    src={iconUrl}
                    alt={iconText}
                />
                <p>{iconText}</p>
            </div>
        </div>
    );
}

export default OtherStatus;
