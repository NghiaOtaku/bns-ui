import classNames from 'classnames/bind';
import styles from './Category.module.scss';

import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Category() {
    return (
        <div className={cx('wrapper')}>
            <Button to={`/tag/tac-dai-than`}>
                <Image src={images.tacdaithan} />
            </Button>
            <Button to={`top-ngoc-phieu`}>
                <Image src={images.topngocphieu} />
            </Button>
            <Button to={`truyen-thinh-hanh-trong-tuan`}>
                <Image src={images.thinhhanhtuan} />
            </Button>
            <Button to={`tag/doc-quyen`}>
                <Image src={images.docquyen} />
            </Button>
            <Button to={`truyen-hot`}>
                <Image src={images.truyenhot} />
            </Button>
            <Button to={`truyen-yeu-thich`}>
                <Image src={images.yeuthich} />
            </Button>
        </div>
    );
}

export default Category;
