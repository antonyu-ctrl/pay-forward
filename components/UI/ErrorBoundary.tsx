import { Feather } from '@expo/vector-icons';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    children: ReactNode;
    fallbackMessage?: string;
}

interface State {
    hasError: boolean;
}

export default class AppErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View className="flex-1 items-center justify-center p-6">
                    <Feather name="alert-circle" size={32} color="#9CA3AF" />
                    <Text className="text-gray-400 text-sm mt-3 text-center">
                        {this.props.fallbackMessage ?? 'Something went wrong.'}
                    </Text>
                    <TouchableOpacity
                        className="mt-4 px-4 py-2 bg-sky-500 rounded-lg"
                        onPress={() => this.setState({ hasError: false })}
                    >
                        <Text className="text-white font-medium text-sm">Try Again</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}
