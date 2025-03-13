import classNames from 'classnames/bind';
import styles from './Rating.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Rating as RatingStar } from 'react-simple-star-rating';
import InfiniteScroll from 'react-infinite-scroll-component';

const cx = classNames.bind(styles);

function Rating({ data }) {
    // console.log('data', data);
    const [userRate, setUserRate] = useState([]);
    const [dataUserRate, setDataUserRate] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchApi = async () => {
        let json = await axios.get(`https://ngocsach.com/api/story-ratings/${data.id}?page=${page}`);
        return json.data;
    };

    useEffect(() => {
        fetchApi()
            .then((results) => {
                setUserRate(results);
                setDataUserRate(results.data);
                if (results.data.length !== 0) {
                    setHasMore(true);
                    setPage((prev) => prev + 1);
                } else {
                    setHasMore(false);
                }
            })
            .catch((err) => console.log(err));
    }, [data]);

    // console.log('User Rate', userRate);

    const fetchDataUserRate = async () => {
        console.log('Page', page);
        console.log('Has More', hasMore);
        let json = await axios.get(`https://api.bachngocsach.vip/api/story-ratings/${data.id}?page=${page}`);
        console.log('Data User Rate', json.data);
        if (json.data.data.length !== 0) {
            setHasMore(true);
            setPage((prev) => prev + 1);
        } else {
            setHasMore(false);
        }
        setDataUserRate((prev) => [...prev, ...json.data.data]);
    };

    // console.log('Page', page);
    // console.log('Has More', hasMore);

    return (
        <div className={cx('wrapper')}>
            <ul>
                <InfiniteScroll
                    dataLength={dataUserRate.length} //This is important field to render the next data
                    next={fetchDataUserRate}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    className={cx('infinite-scroll')}
                    height={'auto'}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {console.log('dataUserRate', dataUserRate)}
                    {dataUserRate?.map((item, index) => {
                        return (
                            <li key={index} className={cx('rate-comments-item')}>
                                <div className={cx('rate-comments-user-avatar')}>
                                    <a href="/trang-ca-nhan/9455.html" className={cx('avatar')}>
                                        <img
                                            src={
                                                item.user?.avatar === "https://ngocsach.com/storage/"
                                                    ? images.avatarDefault
                                                    : item.user?.avatar
                                            }
                                            alt=""
                                        ></img>
                                    </a>
                                </div>
                                <div className={cx('rate-comments-user-content')}>
                                    <h3 className={cx('user-comment-name')}>
                                        <a href="/trang-ca-nhan/9455.html" className={cx('user-info-link')}>
                                            {item.user?.username}
                                        </a>
                                    </h3>
                                    <div className={cx('rate-body')}>
                                        <div className={cx('rate-info')}>
                                            <span className={cx('rate-stars')}>
                                                <RatingStar
                                                    allowFraction={true}
                                                    size={25}
                                                    initialValue={item?.rating}
                                                    readonly={true}
                                                />
                                                <span style={{ marginLeft: '5px' }}>{item?.rating}</span>
                                            </span>
                                            <span className={cx('rate-date')}></span>
                                        </div>
                                        <p className={cx('rate-content')}>{item?.review}</p>
                                        <div className={cx('rate-actions')}>
                                            <div className={cx('controls-icon')}>
                                                <span>
                                                    <FontAwesomeIcon className={cx('icon')} icon={faThumbsUp} />
                                                    <span>{item?.like === 0 ? null : item?.like}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </InfiniteScroll>
            </ul>
        </div>
    );
}

export default Rating;
