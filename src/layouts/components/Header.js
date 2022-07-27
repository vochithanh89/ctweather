import clsx from 'clsx';
import { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { settingsSelector } from '../../components/redux/selectors';
import { settingsSlice } from '../../components/redux/settingsSlice';

function Header() {
    const dispatch = useDispatch();
    const settings = useSelector(settingsSelector);

    const [menu, setMenu] = useState(settings.section);
    const [units, setUnits] = useState(settings.units);

    const handleChangeMenu = (menu) => {
        setMenu(menu);
        dispatch(settingsSlice.actions.sectionChange(menu));
    };
    const handleChangeUnit = (units) => {
        setUnits(units);
        dispatch(settingsSlice.actions.unitsChange(units));
    };

    return (
        <div className="flex items-center justify-between p-8 xs:px-4">
            <div>
                <button
                    onClick={() => handleChangeMenu('hourly')}
                    className={clsx(
                        'mx-2 border-b-[0.16rem] border-solid border-transparent font-bold text-slate-500 transition-all',
                        {
                            '!border-black text-black': menu === 'hourly',
                        },
                    )}
                >
                    Today
                </button>
                <button
                    onClick={() => handleChangeMenu('daily')}
                    className={clsx(
                        'mx-2 border-b-[0.16rem] border-solid border-transparent font-bold text-slate-500 transition-all',
                        {
                            '!border-black text-black': menu === 'daily',
                        },
                    )}
                >
                    Week
                </button>
            </div>
            <div className="flex">
                <a
                    href="https://github.com/vochithanh89/"
                    target="blank"
                    className="flex items-center justify-center mx-2 xs:mx-[0.25rem] w-8 h-8 rounded-full bg-gray-200 text-white"
                >
                    <BsGithub className="text-black" />
                </a>
                <button
                    onClick={() => handleChangeUnit('c')}
                    className={clsx('mx-2 xs:mx-[0.25rem] w-8 h-8 rounded-full bg-white text-black transition-all', {
                        '!bg-black text-white': units === 'c',
                    })}
                >
                    ºC
                </button>
                <button
                    onClick={() => handleChangeUnit('f')}
                    className={clsx('mx-2 xs:mx-[0.25rem] w-8 h-8 rounded-full bg-white text-black transition-all', {
                        '!bg-black text-white': units === 'f',
                    })}
                >
                    ºF
                </button>
            </div>
        </div>
    );
}

export default Header;
