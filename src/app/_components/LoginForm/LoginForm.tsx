import { currentUser } from '@/app/_stores/userStore';
import client, { LOGIN } from '@/app/_utils/apis/apollo-client';
import { useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './LoginForm.module.css';
import { useContext, useRef } from 'react';
import ConfirmContext from '@/app/_context/confirm/confirmContext';

interface InputField {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { user, setUser } = currentUser();
    const { confirm } = useContext(ConfirmContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
    } = useForm<InputField>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [login] = useMutation(LOGIN, { client });
    const emailInputRef = useRef<HTMLInputElement>(null);
    const onSubmit: SubmitHandler<InputField> = async (inputData) => {
        try {
            const email = inputData.email;
            const password = inputData.password;
            const response = await login({
                variables: { loginInput: { email, password } },
            });
            setUser(response.data.login);
        } catch (error: any) {
            if (error.message == '비밀번호가 올바르지 않습니다.') {
                const result = await confirm({ message: '잘못된 로그인 정보입니다.', okMessage: '다시 확인하기' });
                setFocus('email');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.userInfoForm}>
            <div>
                <span className={styles.userInfoInputContainer}>이메일</span>
                <div style={{ height: '8px' }} />
                <input
                    {...register('email', { required: true })}
                    type="email"
                    className={styles.userInfoInput}
                    // ref={emailInputRef}
                    autoFocus
                    placeholder="email"
                />

                <div className={styles.errorMessageContainer}>
                    {errors.email && <span className={styles.errorMessage}>Email is required</span>}
                </div>
            </div>
            <div>
                <span className={styles.userInfoInputContainer}>비밀번호</span>
                <div style={{ height: '8px' }} />
                <input
                    {...register('password', { required: true })}
                    type="password"
                    className={styles.userInfoInput}
                    placeholder="password"
                />
                <div className={styles.errorMessageContainer}>
                    {errors.password && <span className={styles.errorMessage}>Password is required</span>}
                </div>
            </div>
            <div className={styles.loginButtonContainer}>
                <button className={styles.loginButton} type="submit" onSubmit={() => onSubmit}>
                    로그인
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
