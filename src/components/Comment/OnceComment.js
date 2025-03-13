import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import ShowMoreText from 'react-show-more-text';

import Button from '../Button/Button';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(styles);

const convertTime = (x) => dayjs(x).format('DD-MM-YYYY HH:mm:ss');

function OnceComment({ data }) {
    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    };

    return (
        <div className={cx('comments-item-user-rep-item-once')}>
            <div className={cx('comments-user-avatar')}>
                <a href="/trang-ca-nhan/9455.html" className={cx('avatar')}>
                    <img
                        src={images.avatarDefault
                            // data.user?.avatar === 'https://api.bachngocsach.vip/storage/'
                            //     ? images.avatarDefault
                            //     : data.user?.avatar
                        }
                        alt=""
                    ></img>
                </a>
            </div>
            <div className={cx('user-comment-rep-content')}>
                <h3 className={cx('user-comment-name')}>
                    <Button to="/trang-ca-nhan/9455.html" className={cx('user-info-link')}>
                        {data?.username}
                    </Button>
                </h3>
                <div className={cx('rate-body')}>
                    <ShowMoreText
                        lines={3}
                        more="Xem them"
                        less="An bot"
                        className={cx('rate-body-content')}
                        anchorClass={cx('show-more-less-btn')}
                        onClick={executeOnClick}
                        expanded={false}
                        truncatedEndingComponent={'... '}
                    >
                        <p className={cx('rate-content')}>{data?.content}</p>
                    </ShowMoreText>
                </div>
                <div className={cx('comment-action')}>
                    <span className={cx('comment-action-like')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faThumbsUp} />
                        <span>{data?.like}</span>
                    </span>
                    <span className={cx('comment-action-rep')}>Trả lời</span>
                    <span className={cx('comment-action-time')}>{convertTime(data?.updated_at)}</span>
                </div>
            </div>
        </div>
    );
}

export default OnceComment;
