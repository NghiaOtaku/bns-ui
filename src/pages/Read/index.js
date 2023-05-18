import styles from './Read.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

import ReadFree from './ReadFree';
import ReadFee from './ReadFee';
import Comment from '~/components/Comment';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Read() {
    const params = useParams();
    const location = useLocation();
    const data = location.state;

    console.log('data:', data);

    const [amountChapterFree, setAmountChapterFree] = useState(50);
    // const [chapter, setChapter] = useState([]);
    const [listChapter, setListChapter] = useState([]);
    // const [page, setPage] = useState(chapter.chapter_number);
    const [idNextChapters, setIdNextChapters] = useState();
    const [idPrevChapters, setIdPrevChapters] = useState();
    const [slugNextChapters, setSlugNextChapters] = useState('');
    const [slugPrevChapters, setSlugPrevChapters] = useState('');

    //api chapter https://api.bachngocsach.vip/api/chapter/95822
    //api story  https://api.bachngocsach.vip/api/story/304

    const page = Math.ceil((data.chapter_number + 1) / 50);
    const stt = Math.floor(data.chapter_number % 50);

    console.log('page', page);
    console.log('stt', stt);

    const fetchApiStory = async () => {
        let json = await axios.get(`https://api.bachngocsach.vip/api/story/${params.idStory}`);
        setAmountChapterFree(json.data.amount_free_chapters);
        return json.data;
    };

    useEffect(() => {
        fetchApiStory()
            .then((results) => results)
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`https://api.bachngocsach.vip/api/story/${params.idStory}/chapter?per_page=50&page=${page}&order_by=asc`)
            .then((res) => res.json())
            .then((res) => res.chapters.data)
            .then((res) => {
                setListChapter(res);
                setIdNextChapters(res.filter((x) => x.chapter_number === location.state.chapter_number + 1)[0].id);
                setSlugNextChapters(res.filter((x) => x.chapter_number === location.state.chapter_number + 1)[0]?.slug);
                setIdPrevChapters(res.filter((x) => x.chapter_number === location.state.chapter_number - 1)[0].id);
                setSlugPrevChapters(res.filter((x) => x.chapter_number === location.state.chapter_number - 1)[0].slug);
            });
    }, [data]);

    console.log('data', data);
    console.log('idNextChapter', idNextChapters);
    console.log('slugNextChapter', slugNextChapters);
    console.log('================================amountchapterfree', amountChapterFree);
    console.log('================================chapternow', location.state.chapter_number);

    return location.state.chapter_number <= amountChapterFree ? (
        <>
            <ReadFree
                page={page}
                stt={stt}
                listChapter={listChapter}
                idNextChapters={idNextChapters}
                idPrevChapters={idPrevChapters}
                slugNextChapters={slugNextChapters}
                slugPrevChapters={slugPrevChapters}
                data={data}
                params={params}
            />
            <Comment data={data} idStory={params.idStory} />
        </>
    ) : (
        <>
            <ReadFee
                page={page}
                stt={stt}
                listChapter={listChapter}
                idNextChapters={idNextChapters}
                idPrevChapters={idPrevChapters}
                slugNextChapters={slugNextChapters}
                slugPrevChapters={slugPrevChapters}
                data={data}
                params={params}
            />
            <Comment data={data} idStory={params.idStory} />
            {/* <div className={cx('info-story-interaction')}>
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
            </div> */}
        </>
    );
}

export default Read;
