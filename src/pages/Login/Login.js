import React, { useState } from 'react';
import axios from '~/utils/axiosInstance';
import logo from '~/assets/images/logo.49128792.png';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);

            const { token, ...user } = res.data;
            localStorage.setItem('token', token);            
            localStorage.setItem('user', JSON.stringify(user));
            alert('Đăng nhập thành công!');
            window.location.href = '/'; // hoặc dùng useNavigate nếu bạn xài React Router
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại!');
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="container max-w-[570px] rounded-[15px] bg-white/50 text-center shadow-lg dark:bg-[#1c1c1d] dark:shadow-jade-500">
                <div className="flex items-center justify-center pt-6">
                    <a className="flex items-center" href="/">
                        <img src={logo} alt="Bạch Ngọc Sách Logo" className="h-[40px]" />
                    </a>
                </div>
                <h1 className="pt-2 text-jade-500 text-2xl font-semibold">Đăng nhập</h1>

                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                <form className="space-y-6 p-[2rem] pb-[1rem]" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <input
                            className="text-md flex h-12 w-full rounded-md border border-[#ced4da] bg-transparent px-3 py-2 placeholder:text-slate-400 focus-visible:border-jade-400 focus-visible:outline-none focus-visible:ring-1 ring-jade-400"
                            placeholder="Vui lòng nhập tên đăng nhập hoặc email"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <input
                            className="text-md flex h-12 w-full rounded-md border border-[#ced4da] bg-transparent px-3 py-2 placeholder:text-slate-400 focus-visible:border-jade-400 focus-visible:outline-none focus-visible:ring-1 ring-jade-400"
                            placeholder="Vui lòng nhập mật khẩu"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-jade-300 bg-transparent text-jade-500 hover:bg-jade-500 hover:text-white transition-colors"
                    >
                        Đăng nhập
                    </button>
                </form>

                <div className="flex justify-center gap-2 pb-[1rem] text-base">
                    <button type="button" className="hover:text-jade-500">
                        Quên mật khẩu?
                    </button>
                    <a className="font-semibold text-jade-500" href="/dang-ki">
                        Đăng ký
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
