import classNames from 'classnames/bind';
import styles from './Info.module.scss';

import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';

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

const replaceStr = (x) => {
    return x.toLowerCase().replaceAll(' ', '-');
};

function Info() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('policy-card-title')}>
                <h5>Thong tin - tien ich</h5>
            </div>
            <div className={cx('policy')}>
                <ul className={cx('policy-link')}>
                    {POLICY_LINK.map((item, index) => (
                        <Button key={index} to={replaceStr(item.name)}>
                            <li>{item.name}</li>
                        </Button>
                    ))}
                </ul>
                <div className={cx('link-app')}>
                    <Button
                        href="https://play.google.com/store/apps/details?id=vip.bachngocsach.app&pli=1"
                        target="_blank"
                    >
                        <Image src={images.andRoid} alt="Anh" />
                    </Button>
                    <Button
                        href="https://apps.apple.com/vn/app/b%E1%BA%A1ch-ng%E1%BB%8Dc-s%C3%A1ch/id1672932706"
                        target="_blank"
                    >
                        <Image src={images.iOS} alt="Anh" />
                    </Button>
                </div>
                <Button href="https://www.messenger.com/t/100012657404220/" className={cx('support')} target="_blank">
                    Phan hoi - Gop y
                </Button>
            </div>
        </div>
    );
}

export default Info;
