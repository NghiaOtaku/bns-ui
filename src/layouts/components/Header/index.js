/* eslint-disable jsx-a11y/img-redundant-alt */
// import lib
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

//import local code
import styles from './Header.module.scss';
import Logo from '~/assets/images/logo.49128792.png';
import Search from '~/components/Search';
import NavbarItem from '~/components/NavbarItems/NavbarItem';
import config from '~/config';
import Action from '~/components/Action';

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
                    <Link className={cx('logo-img')} to={config.routes.home}>
                        <img src={Logo} alt="Logo Image" />
                    </Link>

                    {/* Search */}
                    <Search />

                    {/* action */}
                    <Action />
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
