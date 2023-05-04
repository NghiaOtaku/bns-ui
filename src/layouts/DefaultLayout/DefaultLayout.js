import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import HomepageIntro from '~/layouts/components/HomepageIntro';
import EditorChoice from '../components/EditorChoice/EditorChoice';
import Footer from '~/layouts/components/Footer';
import Navbar from '~/components/Navbar';

console.log(Navbar);

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Navbar />
            <HomepageIntro />
            <EditorChoice />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
