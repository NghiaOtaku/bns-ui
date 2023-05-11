import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

import Button from '../Button/Button';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(styles);

function OnceComment({ data }) {
    return (
        <div className={cx('comments-item-user-rep-item-once')}>
            <div className={cx('comments-user-avatar')}>
                <a href="/trang-ca-nhan/9455.html" className={cx('avatar')}>
                    <img
                        src={
                            data.user?.avatar === 'https://api.bachngocsach.vip/storage/'
                                ? images.avatarDefault
                                : data.user?.avatar
                        }
                        alt=""
                    ></img>
                </a>
            </div>
            <div className={cx('user-comment-rep-content')}>
                <h3 className={cx('user-comment-name')}>
                    <Button to="/trang-ca-nhan/9455.html" className={cx('user-info-link')}>
                        {data.user?.username}
                    </Button>
                </h3>
                <div className={cx('rate-body')}>
                    <p className={cx('rate-content')}>{data?.content}</p>
                </div>
                <div className={cx('comment-action')}>
                    <span className={cx('comment-action-like')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faThumbsUp} />
                        <span>{data?.like}</span>
                    </span>
                    <span className={cx('comment-action-rep')}>Trả lời</span>
                    <span className={cx('comment-action-time')}>{data?.updated_at}</span>
                </div>
            </div>
        </div>
    );
}

export default OnceComment;
