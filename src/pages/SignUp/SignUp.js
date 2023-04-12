import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/firebase';

import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SignUp() {
    const [fullName, setFullName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1>Dang ky</h1>
                <form onSubmit={signUp}>
                    <input
                        type="text"
                        placeholder="Nhap ho va ten"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nhap ten dang nhap"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nhap email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Nhap mat khau"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Dang ki</button>
                </form>
                <Button to={config.routes.signin}>
                    <p>Dang nhap</p>
                </Button>
            </div>
        </div>
    );
}

export default SignUp;
