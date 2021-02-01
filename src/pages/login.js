import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { AuthContext } from '../context/auth-context';
import axios from '../axiosConfig';

const loginSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const authContext = useContext(AuthContext);
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const submitCredentials = async credentials => {
    try {
      setLoginLoading(true);
      console.log('authenticating')
      const { data } = await axios.post(
        `api-auth/login/`, credentials
      );

      console.log({data})

    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "daniel@danielrb.dev",
      password: "popo",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      submitCredentials(values)
    },
  });

  return (
    <Container maxWidth="sm">
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};


export default Login