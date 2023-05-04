import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classNames from 'classnames/bind';
import styles from './EditorChoice.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function EditorChoice() {
    const slideRef = useRef();

    const [story, setStory] = useState([]);

    const fetchApi = async () => {
        let json = await axios.get('https://api.bachngocsach.vip/api/story-editor-choice?per_page=20');
        return json.data;
    };

    useEffect(() => {
        fetchApi()
            .then((results) => {
                setStory(results.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: 'ease-in',
        pauseOnHover: false,
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('editor-choice-title')}>
                <h4 className={cx('card-header')}>Bien tap vien lua chon</h4>
                <Button to="bien-tap-vien-lua-chon" className={cx('card-more')}>
                    Tat ca
                </Button>
            </div>
            <div className={cx('editor-choice-slides')}>
                <Slider ref={slideRef} {...settings}>
                    {story.map((item, index) => {
                        return (
                            <div key={index} className={cx('card-story')}>
                                <div className={cx('cover')}>
                                    <Image src={item.cover} className={cx('custom-zoom-img')} alt="Anh truyen" />
                                </div>
                                <h4>{item.name}</h4>
                                <p>{item.author.name}</p>
                            </div>
                        );
                    })}
                </Slider>
                <Button className={cx('prev-btn')} onClick={() => slideRef.current.slickPrev()}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faChevronLeft} />
                </Button>
                <Button className={cx('next-btn')} onClick={() => slideRef.current.slickNext()}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faChevronRight} />
                </Button>
            </div>
        </div>
    );
}

export default EditorChoice;
