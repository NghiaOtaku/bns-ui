import classNames from 'classnames/bind';
import styles from './Read.module.scss';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faBook,
    faList,
    faHandHoldingHeart,
    faStar,
    faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { faClock, faEdit, faFileWord } from '@fortawesome/free-regular-svg-icons';

import Button from '~/components/Button';
import Image from '~/components/Image';
import ListChapter from '../Truyen/components/ListChapter/ListChapter';

const cx = classNames.bind(styles);

function ReadFree({
    page,
    stt,
    nextChapterNumber,
    prevChapterNumber,
    data: dataStory,
    params,
    dataChapter,
}) {
    const [reader, setReader] = useState([]);
    const [toggleListChaptersTop, setToggleListChaptersTop] = useState(false);
    const [toggleListChaptersBottom, setToggleListChaptersBottom] = useState(false);
    const divRef = useRef();
    // const [idNextChapters, setIdNextChapters] = useState(0);
    // const [slugNextChapters, setSlugNextChapters] = useState('');

    console.log('dataReadFree', dataStory);
    console.log('paramsReadFree', params);
    console.log('dataChapterFree', dataChapter);

    // const fetchApiStory = async () => {
    //     let json = await axios.get(`https://ngocsach.com/api/story-by-slug/${params.storyName}`);
    //     return json.data;
    // };

    // const fetchApiChapter = async () => {
    //     let json = await axios.get(`https://api.bachngocsach.vip/api/chapter/${params.idChapter}}`);
    //     return json;
    // };
    // const fetchApiReader = async () => {
    //     let json = await axios.get(`https://api.bachngocsach.vip/api/readers/${params.idChapter}?per_page=50&page=1`);
    //     return json;
    // };

    // useEffect(() => {
    //     fetchApiStory()
    //         .then((results) => {
    //             setStory(results);
    //         })
    //         .catch((err) => console.log(err));

    //     fetchApiChapter()
    //         .then((results) => {
    //             setChapter(results.data);
    //         })
    //         .catch((err) => console.log(err));

    //     fetchApiReader()
    //         .then((results) => {
    //             setReader(results.data);
    //         })
    //         .catch((err) => console.log(err));
    // }, [data]);

    // useEffect(() => {
    //     fetch(`https://api.bachngocsach.vip/api/story/${params.idStory}/chapter?per_page=50&page=1&order_by=asc`)
    //         .then((res) => res.json())
    //         .then((res) => res.chapters.data)
    //         .then((res) => {
    //             setListChapter(res);
    //             setIdNextChapters(res.filter((x) => x.chapter_number === location.state.chapter_number + 1)[0].id);
    //             setSlugNextChapters(res.filter((x) => x.chapter_number === location.state.chapter_number + 1)[0].slug);
    //         });
    // }, [data]);

    // console.log('idNextChapter', idNextChapters);
    // console.log('slugNextChapter', slugNextChapters);
    // console.log('--------------------------------listchapter', listChapter);


    // const fetchNextChapter = async () => {
    //     const res = await fetch(`https://api.bachngocsach.vip/api/chapter/${idNextChapters}}`);
    //     const data = await res.json();
    //     console.log(data);
    //     return data;
    // };

    // fetchNextChapter();

    // const handlePageClick = async () => {
    //     // console.log(data.selected);

    //     const commentsFormServer = await fetchNextChapter();

    //     setChapter(commentsFormServer);

    //     // scroll to the top
    //     //window.scrollTo(0, 0)
    // };

    const breadcrumbs = [
        <Link style={{ fontSize: '14px' }} key="1" href="/" color="#000">
            <Button to="/">Trang chu</Button>
        </Link>,
        <Link style={{ fontSize: '14px' }} underline="hover" color="#000" href="/" key="2">
            <Button to={`/truyen/${dataStory.slug}`} dataStory={dataStory}>
                {dataStory?.name}
            </Button>
        </Link>,
        // <Link style={{ fontSize: '14px' }} underline="hover" color="#000" key="3">
        //     <Button dataStory={story} to={`/truyen/${story?.slug}`}>
        //         {story?.name}
        //     </Button>
        // </Link>,
        <Typography style={{ fontSize: '14px' }} key="4" color="#6c757d">
            {dataChapter?.name}
        </Typography>,
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('chapter-detail')}>
                <Breadcrumbs className={cx('bread-crumbs')} separator="/" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        marginTop: '12px',
                        marginBottom: '12px',
                        width: '100%',
                        height: '47.5px',
                    }}
                >
                    <div ref={divRef}>
                        <Button
                            dataStory={dataStory}
                            to={`/dich/${dataStory.slug}/chuong-${prevChapterNumber}`}
                            className={cx('btn-breadcrumbs', stt === 1 ? 'disabled' : '')}
                        >
                            <FontAwesomeIcon className={cx('icon')} icon={faAngleLeft} />
                            Chuong truoc
                        </Button>
                    </div>
                    <Button
                        onClick={() => setToggleListChaptersTop(!toggleListChaptersTop)}
                        className={cx('btn-breadcrumbs-list')}
                    >
                        <FontAwesomeIcon icon={faList} />
                    </Button>
                    <div>
                        <Button
                            dataStory={dataStory}
                            to={`/dich/${dataStory.slug}/chuong-${nextChapterNumber}`}
                            className={cx('btn-breadcrumbs')}
                        >
                            Chuong sau
                            <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                        </Button>
                    </div>
                </div>
                {toggleListChaptersTop ? (
                    <div className={cx('toggle-list-chapter')}>
                        <ListChapter
                            divRef={divRef}
                            page={page}
                            onClick={() => {
                                setToggleListChaptersTop(!toggleListChaptersTop);
                                setToggleListChaptersBottom(false);
                            }}
                            data={dataStory}
                            idStory={dataStory.id}
                        />
                    </div>
                ) : (
                    <></>
                )}
                <div className={cx('wiki-content')}>
                    <h1 className={cx('chapter-title')}>{dataChapter?.name}</h1>
                    <ul
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}
                    >
                        <li
                            style={{
                                width: '100%',
                            }}
                        >
                            <p style={{ fontSize: '18px' }}>
                                <FontAwesomeIcon style={{ marginRight: '4px' }} icon={faBook} />
                                {dataStory?.name}
                            </p>
                        </li>
                        <li
                            style={{
                                marginRight: '10px',
                            }}
                        >
                            <p style={{ fontSize: '18px' }}>
                                <FontAwesomeIcon icon={faEdit} />
                                {dataStory?.author?.name}
                            </p>
                        </li>
                        <li
                            style={{
                                fontSize: '18px',
                                marginRight: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faFileWord} />
                            {dataChapter?.words}
                        </li>
                        <li
                            style={{
                                fontSize: '18px',
                                marginRight: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faClock} /> {dataChapter?.created_at}
                        </li>
                    </ul>
                    {/* {chapter.chapter?.info ? <div className={cx('chapter-info')}>{chapter.chapter?.info}</div> : <></>} */}
                    {/* {chapter.chapter?.embed_link ? (
                        <div className={cx('embed')}>
                            <iframe
                                src={chapter.chapter.embed_link}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen="allowfullscreen"
                            ></iframe>
                        </div>
                    ) : (
                        <></>
                    )} */}
                    <div id="chapter-id" style={{ position: 'relative', marginTop: '16px' }}>
                        <div className={cx('chapter-content')}>
                            <span class="webkit-chapter">{dataChapter?.public_content}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('read-interaction')}>
                <Button>
                    <div className={cx('read-interaction-item')}>
                        <FontAwesomeIcon icon={faHandHoldingHeart} />
                        <span>Ung ho</span>
                    </div>
                </Button>
                <Button>
                    <div className={cx('read-interaction-item')}>
                        <FontAwesomeIcon icon={faStar} />
                        <span>Danh gia</span>
                    </div>
                </Button>
                <Button>
                    <div className={cx('read-interaction-item')}>
                        <FontAwesomeIcon icon={faMoneyBill} />
                        <span>De cu</span>
                    </div>
                </Button>
            </div>
            <div className={cx('more-info')}>
                <p>{`${dataChapter?.contributor?.username}, ${dataChapter?.created_at}`}</p>
                <p>Lượt xem: {dataChapter?.views}</p>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginTop: '12px',
                    marginBottom: '12px',
                    width: '100%',
                    height: '47.5px',
                }}
            >
                <div>
                    <Button
                        dataStory={dataStory}
                        to={`/dich/${dataStory.slug}/chuong-${prevChapterNumber}`}
                        className={cx('btn-breadcrumbs', stt === 1 ? 'disabled' : '')}
                    >
                        <FontAwesomeIcon className={cx('icon')} icon={faAngleLeft} />
                        Chuong truoc
                    </Button>
                </div>
                <Button
                    onClick={() => setToggleListChaptersBottom(!toggleListChaptersBottom)}
                    className={cx('btn-breadcrumbs-list')}
                >
                    <FontAwesomeIcon icon={faList} />
                </Button>
                <div>
                    <Button
                        dataStory={dataStory}
                        to={`/dich/${dataStory.slug}/chuong-${nextChapterNumber}`}
                        className={cx('btn-breadcrumbs')}
                    >
                        Chuong sau
                        <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                    </Button>
                </div>
            </div>
            {toggleListChaptersBottom ? (
                <div className={cx('toggle-list-chapter')}>
                    <ListChapter
                        page={page}
                        onClick={() => {
                            setToggleListChaptersBottom(!toggleListChaptersBottom);
                            setToggleListChaptersTop(false);
                        }}
                        data={dataStory}
                        idStory={dataStory.id}
                    />
                </div>
            ) : (
                <></>
            )}
            {reader.data ? (
                <div className={cx('thanks-viewer')}>
                    <p>
                        Cám ơn:
                        {reader.data?.map((item, index) => {
                            return <span key={index}>{`${item?.username}, `}</span>;
                        })}
                    </p>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ReadFree;
