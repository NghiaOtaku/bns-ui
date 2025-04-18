import styles from './HeroStory.module.scss';
import classNames from 'classnames/bind';
import { Rating as RatingStar } from 'react-simple-star-rating';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import Image from '~/components/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpenReader, faHandHoldingHeart, faList, faMoneyBill, faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function HeroStory({ dataStory }) {
    console.log(dataStory, 'dataStory');
    const convertTime = (x) => dayjs(x).format('DD-MM-YYYY HH:mm');

    let data = dataStory || [];

    const [userRate, setUserRate] = useState([]);

    const fetchApi = async () => {
        let json = await axios.get(
            `https://ngocsach.com/api/story/${data.id}/user-recommendation?per_page=5`,
        );
        return json.data;
    };

    useEffect(() => {
        fetchApi()
            .then((results) => {
                setUserRate(results);
            })
            .catch((err) => console.log(err));
    }, [data]);

    console.log('user rate', userRate);

    return (
        <div className={cx('hero-of-story')}>
            <div className={cx('img-story')}>
                <Image className={cx('custom-zoom-img')} src={data.cover} alt="Truyen" />
            </div>
            <div className={cx('info-story')}>
                <div className={cx('info-story-title')}>
                    <h1>
                        <span style={{ color: 'blue' }}>[{data.source?.name}] </span>
                        {data.name}
                    </h1>
                </div>
                <div className={cx('info-story-author')}>
                    Tac gia:
                    <Button to={`/tac-gia/${data.author?.slug}/${data.author?.id}`}>
                        <span>{data.author?.name}</span>
                    </Button>
                </div>
                <div className={cx('info-story-contributor')}>
                    <h3>
                        {'Contributor: '}
                        {data.contributors?.map((item, index) => {
                            return (
                                <Button key={index} to={`/trang-ca-nhan/${item.id}`}>
                                    <span>{item.username},</span>
                                </Button>
                            );
                        })}
                    </h3>
                </div>
                <div className={cx('info-story-status')}>
                    <h3>
                        Tinh trang: <span>Con tiep</span>
                    </h3>
                </div>
                <div className={cx('info-story-theloai')}>
                    {data.categories?.map((item, index) => {
                        return (
                            <Button type key={index} to={`/the-loai/${item.slug}/${item.id}`}>
                                {item.name}
                            </Button>
                        );
                    })}
                </div>
                <div className={cx('info-story-tag')}>
                    {data.tags?.map((item, index) => {
                        return (
                            <Button tag key={index} to={`/tag/${item.slug}/${item.id}`}>
                                {item.name}
                            </Button>
                        );
                    })}
                </div>
                <div className={cx('info-story-detail')}>
                    <span className={cx('info-story-detail-chu')}>
                        {`${data.total_words?.toLocaleString()}`}
                        <small> Chữ</small>
                    </span>
                    <span className={cx('info-story-detail-chuong')}>
                        {`${data.chapters_count?.toLocaleString()}`} <small> Chương</small>
                    </span>
                    <span className={cx('info-story-detail-doc')}>
                        {`${data.view?.toLocaleString()}`} <small> Đọc</small>
                    </span>
                </div>
                {data.np !== 0 ? (
                    <div style={{ fontSize: '14px' }}>
                        <span style={{ color: 'orange' }}>
                            {data.np?.toLocaleString()} <small style={{ fontSize: '80%', fontWeight: '400' }}>Đề cử Ngọc Phiếu</small>
                        </span>
                    </div>
                ) : (
                    <></>
                )}
                <div className={cx('info-story-interactive')}>
                    <div className={cx('info-story-docluutruyen')}>
                        <Button>
                            <FontAwesomeIcon icon={faBookOpenReader} />
                            <span>Đọc từ đầu</span>
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faBook} />
                            <span>Lưu truyện</span>
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faList} />
                            <span>D.S Chương</span>
                        </Button>
                    </div>
                    <div className={cx('info-story-interaction')}>
                        <Button>
                            <div className={cx('info-story-interaction-item')}>
                                <FontAwesomeIcon icon={faHandHoldingHeart} />
                                <span>Ủng hộ</span>
                            </div>
                        </Button>
                        <Button>
                            <div className={cx('info-story-interaction-item')}>
                                <FontAwesomeIcon icon={faStar} />
                                <span>Đánh giá</span>
                            </div>
                        </Button>
                        <Button>
                            <div className={cx('info-story-interaction-item')}>
                            <FontAwesomeIcon icon={faMoneyBill} />
                                <span>Đề cử</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('rate')}>
                <div className={cx('rate-story')}>
                    <div className={cx('star-box')}>
                        <RatingStar allowFraction={true} size={30} initialValue={data.avg_rating} readonly={true} />
                    </div>
                    <div className={cx('rate-box')}>
                        <button className={cx('rate-box-mask-icon')}>
                            <FontAwesomeIcon icon={faPlusSquare} />
                        </button>
                        <span className={cx('num')}>
                            <span style={{ color: 'rgb(18, 166, 47)' }}>{data.avg_rating}</span>
                            <small>/5</small>
                        </span>
                        <div className={cx('btn-wrapper')}>
                            <div>
                                Đánh giá:
                                <p className={cx('rating-count')}>{data.ratings_count} lượt</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('user-recommendation')}>
                        <p className={cx('user-recommendation-title')}>Đề cử gần nhất</p>
                        <ul className={cx('user-recommendation-list')}>
                            {userRate.data?.map((item, index) => {
                                return (
                                    <li key={index} className={cx('user-recommendation-list-item')}>
                                        <div className={cx('user')}>
                                            <div className={cx('user-info')}>
                                                <div className={cx('user-info-header')}>
                                                    <a href="/trang-ca-nhan/15297.html" className={cx('user-name')}>
                                                        {item?.user.username}
                                                    </a>
                                                </div>
                                                <p className={cx('user-info-created-at')}>
                                                    {convertTime(item.updated_at)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={cx('user-donate')}>
                                            <span className={cx('user-donate-count')}>{item?.np} NP</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroStory;
