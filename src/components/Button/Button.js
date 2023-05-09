import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    prefix,
    type = false,
    tag = false,
    small = false,
    large = false,
    text = false,
    disabled = false,
    rounded = false,
    dataStory = {},
    leftIcon,
    rightIcon,
    children,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        delete props.onClick;
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        type,
        tag,
        text,
        small,
        large,
        disabled,
        rounded,
        prefix,
    });
    return (
        <Comp className={classes} {...props} state={dataStory}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

// Button.propTypes = {
//     to: PropTypes.string,
//     href: PropTypes.string,
//     primary: PropTypes.bool,
//     outline: PropTypes.bool,
//     small: PropTypes.bool,
//     large: PropTypes.bool,
//     text: PropTypes.bool,
//     disabled: PropTypes.bool,
//     rounded: PropTypes.bool,
//     leftIcon: PropTypes.node,
//     rightIcon: PropTypes.node,
//     children: PropTypes.node.isRequired,
//     className: PropTypes.string,
//     onClick: PropTypes.func,
// };

export default Button;
