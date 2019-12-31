import React from 'react';

import OneCenteredColumn from '../components/layouts/OneCenteredColumn';
import Login from '../features/session/Login';

const LoginPage: React.FC = () => {
    return (
        <OneCenteredColumn>
            <Login />
        </OneCenteredColumn>
    );
}

export default LoginPage;
