import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import dayjs from 'dayjs';
import ShowMoreText from 'react-show-more-text';

import images from '~/assets/images';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';
import ManyComment from './ManyComment';
import OnceComment from './OnceComment';

const cx = classNames.bind(styles);

function Comment({ data = {}, idStory }) {
    console.log('data', data);
    const convertTime = (x) => dayjs(x).format('DD-MM-YYYY HH:mm:ss');
    const [toggleComment, setToggleComment] = useState(true);
    const divRef = useRef();

    const [comments, setComments] = useState([]);
    const scrollToElement = () => divRef.current.scrollIntoView();

    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    };

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        fetch(`https://api.bachngocsach.vip/api/comment?type=story&target_id=${idStory}?per_page=20&page=1`)
            .then((res) => res.json())
            .then((res) => setComments(res));
    }, [data]);

    // console.log('comments', comments);
    let x;

    const fetchComment = async (page) => {
        const res = await fetch(
            `https://api.bachngocsach.vip/api/comment?type=story&target_id=${idStory}?per_page=20&page=${page}`,
        );
        const data = await res.json();
        console.log('fetchcomment', data);
        return data;
    };

    const handlePageClick = async (data) => {
        scrollToElement();
        console.log(data.selected);

        let page = data.selected + 1;

        const commentsFormServer = await fetchComment(page);

        setComments(commentsFormServer);
    };

    console.log('comments', comments);

    return (
        <div ref={divRef} className={cx('wrapper')}>
            <div className={cx('container')}>
                <h4 style={{ fontSize: '2.4rem' }}>Binh luan ({comments?.total})</h4>
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
                    // console.log('item comments', item);
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
                                            <p className={cx('rate-content')}>{item?.content}</p>
                                        </ShowMoreText>
                                    </div>
                                    <div className={cx('comment-action')}>
                                        <span className={cx('comment-action-like')}>
                                            <FontAwesomeIcon className={cx('icon')} icon={faThumbsUp} />
                                            <span>{item?.like}</span>
                                        </span>
                                        <span className={cx('comment-action-rep')}>Trả lời</span>
                                        <span className={cx('comment-action-time')}>
                                            {convertTime(item?.updated_at)}
                                        </span>
                                    </div>
                                    {item.comments.length > 1 ? (
                                        <div className={cx('toggle-action')}>
                                            {console.log('Comments Test', selected.indexOf(index))}
                                            {selected.indexOf(index) >= 0 ? (x = true) : (x = false)}
                                            {console.log('x', x)}
                                            {!x ? (
                                                <span
                                                    onClick={() => {
                                                        // setToggleComment(!toggleComment);
                                                        setSelected((prev) => [...prev, index]);
                                                    }}
                                                >
                                                    Hien cau tra loi
                                                </span>
                                            ) : (
                                                <span
                                                    onClick={() => {
                                                        setSelected((prev) => prev.filter((x) => x !== index));
                                                        // setToggleComment(!toggleComment);
                                                    }}
                                                >
                                                    An cau tra loi
                                                </span>
                                            )}
                                            {console.log('selected', selected)}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div className={cx('comments-item-user-rep')}>
                                {item.comments.length > 1 ? (
                                    <ManyComment indexComment={index} selected={selected} data={item.comments} />
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
            {console.log(comments.total)}
            {comments.total !== 0 ? (
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={comments.last_page}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={cx('pagination')}
                    pageClassName={cx('page-item')}
                    pageLinkClassName={cx('page-link')}
                    previousClassName={cx('page-item')}
                    previousLinkClassName={cx('page-link')}
                    nextClassName={cx('page-item')}
                    nextLinkClassName={cx('page-link')}
                    breakClassName={cx('page-item')}
                    breakLinkClassName={cx('page-link')}
                    activeClassName={cx('active')}
                />
            ) : (
                <></>
            )}
        </div>
    );
}

export default Comment;
