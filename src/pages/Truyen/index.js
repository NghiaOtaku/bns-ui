import styles from './Truyen.module.scss';
import classNames from 'classnames/bind';

import HeroStory from './components/HeroStory';
import Button from '~/components/Button/Button';
import NewestStory from '../Home/components/NewestStory';
import SelectSection from './components/SelectSection';

const cx = classNames.bind(styles);

function Truyen() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <HeroStory />
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
                                <Button>
                                    <td className={cx('width-name', 'chapter-name')}>
                                        Chương 1440: Tiệm thuốc nhỏ ấm áp (4)
                                    </td>
                                    <td className={cx('width-time')}>1 ngày</td>
                                </Button>
                                <Button>
                                    <td className={cx('width-name', 'chapter-name')}>
                                        Chương 1440: Tiệm thuốc nhỏ ấm áp (4)
                                    </td>
                                    <td className={cx('width-time')}>1 ngày</td>
                                </Button>
                                <Button>
                                    <td className={cx('width-name', 'chapter-name')}>
                                        Chương 1440: Tiệm thuốc nhỏ ấm áp (4)
                                    </td>
                                    <td className={cx('width-time')}>1 ngày</td>
                                </Button>
                                <Button>
                                    <td className={cx('width-name', 'chapter-name')}>
                                        Chương 1440: Tiệm thuốc nhỏ ấm áp (4)
                                    </td>
                                    <td className={cx('width-time')}>1 ngày</td>
                                </Button>
                                <Button>
                                    <td className={cx('width-name', 'chapter-name')}>
                                        Chương 1440: Tiệm thuốc nhỏ ấm áp (4)
                                    </td>
                                    <td className={cx('width-time')}>1 ngày</td>
                                </Button>
                            </tbody>
                        </table>
                    </div>
                    <SelectSection />
                </div>
                <div className={cx('same-author')}>
                    <NewestStory
                        title="Truyen cung tac gia"
                        api="https://api.bachngocsach.vip/api/author/57/story"
                        view
                    />
                </div>
            </div>
        </div>
    );
}

export default Truyen;
