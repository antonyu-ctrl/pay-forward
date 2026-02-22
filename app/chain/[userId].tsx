import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChainDetailScreen() {
    const router = useRouter();
    const { userId } = useLocalSearchParams();

    const handleGoBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)/profile');
        }
    };

    return (
        <View
            className="flex-1 bg-gray-50 items-center"
            style={Platform.OS === 'web' ? ({ height: '100%' } as any) : { flex: 1 }}
        >
            <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden flex flex-col">
                <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                        <TouchableOpacity onPress={handleGoBack} className="w-8">
                            <Feather name="arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-lg font-bold text-gray-900">Chain Detail</Text>
                        <View className="w-8" />
                    </View>

                    {/* Content */}
                    <View className="flex-1 items-center justify-center p-4">
                        <Text className="text-xl font-bold text-gray-900">Chain Activity</Text>
                        <Text className="text-gray-500 mt-2">Viewing activity for {userId}</Text>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
}

