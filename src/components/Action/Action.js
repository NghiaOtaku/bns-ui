import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';

//import local code
import images from '~/assets/images';
import styles from './Action.module.scss';
import DefaultAvatar from '~/assets/images/profile-avatar-default.png';
import config from '~/config';
import Button from '~/components/Button/Button';
import { faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
// import { auth } from '~/firebase';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import ModalMode from '../Modal';

const cx = classNames.bind(styles);

function Action() {
    const [currentUser, setCurrentUser] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleNoti, setVisibleNoti] = useState(false);
    const [noti, setNoti] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        } else {
            setCurrentUser(false);
        }
    }, []);

    const userSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(false);
        window.location.reload();
    };

    const BOX_LINK = [
        {
            name: 'Trang ca nhan',
            slug: '/trang-ca-nhan',
        },
        {
            name: 'Them tien thach',
            slug: '/trang-ca-nhan/chon-phuong-thuc-thanh-toan',
        },
        {
            name: 'Chi tiet tai khoan',
            slug: '/trang-ca-nhan',
        },
        {
            name: 'Nhap gift code',
            slug: '/trang-ca-nhan/nhap-gift-code',
        },
        {
            name: 'Dang xuat',
            logout: true,
        },
    ];

    return (
        <>
            {currentUser ? (
                <div className={cx('action')}>
                    <div>
                        <HeadlessTippy
                            interactive={true}
                            visible={visibleNoti}
                            render={(attrs) => (
                                <div className={cx('noti-menu')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                        <div className={cx('card-noti')}>
                                            <div className={cx('card-title')}>
                                                <p>Thong bao Vip-Reader</p>
                                                <small>Danh dau da doc</small>
                                            </div>
                                            <div className={cx('card-list')}>
                                                {noti ? (
                                                    <div>
                                                        <p className={cx('no-noti')}>Hien khong co thong bao nao!!</p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {/* Fetch API noti */}
                                                        {noti.map((item, index) => (
                                                            <li className={cx('have-noti')} key={index}>
                                                                <p>{item}</p>
                                                            </li>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <div className={cx('noti-box')}>
                                <FontAwesomeIcon
                                    onClick={() => setVisibleNoti(!visibleNoti)}
                                    className={cx('noti-icon')}
                                    icon={faBell}
                                />
                            </div>
                        </HeadlessTippy>
                    </div>

                    {/* Mystory-Modal */}
                    <ModalMode />

                    <div>
                        <HeadlessTippy
                            interactive={true}
                            visible={visible}
                            placement="bottom-end"
                            onClickOutside={() => setVisible(false)}
                            render={(attrs) => (
                                <div className={cx('box-option')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                        <div className={cx('container')}>
                                            <div className={cx('box-info')}>
                                                <img className={cx('box-avatar')} src={DefaultAvatar} alt="" />
                                                <div className={cx('info-user')}>
                                                    <h3>{currentUser.username}</h3>
                                                    <p>
                                                        <span>user</span>
                                                    </p>
                                                    <div className={cx('tien-thach')}>
                                                        <div className={cx('tien-thach-icon')}>
                                                            <img src={images.tienthach} alt="" />
                                                        </div>
                                                        <div className={cx('tien-thach-info')}>
                                                            <p>
                                                                <span>Tien thach: 0.00</span>
                                                            </p>
                                                            <p>
                                                                <span>Tien thach KM: 0.00</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('box-link')}>
                                                {BOX_LINK.map((item, index) => {
                                                    return (
                                                        <Button
                                                            onClick={item.logout && userSignOut}
                                                            to={item.logout ? item.slug : null}
                                                            className={cx('box-link-item')}
                                                            key={index}
                                                        >
                                                            {item.name}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <div className={cx('profile')}>
                                <img
                                    onClick={() => setVisible(!visible)}
                                    className={cx('avatar-icon')}
                                    src={DefaultAvatar}
                                    alt="avatar"
                                />
                            </div>
                        </HeadlessTippy>
                    </div>

                    {/* <Button onClick={userSignOut}>Dang xuat</Button> */}
                </div>
            ) : (
                <div className={cx('action')}>
                    {/* Mystory Modal */}
                    <ModalMode />

                    <Button
                        to={config.routes.signin}
                        className={cx('sign-in')}
                        leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                    >
                        <p>Dang nhap</p>
                    </Button>
                    <Button
                        to={config.routes.signup}
                        className={cx('sign-up')}
                        leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                    >
                        <p>Dang ky</p>
                    </Button>
                </div>
            )}
        </>
    );
}

export default Action;
