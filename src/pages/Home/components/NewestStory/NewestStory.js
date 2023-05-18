import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './NewestStory.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NewestStory({ title, marginbottom, view = false, chuong = false, ...props }) {
    // console.log(props?.idAuthor, 'idAuthor');
    const [story, setStory] = useState([]);
    // const [story1, setStory1] = useState([]);
    let url = props.api;

    const fetchApi = async () => {
        console.log('url', url);
        let json = await axios.get(url);
        return json.data;
    };

    // useEffect(() => {
    //     fetch(`https://api.bachngocsach.vip/api/author/${props?.idAuthor}/story`)
    //         .then((res) => res.json())
    //         .then((res) => setStory1(res));
    // }, []);

    // console.log('story1', story1.data);

    useEffect(() => {
        fetchApi()
            .then((results) => {
                setStory(results.data);
            })
            .catch((err) => console.log(err, 'error'));
    }, [url]);

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
                        console.log(item, 'item');
                        return (
                            <li key={index}>
                                <div className={cx('list-group-item')}>
                                    <Button
                                        dataStory={item}
                                        to={`/truyen/${data.slug}`}
                                        prefix
                                        className={cx('list-name')}
                                    >
                                        <span className={cx('prefix-list-name')}>[{data.source.name}]</span>
                                        <p>{data.name}</p>
                                    </Button>
                                    <Button
                                        data={item}
                                        to={`/tac-gia/${data.author.slug}`}
                                        className={cx('list-author')}
                                    >
                                        <p>{data.author.name}</p>
                                    </Button>
                                </div>
                                {chuong ? (
                                    <div className={cx('cate-items')}>
                                        <Button
                                            dataStory={item.chapter}
                                            to={`${data.source.slug}/${data.slug}/${data.id}/${item?.chapter.slug}/${item.chapter.id}`}
                                            className={cx('cate-items-btn')}
                                        >
                                            <p>{item?.chapter.name}</p>
                                        </Button>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {view ? (
                                    <div className={cx('cate-items')}>
                                        <p>views: {item?.view}</p>
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
