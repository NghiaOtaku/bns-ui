import styles from './SelectSection.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

import Rating from './Rating';

const cx = classNames.bind(styles);

function SelectSection({ data }) {
    const [tabType, setTabType] = useState('introduce');
    // const [vote, setVote] = useState(false);
    // const [listChapters, setListChapters] = useState(false);

    return (
        <>
            <div className={cx('select-section')}>
                <div
                    className={cx('select-section-item', tabType === 'introduce' ? 'current' : '')}
                    onClick={() => setTabType('introduce')}
                >
                    Giới thiệu
                </div>
                <div
                    className={cx('select-section-item', tabType === 'vote' ? 'current' : '')}
                    onClick={() => setTabType('vote')}
                >
                    Đánh giá
                </div>
                <div
                    className={cx('select-section-item', tabType === 'listChapter' ? 'current' : '')}
                    onClick={() => setTabType('listChapter')}
                >
                    <span className="d-none d-md-inline">Danh sách chương</span>
                </div>
                <div className={cx('select-section-item')}>Bình luận</div>
            </div>
            {tabType === 'introduce' && (
                <div class="content">
                    <div className={cx('intro')}>{data.desc}</div>
                </div>
            )}
            {tabType === 'vote' && <Rating data={data} />}
            {tabType === 'listChapter' && (
                <div>
                    <ul>
                        <li>Danh sach chuong</li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default SelectSection;
