import styles from './SelectSection.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SelectSection() {
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
                <div data-v-3c4f2c38="" class="content">
                    <div data-v-3aaa45ef="" data-v-3c4f2c38="" className={cx('intro')}>
                        Vừa tỉnh khỏi giấc mộng, nhân thế luân hồi. Sau khi xuyên qua, Vương Yến phát hiện mình vậy mà
                        lại biến thành Vương Sinh trong 'Lao Sơn đạo sĩ'. Vương Sinh của lúc đầu, khát vọng cầu tiên học
                        đạo, tiếc rằng lại không chịu được khổ cực, vất vả lắm mới tập được một môn là thuật xuyên
                        tường, nhưng bởi vì tâm thuật bất chính mà dẫn đến pháp thuật mất linh, có thể nói là cười chết
                        người ta. Vương Yến của hôm nay, không cam chịu tầm thường, không sợ gian khổ, cơ duyên đến sẽ
                        lập tức nắm chặt, thuật xuyên tường nho nhỏ sao có thể xua đuổi được ta, tùy ý cho ngươi tôi
                        luyện, ta có đủ tự tin. Tu luyện đạo hạnh, học thuật pháp, luyện linh đan, cầu trường sinh ...
                        Chứng kiến qua vương triều rách nát, trải qua yêu ma loạn thế. Cổ tháp vẽ trên vách tường, lăng
                        miếu xinh đẹp, chợ ma quỷ ở hải ngoại .... Cõi bồng lai khó kiếm chốn trần gian, đạo sĩ cầm
                        kiếm, có thể giết yêu ma quỷ quái, khí phách trong ngực, dám hỏi bất bình trong thiên hạ! Hành
                        trình tu đạo thành Tiên của một nhân vật nhỏ. . .
                    </div>
                </div>
            )}
            {tabType === 'vote' && (
                <div>
                    <ul>
                        <li>Danh gia</li>
                    </ul>
                </div>
            )}
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
