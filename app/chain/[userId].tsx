import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function ChainDetailScreen() {
    const { userId } = useLocalSearchParams();

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center">
            <Text className="text-xl font-bold text-gray-900">Chain Detail</Text>
            <Text className="text-gray-500 mt-2">Viewing activity for {userId}</Text>
        </SafeAreaView>
    );
}
