// import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
// import images from '~/assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames';

const Image = forwardRef(({ src, alt, className, ...props }, ref) => {
    // const [fallback, setFallback] = useState('');

    // const hanldeError = () => {
    //     setFallback(customFallback);
    // };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={src}
            alt={alt}
            {...props}
            // onError={hanldeError}
        />
    );
});

// Image.propTypes = {
//     src: PropTypes.string,
//     alt: PropTypes.string,
//     className: PropTypes.string,
//     fallback: PropTypes.string,
// };

export default Image;
