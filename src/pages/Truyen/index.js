import Image from '~/components/Image';
import styles from './Truyen.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Truyen() {
    return (
        <div>
            <h2>Truyen page</h2>
            <div className={cx('cover')}>
                <Image className={cx('custom-image-cpn')} src={images[5]} alt="123" />
            </div>
        </div>
    );
}

export default Truyen;
