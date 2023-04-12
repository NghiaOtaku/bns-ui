import { useState, useEffect } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './HomepageIntro.module.scss';
import Category from './components/Category';
import Info from './components/Info';

const cx = classNames.bind(styles);

function HomepageIntro() {
    const [slide, setSlide] = useState(0);
    const [story, setStory] = useState([]);
    const [image, setImage] = useState('');

    // api https://api.bachngocsach.vip/api/sliders

    const fetchApi = async () => {
        let json = await axios.get('https://api.bachngocsach.vip/api/sliders');
        return json.data;
    };

    useEffect(() => {
        fetchApi()
            .then((results) => {
                setStory(results.data);
                return results.data;
            })
            .catch((err) => console.log(err));
    }, []);

    // setImage(story[0].image);
    // console.log(story[0].image);

    // useEffect(() => {
    //     const handleTest = setInterval(() => {
    //         setSlide((prev) => {
    //             if (prev < 3) {
    //                 setImage(story[prev + 1].image);
    //                 return prev + 1;
    //             } else {
    //                 setImage(story[0].image);
    //                 return (prev = 0);
    //             }
    //         });
    //     }, 3000);
    //     return () => clearInterval(handleTest);
    // }, [story]);

    // console.log(image);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('intro-category')}>
                <Category />
            </div>
            <div className={cx('intro-slides')}>
                <div className={cx('img-slides')}>
                    <img className={cx('img-tag-slides')} src={image || story[0]?.image} alt={`Anh truyen`} />
                </div>
                <div className={cx('text-slides')}>
                    {story.map((item, index) => {
                        return (
                            <div
                                className={cx('text-tag-slides', slide === index ? 'active' : '')}
                                key={index}
                                onClick={() => {
                                    setSlide(index);
                                    setImage(item.image);
                                }}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={cx('intro-infor')}>
                <Info />
            </div>
        </div>
    );
}

export default HomepageIntro;
