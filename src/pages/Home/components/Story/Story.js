import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Story.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

//local Code
import CardStory from '~/components/CardStory';

// {/* Link Top nguyet phieu */ }
// {/* https://api.bachngocsach.vip/api/recommended-stories?per_page=12&option=landing */}

const cx = classNames.bind(styles);

function Story() {
    const [story, setStory] = useState([]);

    const fetchApi = async () => {
        let json = await axios.get('https://ngocsach.com/api/recommended-stories?per_page=12&option=landing');
        return json.data;
    };
    useEffect(() => {
        fetchApi()
            .then((results) => {
                // console.log('results', results);
                setStory(results);
            })
            .catch((err) => console.log(err));
    }, []);

    // console.log('story', story);

    return (
        <div className={cx('story-of-weeks')}>
            <h3 className={cx('card-header')}>
                <p>Top Nguyệt Phiếu (tuần)</p>
                <button className={cx('card-more')}>
                    <p>Tất cả</p>
                    <FontAwesomeIcon className={cx('more-arrow-btn')} icon={faLongArrowAltRight} />
                </button>
            </h3>
            <div className={cx('list-story')}>
                {story.map((item, index) => (
                    <CardStory key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Story;
