import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { settingsSelector } from '../../components/redux/selectors';
import useDebounce from '../../hooks/useDebounce';
import { getSearchCity } from '../../utils/api';
import SearchResult from './SearchResult';
import { useSelector } from 'react-redux';
import { BiLoaderAlt } from 'react-icons/bi';

function Searchbar() {
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(false);

    const debounceValue = useDebounce(searchValue);

    const { language } = useSelector(settingsSelector);

    const handleChangeValue = (e) => {
        const value = e.target.value;
        if (value) {
            setShowSearchResult(true);
        } else {
            setShowSearchResult(false);
        }
        setSearchValue(value);
    };

    useEffect(() => {
        if (debounceValue.trim()) {
            setIsLoading(true);
            getSearchCity(debounceValue.trim(), language).then((data) => {
                setShowSearchResult(true);
                setIsLoading(false);
                setSearchData(data);
            });
        } else {
            setSearchData([]);
        }
    }, [debounceValue, language]);

    const handleFocus = (e) => {
        e.target.value && setShowSearchResult(true);
    };

    const handleBlur = () => {
        setShowSearchResult(false);
    };

    return (
        <div className="relative flex-1 flex">
            <span className="flex items-center pl-3 rounded-l-full bg-gray-100">
                <BsSearch />
            </span>
            <input
                value={searchValue}
                onChange={handleChangeValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="flex-1 w-2 p-2 rounded-r-full bg-gray-100 outline-none"
                type="text"
                placeholder="Search for places ..."
            />
            {isLoading && (
                <span className="absolute right-2 top-1/2 translate-y-[-50%]">
                    <BiLoaderAlt className="animate-spin text-gray-500 " />
                </span>
            )}
            {showSearchResult && <SearchResult data={searchData} />}
        </div>
    );
}

export default Searchbar;
