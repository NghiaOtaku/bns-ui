import styles from './Truyen.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import vi from 'dayjs/locale/vi';

import HeroStory from './components/HeroStory';
import Button from '~/components/Button/Button';
import NewestStory from '../Home/components/NewestStory';
import SelectSection from './components/SelectSection';
import Comment from '~/components/Comment';

const cx = classNames.bind(styles);

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale(vi);

function Truyen() {
    const location = useLocation();

    let data = location.state;

    console.log('data', data);

    let idStory = data?.story_id || data?.id || '';
    let idAuthor = data.story?.author?.id || data?.author?.id || '';
    const [story, setStory] = useState([]);
    const [newChapter, setNewChapter] = useState([]);

    const fromNow = (x) => {
        return dayjs(x).fromNow();
    };

    const fetchApi = async (url) => {
        let json = await axios.get(url);
        return json.data;
    };

    fetch('https://ngocsach.com/api/chapter/count-view/772273', {
        method: 'POST', // Chuyển sang phương thức POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ /* các tham số cần thiết */ }) // Thêm dữ liệu vào body nếu API yêu cầu
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));

    useEffect(() => {
        fetchApi(`https://ngocsach.com/api/story-by-slug/${data.slug}`)
            .then((results) => {
                // window.location.reload();
                setStory(results);
            })
            .catch((err) => console.log(err));
    }, [data]);

    useEffect(() => {
        fetchApi(`https://ngocsach.com/api/story/${data.id}/5-chapters-newest?order_by=desc`)
            .then((results) => {
                // window.location.reload();
                setNewChapter(results);
            })
            .catch((err) => console.log(err));
    }, [data]);

    // console.log('story', story);

    let idAuthor2 = idAuthor || story.author_id;

    // console.log('idAuthor2', idAuthor2);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <HeroStory dataStory={story} />
            </div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '12px',
                }}
            >
                <div className={cx('detail-content')}>
                    <div className={cx('content')}>
                        <table>
                            <thead>
                                <tr>
                                    <th className={cx('width-name')}>Chuong moi</th>
                                    <th className={cx('width-time', 'hide')}>Thoi gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newChapter.data?.map((item, index) => {
                                    return (
                                        <Button
                                            dataStory={item}
                                            key={index}
                                            to={`/dich/${data.slug}/${item.story_id}/${item.slug}/${item.id}`}
                                            className={cx('table-row')}
                                        >
                                            <td className={cx('width-name', 'chapter-name')}>{item.name}</td>
                                            <td className={cx('width-time')}>{fromNow(item.publish_at)}</td>
                                        </Button>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <SelectSection data={story} idStory={idStory} />
                    <Comment data={data} idStory={idStory} />
                </div>
                <div className={cx('same-author')}>
                    <NewestStory
                        title="Truyện cùng tác giả"
                        api={`https://ngocsach.com/api/author/${idAuthor2}/story`}
                        view
                    />
                </div>
            </div>
        </div>
    );
}

export default Truyen;
