import classNames from 'classnames/bind';
import styles from './NavbarItem.module.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function NavbarItem({ data = [] }) {
    const isActive = !!data.active;
    if (isActive) {
        return (
            <div className={cx('nav-btn-active', 'nav-btn')}>
                <FontAwesomeIcon className={cx('action-icon')} icon={faBars} />
                <p className={cx('navbar-title')}>{data.title}</p>
            </div>
        );
    } else {
        return (
            <div className={cx('nav-btn')}>
                <p className={cx('navbar-title')}>{data.title}</p>
            </div>
        );
    }
}

export default NavbarItem;
