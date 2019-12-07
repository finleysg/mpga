import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading: React.FC = () => {
    return (
        <Spinner animation="grow" variant="secondary" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
}

export default Loading;
