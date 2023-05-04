import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import Bookmark from '~/assets/images/bookmark.6b699b4c.png';
import Button from '../Button';

const cx = classNames.bind(styles);

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));

function ModalMode() {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className={cx('my-story')}>
            <img onClick={openModal} className={cx('bookmark-icon')} src={Bookmark} alt="bookmark" />
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className={cx('Modal')}
                contentLabel="Example Modal"
            >
                <div className={cx('modal-content')}>
                    <div className={cx('modal-header')}>
                        <h3>Tu truyen</h3>
                    </div>
                    <div className={cx('modal-body')}>
                        <h3>Trong</h3>
                    </div>
                    <div className={cx('modal-footer')}>
                        <Button>Danh sach day du</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

ReactDOM.render(<ModalMode />, document.getElementById('root'));

export default ModalMode;
