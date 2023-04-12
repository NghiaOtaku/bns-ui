import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './NewestStory.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NewestStory({ title, marginbottom, chuong = false, ...props }) {
    console.log(chuong);
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
        <div style={{ marginBottom: marginbottom }} className={cx('newestStories')}>
            <div className={cx('card-home')}>
                <h3 className={cx('card-header')}>
                    <p>{title}</p>
                    <button className={cx('card-more')}>
                        <FontAwesomeIcon className={cx('more-arrow-btn')} icon={faLongArrowAltRight} />
                    </button>
                </h3>
                <ul className={cx('heading-list')}>
                    {story.map((item, index) => {
                        let data = item.story || item || {};
                        console.log(item);
                        return (
                            <li key={index}>
                                <div className={cx('list-group-item')}>
                                    <Button to={`truyen/${data.slug}`} prefix className={cx('list-name')}>
                                        <span className={cx('prefix-list-name')}>[{data.source.name}]</span>
                                        <p>{data.name}</p>
                                    </Button>
                                    <Button to={`tac-gia/${data.author.slug}`} className={cx('list-author')}>
                                        <p>{data.author.name}</p>
                                    </Button>
                                </div>
                                {chuong ? (
                                    <div className={cx('cate-items')}>
                                        <Button
                                            to={`${data.source.slug}/${data.slug}/${data.id}/${item?.chapter.slug}`}
                                            className={cx('cate-items-btn')}
                                        >
                                            <p>{item?.chapter.name}</p>
                                        </Button>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default NewestStory;
