import styles from './Read.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

import ReadFree from './ReadFree';
import ReadFee from './ReadFee';
import Comment from '~/components/Comment';

const cx = classNames.bind(styles);

function Read() {
    const { storyName, chapterNumber: chapterParam } = useParams();
    const location = useLocation();

    const initialData = location.state;
    const chapterNumber = parseInt(chapterParam?.split('-')[1]);
    const [chapterData, setChapterData] = useState(initialData || null);
    const [storyData, setStoryData] = useState(null);
    const [chapterContent, setChapterContent] = useState(null);
    const nextChapterNumber = chapterNumber + 1;
    const prevChapterNumber = chapterNumber - 1;
    // const [slugNext, setSlugNext] = useState('');
    // const [slugPrev, setSlugPrev] = useState('');
    // const [idNext, setIdNext] = useState(null);
    // const [idPrev, setIdPrev] = useState(null);

    const page = Math.ceil((chapterData?.chapter_number + 1) / 50);
    const stt = chapterData?.chapter_number % 50;

    // Fetch full chapter content
    const fetchChapterContent = async () => {
        try {
            const res = await axios.get(
                `https://reader.be-web-vip.com/api/stories/${storyName}/chapters/${chapterNumber}`,
            );
            const data = res.data?.data;
            if (data) {
                setChapterData(data);
                setChapterContent(data); // nếu sau này cần dùng encrypted `content`
            }
        } catch (err) {
            console.error('Lỗi lấy chapter:', err);
        }
    };

    // Fetch story info (to get amount_free_chapters)
    const fetchStoryData = async () => {
        try {
            const res = await axios.get(`https://ngocsach.com/api/story-by-slug/${storyName}`);
            setStoryData(res.data);
        } catch (err) {
            console.error('Lỗi lấy story:', err);
        }
    };

    // Fetch 50 chapters để lấy next/prev chapter slug
    // const fetchChapterList = async () => {
    //     try {
    //         const res = await fetch(
    //             `https://api.bachngocsach.vip/api/story/${idStory}/chapter?per_page=50&page=${page}&order_by=asc`,
    //         );
    //         const json = await res.json();
    //         const chapters = json.chapters?.data || [];
    //         setListChapter(chapters);

    //         const next = chapters.find((ch) => ch.chapter_number === chapterData.chapter_number + 1);
    //         const prev = chapters.find((ch) => ch.chapter_number === chapterData.chapter_number - 1);

    //         setIdNext(next?.id);
    //         setSlugNext(next?.slug || '');
    //         setIdPrev(prev?.id);
    //         setSlugPrev(prev?.slug || '');
    //     } catch (err) {
    //         console.error('Lỗi lấy danh sách chapter:', err);
    //     }
    // };

    useEffect(() => {
        fetchChapterContent();
    }, [storyName, chapterNumber]);

    useEffect(() => {
        if (chapterData) {
            fetchStoryData();
            // fetchChapterList();
        }
    }, [chapterData]);

    if (!chapterData || !storyData) return <p>Đang tải...</p>;

    const isFree = chapterNumber <= 50;

    const ReaderComponent = isFree ? ReadFree : ReadFee;

    return (
        <>
            <ReaderComponent
                page={page}
                stt={stt}
                nextChapterNumber={nextChapterNumber}
                prevChapterNumber={prevChapterNumber}
                data={storyData}
                dataChapter={chapterData}
                params={{ storyName, chapterNumber: chapterParam }}
            />
            <Comment data={chapterData} idStory={storyData?.id} />
        </>
    );
}

export default Read;
