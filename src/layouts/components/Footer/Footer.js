import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const support = [
    {
        name: 'Dieu khoan dich vu',
    },
    {
        name: 'Ban quyen',
    },
    {
        name: 'Chinh sach bao mat',
    },
    {
        name: 'Lien he',
    },
];

const replaceStr = (x) => {
    return x.toLowerCase().replaceAll(' ', '-');
};

function Footer() {
    return (
        <footer className={cx('site-footer')}>
            <div className={cx('container')}>
                <div className={cx('get-app')}>
                    <Button
                        href="https://play.google.com/store/apps/details?id=vip.bachngocsach.app&pli=1"
                        className={cx('get-app-btn')}
                        target="_blank"
                    >
                        <img src={images.andRoid} alt="Android" />
                    </Button>
                    <Button
                        href="https://apps.apple.com/vn/app/b%E1%BA%A1ch-ng%E1%BB%8Dc-s%C3%A1ch/id1672932706"
                        className={cx('get-app-btn')}
                        target="_blank"
                    >
                        <img src={images.iOS} alt="iOS" />
                    </Button>
                </div>
                <div className={cx('group-name')}>
                    {support.map((item, index) => (
                        <Button to={replaceStr(item.name)} key={index} className={cx('link-support')}>
                            <p>{item.name}</p>
                        </Button>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
