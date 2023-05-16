import classNames from 'classnames/bind';
import styles from './Tag.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import CardStory from '~/components/CardStory';
import NewestStory from '../Home/components/NewestStory';

const cx = classNames.bind(styles);

function Tag() {
    const param = useParams();
    const divRef = useRef();
    const scrollToElement = () => divRef.current.scrollIntoView();

    const [cardStory, setCardStory] = useState([]);
    const [tag, setTag] = useState({});

    const fetchApi = async () => {
        let json = await axios.get(`https://api.bachngocsach.vip/api/tag/${param.id}/story?per_page=10&page=1`);
        return json.data;
    };

    const fetchApiTag = async () => {
        let json = await axios.get(`https://api.bachngocsach.vip/api/tag/${param.id}`);
        return json;
    };

    const fetchCardStory = async (page) => {
        const res = await fetch(`https://api.bachngocsach.vip/api/tag/${param.id}/story?per_page=10&page=${page}`);
        const data = await res.json();
        // console.log('data', data);
        return data;
    };

    const handlePageClick = async (data) => {
        scrollToElement();
        // console.log(data.selected);

        let page = data.selected + 1;

        const commentsFormServer = await fetchCardStory(page);

        setCardStory(commentsFormServer);

        // scroll to the top
        //window.scrollTo(0, 0)
    };

    useEffect(() => {
        fetchApi()
            .then((results) => {
                setCardStory(results);
            })
            .catch((err) => console.log(err));

        fetchApiTag()
            .then((results) => {
                setTag(results.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // console.log('tag', tag);

    return (
        <div className={cx('wrapper')}>
            <div ref={divRef} className={cx('tag-title')}>
                <h3>Tác Đại Thần</h3>
                <div className={cx('tab-categories-title')}>
                    <ul className={cx('tab-categories-title-list')}>
                        <li>
                            <a data-toggle="modal" data-target="#allCategory" to="[object Object]">
                                Thể loại
                            </a>
                        </li>
                        <li>
                            <a href="/truyen-hoan-thanh.html" class="">
                                Hoàn thành
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://bachngocsach.com.vn/reader/">
                                {' '}
                                Miễn phí
                            </a>
                        </li>
                        <li>
                            <a href="https://bachngocsach.com.vn/forum/" target="_blank">
                                {' '}
                                Diễn đàn{' '}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                style={{
                    marginTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
            >
                <div className={cx('section-stories')}>
                    <section>
                        <span>Mô tả</span>: {tag.desc}
                    </section>
                    <div className={cx('list-story')}>
                        {cardStory.data?.map((item, index) => {
                            return <CardStory item={item} key={index} />;
                        })}
                    </div>
                    {cardStory.total !== 0 ? (
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={cardStory.last_page}
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
                <div className={cx('card-stories')}>
                    <NewestStory
                        title="Truyen moi nhat"
                        marginbottom="20px"
                        name="truyen-moi-nhat"
                        api="https://api.bachngocsach.vip/api/story-newest?per_page=12"
                    />
                </div>
            </div>
        </div>
    );
}

export default Tag;
