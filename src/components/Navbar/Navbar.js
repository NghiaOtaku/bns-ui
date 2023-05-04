import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

import NavbarItem from './NavbarItem';

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

function Navbar() {
    return (
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
    );
}

export default Navbar;
