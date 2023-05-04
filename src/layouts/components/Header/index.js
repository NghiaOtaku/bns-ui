/* eslint-disable jsx-a11y/img-redundant-alt */
// import lib
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

//import local code
import styles from './Header.module.scss';
import Logo from '~/assets/images/logo.49128792.png';
import Search from '~/components/Search';
import config from '~/config';
import Action from '~/components/Action';

const cx = classNames.bind(styles);

function Header() {
    return (
        // <div className={cx('header')}>
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
        // </div>
    );
}

export default Header;
