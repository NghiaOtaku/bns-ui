import classNames from 'classnames/bind';
import styles from './CardStory.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '~/components/Image/Image';
import Button from '~/components/Button';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CardStory({ item }) {
    return (
        <div className={cx('card-story-full')}>
            <div className={cx('novel-item')}>
                <button className={cx('cover-story')}>
                    <Image className={cx('custom-zoom-img')} src={item.cover} alt="Anh Truyen" />
                </button>
                <div className={cx('story-intro')}>
                    <h4>
                        <Button dataStory={item} to={`/truyen/${item.slug}`} prefix className={cx('title-text')}>
                            {item.name}
                        </Button>
                    </h4>
                    {/* <div className={cx('author-source')}>
                        <button className={cx('author')}>{item.author?.name}</button>
                        <button className={cx('badge-dich')}>{item.source?.slug}</button>
                    </div> */}
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
    );
}

export default CardStory;
