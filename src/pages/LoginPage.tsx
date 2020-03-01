import React from 'react';

import OneSmallColumn from '../components/layouts/OneSmallColumn';
import Login from '../features/session/Login';

const LoginPage: React.FC = () => {
    return (
        <OneSmallColumn>
            <Login />
        </OneSmallColumn>
    );
}

export default LoginPage;
