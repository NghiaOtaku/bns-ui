import styles from './HeroStory.module.scss';
import classNames from 'classnames/bind';

import Image from '~/components/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpenReader, faHandHoldingHeart, faList, faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HeroStory() {
    return (
        <div className={cx('hero-of-story')}>
            <div className={cx('img-story')}>
                <Image
                    className={cx('custom-zoom-img')}
                    src={
                        'https://api.bachngocsach.vip/storage/story_img/small_7jl1PhIIfUI8iZm9yFsmH1AgDXCU9iDdQ2qyL3sq.png'
                    }
                    alt="Truyen"
                />
            </div>
            <div className={cx('info-story')}>
                <div className={cx('info-story-title')}>
                    <h1>
                        <span style={{ color: 'blue' }}>[Dich]</span> Tro thanh nha gia kim trong the gioi Harry Poter
                    </h1>
                </div>
                <div className={cx('info-story-author')}>
                    <Button>
                        <h3>
                            Tac gia:
                            <span> Con meo luoi tren ban phim</span>
                        </h3>
                    </Button>
                </div>
                <div className={cx('info-story-contributor')}>
                    <h3>
                        {'Contributor: '}
                        <Button>
                            <span> Chu tieu xam long</span>
                        </Button>
                    </h3>
                </div>
                <div className={cx('info-story-status')}>
                    <h3>
                        Tinh trang: <span>Con tiep</span>
                    </h3>
                </div>
                <div className={cx('info-story-theloai')}>
                    <Button type>Lich su</Button>
                    <Button type>Quan su</Button>
                </div>
                <div className={cx('info-story-tag')}>
                    <Button tag>Doc quen BNS</Button>
                </div>
                <div className={cx('info-story-detail')}>
                    <span className={cx('info-story-detail-chu')}>1000000 Chu</span>
                    <span className={cx('info-story-detail-chuong')}>1000000 Chu</span>
                    <span className={cx('info-story-detail-doc')}>1000000 Chu</span>
                </div>
                <div className={cx('info-story-interactive')}>
                    <div className={cx('info-story-docluutruyen')}>
                        <Button>
                            <FontAwesomeIcon icon={faBookOpenReader} />
                            <span>Doc tu dau</span>
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faBook} />
                            <span>Luu truyen</span>
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faList} />
                            <span>D.S Chuong</span>
                        </Button>
                    </div>
                    <div className={cx('info-story-interaction')}>
                        <Button>
                            <div className={cx('info-story-interaction-item')}>
                                <FontAwesomeIcon icon={faHandHoldingHeart} />
                                <span>Ung ho</span>
                            </div>
                        </Button>
                        <Button>
                            <div className={cx('info-story-interaction-item')}>
                                <FontAwesomeIcon icon={faStar} />
                                <span>Danh gia</span>
                            </div>
                        </Button>
                        <Button>
                            <div className={cx('info-story-interaction-item')}>
                                <Image
                                    style={{ width: '34px', height: '18px' }}
                                    src={'https://bachngocsach.vip/img/np-icon.06a11732.png'}
                                    alt=""
                                />
                                <span>De cu</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('rate')}>
                <div className={cx('rate-story')}>
                    <div className={cx('star-box')}>123</div>
                    <div className={cx('rate-box')}>
                        <div className={cx('num')}>5/5</div>
                        <div className={cx('sating-count')}>Danh gia: 16 luot</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroStory;
