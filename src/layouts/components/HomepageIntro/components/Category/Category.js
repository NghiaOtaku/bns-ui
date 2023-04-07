import classNames from 'classnames/bind';
import styles from './Category.module.scss';

import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Category() {
    return (
        <div className={cx('wrapper')}>
            <Image src={images.tacdaithan} />
            <Image src={images.topngocphieu} />
            <Image src={images.thinhhanhtuan} />
            <Image src={images.docquyen} />
            <Image src={images.truyenhot} />
            <Image src={images.yeuthich} />
        </div>
    );
}

export default Category;
