import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss';

//local source code
// import { Wrapper as PopperWrapper } from '~/components/Popper';
// import AccountItem from '~/components/AccountItem';
// import { useDebounce } from '~/hook';
// import * as searchServices from '~/services/searchServise';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);

    // const debounce = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResults(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    // useEffect(() => {
    //     if (!debounce.trim()) {
    //         setSearchResults([]);
    //         return;
    //     }

    //     setLoading(true);

    //     const fetchApi = async () => {
    //         setLoading(true);

    //         const result = await searchServices.search(debounce);
    //         setSearchResults(result);

    //         setLoading(false);
    //     };

    //     fetchApi();
    // }, [debounce]);

    return (
        // Error Tippy
        <div>
            <HeadlessTippy
                interactive={true}
                visible={showResults && searchResults.length > 0}
                // render={(attrs) => (
                //     <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                //         <PopperWrapper>
                //             <h4 className={cx('search-title')}>Accounts</h4>
                //             {searchResults.map((result) => (
                //                 <AccountItem key={result.id} data={result} />
                //             ))}
                //         </PopperWrapper>
                //     </div>
                // )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm truyện, tác giả..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResults(true)}
                    />

                    {/* icon loading */}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    {/* button icon clear */}
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {/* button search */}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
