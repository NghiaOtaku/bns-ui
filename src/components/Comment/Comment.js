import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect } from 'react';

import images from '~/assets/images';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';
import ManyComment from './ManyComment';
import OnceComment from './OnceComment';

const cx = classNames.bind(styles);

function Comment({ data, idStory }) {
    const [toggleComment, setToggleComment] = useState(true);
    const divRef = useRef();

    const [comments, setComments] = useState([]);
    console.log('divRef', divRef);
    // const scrollToElement = () => divRef.current.scrollIntoView();

    useEffect(() => {
        fetch(`https://api.bachngocsach.vip/api/comment?type=story&target_id=${idStory}?per_page=20&page=1`)
            .then((res) => res.json())
            .then((res) => setComments(res));
    }, [data]);

    console.log('comments', comments);

    // const fetchChapter = async (page) => {
    //     const res = await fetch(
    //         `https://api.bachngocsach.vip/api/story/${idStory}/chapter?per_page=50&page=${page}&order_by=asc`,
    //     );
    //     const data = await res.json();
    //     return data.chapters;
    // };

    // const handlePageClick = async (data) => {
    //     // scrollToElement();
    //     console.log(data.selected);

    //     let page = data.selected + 1;

    //     const commentsFormServer = await fetchChapter(page);

    //     setChapter(commentsFormServer);
    // };

    return (
        <div ref={divRef} className={cx('wrapper')}>
            <div className={cx('container')}>
                <h4 style={{ fontSize: '2.4rem' }}>Binh luan</h4>
                <div className={cx('user-form')}>
                    <div className={cx('frame-avatar-user-comment')}>
                        <img src={images.avatarDefault} alt="" />
                        <form className={cx('form-comment')}>
                            <textarea rows="1"></textarea>
                            <div>
                                <button type="submit" className={cx('submit-comment')}>
                                    Bình luận
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* List Comment */}
                {comments.data?.map((item, index) => {
                    console.log('length', item.comments.length);
                    return (
                        <div key={index} className={cx('comments-item')}>
                            <div className={cx('comments-item-user')}>
                                <div className={cx('comments-user-avatar')}>
                                    <a href="/trang-ca-nhan/9455.html" className={cx('avatar')}>
                                        <img
                                            src={
                                                item.user?.avatar === 'https://api.bachngocsach.vip/storage/'
                                                    ? images.avatarDefault
                                                    : item.user?.avatar
                                            }
                                            alt=""
                                        ></img>
                                    </a>
                                </div>
                                <div className={cx('comments-user-content')}>
                                    <h3 className={cx('user-comment-name')}>
                                        <Button to={`/trang-ca-nhan/${item.user_id}`} className={cx('user-info-link')}>
                                            {item.user?.username}
                                        </Button>
                                    </h3>
                                    <div className={cx('rate-body')}>
                                        <p className={cx('rate-content')}>{item?.content}</p>
                                    </div>
                                    <div className={cx('comment-action')}>
                                        <span className={cx('comment-action-like')}>
                                            <FontAwesomeIcon className={cx('icon')} icon={faThumbsUp} />
                                            <span>{item?.like}</span>
                                        </span>
                                        <span className={cx('comment-action-rep')}>Trả lời</span>
                                        <span className={cx('comment-action-time')}>{item?.updated_at}</span>
                                    </div>
                                    {item.comments.length > 1 ? (
                                        <div className={cx('toggle-action')}>
                                            {toggleComment ? (
                                                <span onClick={() => setToggleComment(!toggleComment)}>
                                                    Hien cau tra loi
                                                </span>
                                            ) : (
                                                <span onClick={() => setToggleComment(!toggleComment)}>
                                                    An cau tra loi
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div className={cx('comments-item-user-rep')}>
                                {item.comments.length > 1 ? (
                                    <ManyComment data={item.comments} />
                                ) : item.comments.length === 1 ? (
                                    <OnceComment data={item.comments[0]} />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Comment;
