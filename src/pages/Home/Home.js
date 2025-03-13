import classNames from 'classnames/bind';
import styles from './Home.module.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Story from './components/Story';
import NewestStory from './components/NewestStory/NewestStory';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('card-stories')}>
                {/* Newest Story */}
                <NewestStory
                    title="Truyen moi nhat"
                    marginbottom="20px"
                    name="truyen-moi-nhat"
                    api="https://ngocsach.com/api/story-newest?per_page=9"
                />

                {/* Latest Chapter api="https://api.bachngocsach.vip/api/latest-chapters?per_page=12"*/}
                <NewestStory
                    title="Chuong moi nhat"
                    chuong
                    name="chuong moi nhat"
                    api="https://ngocsach.com/api/latest-chapters?per_page=9"
                />
            </div>

            {/* <Story /> */}

            <Story />
        </div>
    );
}

export default Home;
