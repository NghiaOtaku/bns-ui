import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import dayjs from 'dayjs';
import { useState } from 'react';
import ShowMoreText from 'react-show-more-text';

import Button from '../Button/Button';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

const convertTime = (x) => dayjs(x).format('DD-MM-YYYY HH:mm:ss');

function ManyComment({ data, selected, indexComment }) {
    // console.log('ManyComment data', data);
    let dataStory;

    console.log('item selected', selected);
    console.log('item index', indexComment);
    console.log('test', selected.indexOf(indexComment));
    let y;

    selected.indexOf(indexComment) >= 0 ? (y = true) : (y = false);
    console.log('y', y);
    console.log('-------------------------------------------------------');

    data.length === 2 ? (dataStory = data) : (dataStory = data.slice(0, 3));

    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    };

    return !y
        ? dataStory.map((item, index) => {
              return (
                  <div key={index} className={cx('comments-item-user-rep-item-many')}>
                      <img
                          src={images.avatarDefault
                            //   item.user?.avatar === 'https://api.bachngocsach.vip/storage/'
                            //       ? images.avatarDefault
                            //       : item.user?.avatar
                          }
                          alt=""
                      />
                      <p>{item?.username}</p>
                      <div className={cx('comment-preview-content')}>{item?.content}</div>
                  </div>
              );
          })
        : data.map((item, index) => {
              return (
                  <div key={index} className={cx('comments-item-user-rep-item-once')}>
                      <div className={cx('comments-user-avatar')}>
                          <a href="/trang-ca-nhan/9455.html" className={cx('avatar')}>
                              <img
                                  src={images.avatarDefault
                                    //   item.user?.avatar === 'https://api.bachngocsach.vip/storage/'
                                    //       ? images.avatarDefault
                                    //       : item.user?.avatar
                                  }
                                  alt=""
                              ></img>
                          </a>
                      </div>
                      <div className={cx('user-comment-rep-content')}>
                          <h3 className={cx('user-comment-name')}>
                              <Button to="/trang-ca-nhan/9455.html" className={cx('user-info-link')}>
                                  {item?.username}
                              </Button>
                          </h3>
                          <div className={cx('rate-body')}>
                              <ShowMoreText
                                  lines={3}
                                  more="Xem them"
                                  less="An bot"
                                  className={cx('rate-body-content')}
                                  anchorClass={cx('show-more-less-btn')}
                                  onClick={executeOnClick}
                                  expanded={false}
                                  truncatedEndingComponent={'... '}
                              >
                                  <p className={cx('rate-content')}>{item?.content}</p>
                              </ShowMoreText>
                          </div>
                          <div className={cx('comment-action')}>
                              <span className={cx('comment-action-like')}>
                                  <FontAwesomeIcon className={cx('icon')} icon={faThumbsUp} />
                                  <span>{item?.like}</span>
                              </span>
                              <span className={cx('comment-action-rep')}>Trả lời</span>
                              <span className={cx('comment-action-time')}>{convertTime(item?.updated_at)}</span>
                          </div>
                      </div>
                  </div>
              );
          });
}

export default ManyComment;
