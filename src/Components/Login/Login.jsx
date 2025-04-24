import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { mockLogin } from "../../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await mockLogin(values);
        localStorage.setItem('token', res.token);
        navigate('/tasks');
      } catch (err) {
        setErrors({ password: 'Invalid username or password' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-gray-300 p-10 rounded-[2rem] w-[400px] shadow-lg">
        <h2 className="text-center text-5xl font-semibold mb-10">Log In</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-2xl mb-2">
              Username :
            </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`w-full px-4 py-3 rounded-md border text-lg ${
                formik.touched.username && formik.errors.username
                  ? 'border-red-500'
                  : 'border-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-gray-600`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-2xl mb-2">
              Password :
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-4 py-3 rounded-md border text-lg ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : 'border-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-gray-600`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#3D3432] text-white px-8 py-2 rounded-md text-xl hover:bg-[#2d2625] transition"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
