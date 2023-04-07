import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Story.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

//local Code
import Image from '~/components/Image/Image';

// {/* Link Top nguyet phieu */ }
// {/* https://api.bachngocsach.vip/api/recommended-stories?per_page=12&option=landing */}

const cx = classNames.bind(styles);

function Story() {
    const [story, setStory] = useState([]);

    const fetchApi = async () => {
        let json = await axios.get('https://api.bachngocsach.vip/api/recommended-stories?per_page=12&option=landing');
        return json.data;
    };
    useEffect(() => {
        fetchApi()
            .then((results) => {
                setStory(results);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={cx('story-of-weeks')}>
            <h3 className={cx('card-header')}>
                <p>Top Nguyet Phieu (tuan)</p>
                <button className={cx('card-more')}>
                    <p>Tat ca</p>
                    <FontAwesomeIcon className={cx('more-arrow-btn')} icon={faLongArrowAltRight} />
                </button>
            </h3>
            <div className={cx('list-story')}>
                {story.map((item, index) => (
                    <div key={index} className={cx('card-story-full')}>
                        <div className={cx('novel-item')}>
                            <button className={cx('cover-story')}>
                                <Image className={cx('custom-zoom-img')} src={item.cover} alt="Anh Truyen" />
                            </button>
                            <div className={cx('story-intro')}>
                                <h4>
                                    <button className={cx('title-text')}>{item.name}</button>
                                </h4>
                                <div className={cx('author-source')}>
                                    <button className={cx('author')}>{item.author.name}</button>
                                    <button className={cx('badge-dich')}>{item.source.slug}</button>
                                </div>
                                <div className={cx('story-info')}>
                                    <span className={cx('text-danger')}>
                                        {item.total_words}
                                        <small> Chu</small>
                                    </span>
                                    <span className={cx('text-success')}>
                                        {item.chapters_count}
                                        <small> Chuong</small>
                                    </span>
                                    <span className={cx('text-primary')}>
                                        {item.sum_np_in_week}
                                        <small> De cu</small>
                                    </span>
                                </div>
                                <div className={cx('story-quote')}>
                                    <FontAwesomeIcon className={cx('quotes-icon')} icon={faQuoteLeft} />
                                    <blockquote>{item.desc}</blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Story;
