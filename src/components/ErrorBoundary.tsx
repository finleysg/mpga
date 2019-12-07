import React from 'react';

export interface IErrorState {
    hasError: boolean
}

export default class ErrorBoundary extends React.Component<any, IErrorState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    public static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    public render() {
        if (this.state.hasError) {
            return <p>Loading failed! Please reload.</p>;
        }

        return this.props.children;
    }
}
