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
                {/* NewestStory */}
                <NewestStory
                    title="Truyen moi nhat"
                    marginbottom="20px"
                    name="truyen-moi-nhat"
                    api="https://api.bachngocsach.vip/api/story-newest?per_page=12"
                />

                {/* Newest Chapter api="https://api.bachngocsach.vip/api/latest-chapters?per_page=12"*/}
                <NewestStory
                    title="Chuong moi nhat"
                    chuong
                    name="chuong moi nhat"
                    api="https://api.bachngocsach.vip/api/latest-chapters?per_page=12"
                />
            </div>

            {/* <Story /> */}

            <Story />
        </div>
    );
}

export default Home;
