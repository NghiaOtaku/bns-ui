import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';

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

function Footer() {
    return (
        <footer className={cx('site-footer')}>
            <div className={cx('container')}>
                <div className={cx('get-app')}>
                    <button className={cx('get-app-btn')}>
                        <img src={images.andRoid} alt="Android" />
                    </button>
                    <button className={cx('get-app-btn')}>
                        <img src={images.iOS} alt="iOS" />
                    </button>
                </div>
                <div className={cx('group-name')}>
                    {support.map((item, index) => (
                        <button key={index} className={cx('link-support')}>
                            <p>{item.name}</p>
                        </button>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
