import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    username: string;
}

export default function UserProfileHeader({ username }: Props) {
    const router = useRouter();

    return (
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-20">
            {/* Left: Back Button */}
            <View className="w-8">
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Center: Username (User ID) */}
            <View className="items-center justify-center">
                <Text className="text-lg font-bold text-gray-900 tracking-tight">{username}</Text>
            </View>

            {/* Right: Menu */}
            <View className="w-8 items-end">
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
