import React from 'react';
import { Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <View className="flex-1 bg-gray-50 items-center" style={Platform.OS === 'web' ? { height: '100vh' } : { flex: 1 }}>
                <View className="w-full max-w-md bg-white shadow-sm overflow-hidden flex-1">
                    {/* Header */}
                    <View className="items-center justify-center py-3 border-b border-gray-100 bg-white z-20">
                        <Text className="text-lg font-bold text-gray-900 tracking-tight">Search</Text>
                    </View>

                    <View className="flex-1 items-center justify-center">
                        <Text className="text-gray-400">Search functionality coming soon</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
