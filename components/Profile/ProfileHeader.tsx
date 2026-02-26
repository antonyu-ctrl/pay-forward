import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    username: string;
}

export default function ProfileHeader({ username }: Props) {
    const router = useRouter();

    return (
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-20">
            {/* Left Box (Placeholder for alignment or specific action) */}
            <View className="w-8">
                <TouchableOpacity onPress={() => router.push('/feed/create')}>
                    <Feather name="plus-square" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Center: Username */}
            <View className="items-center justify-center">
                <Text className="text-lg font-bold text-gray-900 tracking-tight">{username}</Text>
            </View>

            {/* Right: Menu */}
            <View className="w-8 items-end">
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: '/(tabs)/settings',
                            params: { returnTo: '/(tabs)/profile' },
                        } as any)
                    }
                >
                    <Feather name="menu" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
