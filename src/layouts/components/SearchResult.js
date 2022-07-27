import { useDispatch } from 'react-redux';
import { settingsSlice } from '../../components/redux/settingsSlice';
import { setLocationLocal } from '../../utils/localStorage';

function SearchResult({ data }) {
    const dispatch = useDispatch();

    const handleChooseCity = (city) => {
        setLocationLocal(city.lon, city.lat);
        dispatch(settingsSlice.actions.locationChange({ lon: city.lon, lat: city.lat }));
    };

    return (
        <ul
            onMouseDown={(e) => e.preventDefault()}
            className="absolute top-full left-0 right-0 mt-2 py-2 rounded-md bg-gray-100 overflow-hidden z-10"
        >
            {data.length > 0 ? (
                data.map((city, index) => {
                    return (
                        <li key={index}>
                            <button
                                onClick={() => handleChooseCity(city)}
                                className="px-2 py-[0.25rem] w-full text-left transition hover:bg-gray-200"
                            >
                                {city.name}
                            </button>
                        </li>
                    );
                })
            ) : (
                <p className="text-center text-gray-500">Not result</p>
            )}
        </ul>
    );
}

export default SearchResult;
