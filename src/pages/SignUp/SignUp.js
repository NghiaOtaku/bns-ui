import React, { useState } from 'react';
import logo from '~/assets/images/logo.49128792.png';
import axios from '~/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
    });

    const [error, setError] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const navigate = useNavigate();

    // Hàm tạo slug từ username
    const slugify = (str) =>
        str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'confirmPassword') {
            setPasswordMismatch(value !== formData.password);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        try {
            await axios.post('/api/auth/register', {
                username: formData.username,
                fullname: formData.fullname,
                email: formData.email,
                password: formData.password,
                role_id: 2,
                slug: slugify(formData.username),
                role_list: [{ name: formData.role }],
            });

            alert('Đăng ký thành công!');
            setError('');
            setFormData({
                username: '',
                fullname: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'user',
            });
            setPasswordMismatch(false);

            // Chuyển hướng đến trang đăng nhập
            navigate('/dang-nhap');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center pt-3">
                    <a className="flex items-center" href="/">
                        <img src={logo} alt="Bạch Ngọc Sách Logo" height="40" className="h-[40px]" />
                    </a>
                </div>
                <h2 className="text-2xl font-semibold mb-6 text-center">Đăng ký tài khoản</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Tên đăng nhập"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Họ và tên"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Địa chỉ Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                        {passwordMismatch && <p className="text-red-500 text-sm mt-1">Mật khẩu nhập lại không khớp</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
