import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import Button from '~/components/Button';
import config from '~/config';
import { auth } from '~/firebase';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                alert('Signed in successfully');
                setTimeout(() => {
                    window.location.replace(`${config.routes.home}`);
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1>Dang nhap</h1>
                <form onSubmit={signIn}>
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
                    <Button type="submit">Dang nhap</Button>
                </form>
                <Button>
                    <p>Quen mat khau</p>
                </Button>
                <Button to={config.routes.signup}>
                    <p>Dang ki</p>
                </Button>
            </div>
        </div>
    );
}

export default Login;
