/* eslint-disable jsx-a11y/img-redundant-alt */
// import lib
import classNames from 'classnames/bind';
import { faBell } from '@fortawesome/free-regular-svg-icons';

//import local code
import styles from './Header.module.scss';
import Bookmark from '~/assets/images/bookmark.6b699b4c.png';
import DefaultAvatar from '~/assets/images/profile-avatar-default.png';
import Logo from '~/assets/images/logo.49128792.png';
import Search from '~/components/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarItem from '~/components/NavbarItems/NavbarItem';

const cx = classNames.bind(styles);

const NAVBAR_ITEMS_PUBLIC = [
    {
        title: 'The loai',
        active: true,
    },
    {
        title: 'Hoan thanh',
    },
    {
        title: 'Mien phi',
    },
    {
        title: 'Dien dan',
    },
];

const NAVBAR_ITEM_USER = [
    {
        title: 'Huong dan',
    },
    {
        title: 'Dang truyen',
    },
];

function Header() {
    return (
        <div className={cx('header')}>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    {/* Logo */}
                    <img src={Logo} alt="Logo Image" className={cx('logo-img')} />

                    {/* Search */}
                    <Search />

                    {/* action */}
                    <div className={cx('action')}>
                        <div className={cx('noti-box')}>
                            <FontAwesomeIcon className={cx('noti-icon')} icon={faBell} />
                        </div>
                        <div className={cx('my-story')}>
                            <img className={cx('bookmark-icon')} src={Bookmark} alt="bookmark" />
                        </div>
                        <div className={cx('profile')}>
                            <img className={cx('avatar-icon')} src={DefaultAvatar} alt="avatar" />
                        </div>
                    </div>
                </div>
            </header>
            <nav className={cx('nav-bar')}>
                <div className={cx('inner-navbar')}>
                    <div className={cx('navbar-public')}>
                        {NAVBAR_ITEMS_PUBLIC.map((item, index) => (
                            <NavbarItem key={index} data={item} />
                        ))}
                    </div>
                    <div className={cx('navbar-user')}>
                        {NAVBAR_ITEM_USER.map((item, index) => (
                            <NavbarItem key={index} data={item} />
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
