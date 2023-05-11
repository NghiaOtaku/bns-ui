import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function ManyComment({ data }) {
    console.log('ManyComment data', data);

    return data.map((item, index) => {
        return (
            <div key={index} className={cx('comments-item-user-rep-item-many')}>
                <img
                    src={
                        item.user?.avatar === 'https://api.bachngocsach.vip/storage/'
                            ? images.avatarDefault
                            : item.user?.avatar
                    }
                    alt=""
                />
                <p>{item.user?.username}</p>
                <div className={cx('comment-preview-content')}>{item?.content}</div>
            </div>
        );
    });
}

export default ManyComment;
