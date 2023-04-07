import classNames from 'classnames/bind';
import styles from './Info.module.scss';

import images from '~/assets/images';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const POLICY_LINK = [
    {
        name: 'Thong tin moi',
    },
    {
        name: 'Dang ki dich',
    },
    {
        name: 'Dang ki sang tac',
    },
    {
        name: 'Review truyen',
    },
];

function Info() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('policy-card-title')}>
                <h5>Thong tin - tien ich</h5>
            </div>
            <div className={cx('policy')}>
                <ul className={cx('policy-link')}>
                    {POLICY_LINK.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
                <div className={cx('link-app')}>
                    <Image src={images.andRoid} alt="Anh" />
                    <Image src={images.iOS} alt="Anh" />
                </div>
                <button className={cx('support')}>Phan hoi - Gop y</button>
            </div>
        </div>
    );
}

export default Info;
