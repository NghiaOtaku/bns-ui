import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ListChapter.module.scss';
import classNames from 'classnames/bind';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import vi from 'dayjs/locale/vi';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale(vi);

console.log(dayjs.locale());

function ListChapter({ page = 1, data = {}, idStory, divRef = {}, onClick = () => {} }) {
    console.log('formNow', dayjs('2023-01-01').fromNow());
    const fromNow = (x) => {
        let time = x;
        return dayjs(time).fromNow();
    };

    const [chapter, setChapter] = useState([]);
    // console.log('divRef', divRef);
    const scrollToElement = () => divRef.current?.scrollIntoView();

    useEffect(() => {
        fetch(`https://api.bachngocsach.vip/api/story/${idStory}/chapter?per_page=50&page=${page}&order_by=asc`)
            .then((res) => res.json())
            .then((res) => res.chapters)
            .then((res) => setChapter(res));
    }, [data]);

    // console.log('chapter', chapter);

    const fetchChapter = async (page) => {
        const res = await fetch(
            `https://api.bachngocsach.vip/api/story/${idStory}/chapter?per_page=50&page=${page}&order_by=asc`,
        );
        const data = await res.json();
        return data.chapters;
    };

    const handlePageClick = async (data) => {
        scrollToElement();
        console.log('dataselected', data.selected);

        let page = data.selected + 1;

        const commentsFormServer = await fetchChapter(page);

        setChapter(commentsFormServer);

        // scroll to the top
        //window.scrollTo(0, 0)
    };

    return (
        <div className={cx('chapters-table')}>
            {/*Title  */}

            <div className={cx('chapters-table-title')}>
                <div className={cx('sort-btn')}>
                    <input type="checkbox" name="order_by" id="order-by" />
                    <label for="order-by">Mới nhất</label>
                </div>
                <div className={cx('open-btn')}>
                    <button>
                        <span className={cx('v-btn__content')}>
                            <p>Mở Combo/Full</p>
                        </span>
                    </button>
                    <div class="v-dialog__container"></div>
                </div>
            </div>

            {/* Table */}
            <table className={cx('list-table')}>
                <thead className={cx('thead-dark')}>
                    <tr>
                        <th className={cx('width-stt', 'text-center')}>STT</th>
                        <th className={cx('width-name')}>Tựa Chương</th>
                        <th className={cx('width-time text-center')}>
                            <FontAwesomeIcon icon={faClock} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {chapter.data?.map((item, index) => {
                        // setTime(fromNow(item.publish_at));
                        return (
                            <Button
                                onClick={onClick}
                                key={index}
                                dataStory={item}
                                to={`/dich/${item.slug}/${item.story_id}/${item.slug}/${item.id}`}
                                className={cx('table-row')}
                            >
                                <td className={cx('text-center', 'width-stt')}>{item.chapter_number}</td>
                                <td className={cx('width-name')}>{item.name}</td>
                                <td className={cx('width-time')}>{fromNow(item.publish_at)}</td>
                            </Button>
                        );
                    })}
                </tbody>
            </table>
            {chapter?.last_page ? (
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={chapter.last_page}
                    initialPage={page - 1}
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

export default ListChapter;
