import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function MyForwardScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center">
            <Text className="text-xl font-bold text-gray-900">My Forward Dashboard</Text>
            <Text className="text-gray-500 mt-2">Track your impact here.</Text>
        </SafeAreaView>
    );
}
