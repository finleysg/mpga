import React from 'react';
import Loading from './Loading';

export interface ILoadingContainerProps {
    hasData: boolean,
}

const LoadingContainer: React.FC<ILoadingContainerProps> = (props) => {
    return (
        <div>
            {props.hasData ? (
                <React.Fragment>
                    {props.children}
                </React.Fragment>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default LoadingContainer;
