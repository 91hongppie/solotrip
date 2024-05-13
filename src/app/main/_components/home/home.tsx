'use client';
import styles from './home.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import HomeHead from '@/app/_components/HomeHeader/HomeHead';
import { ApolloError, gql, useMutation } from '@apollo/client';
import client, { LOGIN } from '@/app/_utils/apis/apollo-client';
import { currentUser } from '@/app/_stores/userStore';
import LoginForm from '@/app/_components/LoginForm/LoginForm';

export default function HomeComponent() {
    const { user } = currentUser();

    return (
        <>
            <HomeHead />
            {user.accessToken ? <AfterLogin userName={user.name} /> : <LoginForm />}
        </>
    );
}

const AfterLogin = (props: { userName?: string }) => {
    return <span className={styles.afterLogin}>{`${props.userName}님 환영합니다.`}</span>;
};
