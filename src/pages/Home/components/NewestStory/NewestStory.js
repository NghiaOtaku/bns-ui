import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './NewestStory.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function NewestStory(props) {
    let url = props.api;
    const [story, setStory] = useState([]);

    const fetchApi = async () => {
        let json = await axios.get(url);
        return json.data;
    };

    useEffect(() => {
        fetchApi()
            .then((results) => {
                setStory(results.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={cx('newestStories')}>
            <div className={cx('card-home')}>
                <h3 className={cx('card-header')}>
                    <p>Truyen moi nhat</p>
                    <button className={cx('card-more')}>
                        <FontAwesomeIcon className={cx('more-arrow-btn')} icon={faLongArrowAltRight} />
                    </button>
                </h3>
                <ul className={cx('heading-list')}>
                    {story.map((item, index) => {
                        let data = item.story || item || {};
                        return (
                            <li key={index}>
                                <div className={cx('list-group-item')}>
                                    <button className={cx('list-name')}>
                                        <span className={cx('prefix-list-name')}>[{data.source.name}]</span>
                                        <p>{data.name}</p>
                                    </button>
                                    <button className={cx('list-author')}>
                                        <p>{data.author.name}</p>
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default NewestStory;
