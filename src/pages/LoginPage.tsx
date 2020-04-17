import React from "react";

import SessionLayout from "../components/layouts/SessionLayout";
import Login from "../features/session/Login";

const LoginPage: React.FC = () => {
    return (
        <SessionLayout>
            <Login />
        </SessionLayout>
    );
};

export default LoginPage;
