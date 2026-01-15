import React, { type ReactNode } from "react";
import ErrorPage from "./ErrorPage";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: (args: {
        error: Error;
        resetError: () => void;
    }) => ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}


class ErrorBoundary extends React.PureComponent<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }


    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return {
            hasError: true,
            error,
        };
    }


    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        const isDev =
            typeof process !== "undefined" &&
            (process as any).env &&
            (process as any).env.NODE_ENV === "development";

        if (isDev) {
            console.group('🔴 ErrorBoundary caught an error');
            console.error('Error:', error);
            console.error('Error Message:', error.message);
            console.error('Component Stack:', errorInfo.componentStack);
            console.groupEnd();
        }

        this.setState({ errorInfo })
    }

    resetError = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render(): ReactNode {
        const { hasError, error } = this.state;
        const { fallback, children } = this.props;

        if (hasError && error) {

            if (typeof fallback === "function") {
                return fallback({
                    error,
                    resetError: this.resetError,
                });
            }

            return <ErrorPage error={error} resetError={this.resetError} />
        }

        return children;
    }
}

export default ErrorBoundary;
