// import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
} from '@mui/material';
import { useLoginMutation } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/common/Gemini_Generated_Image_ceaxu4ceaxu4ceax (1).svg";
import loginBg from "../../assets/common/Gemini_Generated_Image_ceaxu4ceaxu4ceax.png";
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../validation';



type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await login(data).unwrap();
            console.log(result, " login result");

         
            const { accessToken, refreshToken, user } = result.result;

           
            dispatch(setCredentials({ user, accessToken, refreshToken }));

            if (user.role === 'customer') {
                navigate('/dashboard');
            } else {
                navigate('/store');
            }
        } catch (err: any) {
            console.error('Login failed:', err);
        }
    };


    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: `url(${loginBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={6}
                sx={{ p: 4, width: 400, borderRadius: 3, textAlign: 'center' }}
            >
                {/* Logo */}
                <Box mb={2}>
                    <img src={logo} alt="App Logo" style={{ width: '120px' }} />
                </Box>

                <Typography variant="h5" gutterBottom>
                    Welcome Back
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isLoading}
                        sx={{ mt: 2 }}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                        Don’t have an account? <Link to="/signup">Sign Up</Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
