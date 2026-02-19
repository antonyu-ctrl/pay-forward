import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AnimatedGradientBorder from '../UI/AnimatedGradientBorder';

interface Props {
    user: {
        name: string;
        avatar: string;
        stats: {
            posts: number;
            followers: number;
            following: number;
        };
        bio: string;
        hasActiveChain?: boolean;
    };
}

export default function ProfileInfo({ user }: Props) {
    const router = useRouter();

    return (
        <View className="px-4 py-4 bg-white">
            {/* Top Row: Avatar & Stats */}
            <View className="flex-row items-center justify-between mb-6">
                {/* Avatar with Status Ring (Blue for Active Chain) */}
                <TouchableOpacity
                    onPress={() => {
                        if (user.hasActiveChain) {
                            router.push('/(tabs)/my-forward');
                        }
                    }}
                    activeOpacity={0.8}
                    className="items-center justify-center"
                >
                    {user.hasActiveChain ? (
                        <AnimatedGradientBorder
                            size={88}
                            borderWidth={3}
                            colors={['#0369A1', '#38BDF8', '#E0F2FE', '#38BDF8', '#0369A1']}
                        >
                            <Image
                                source={{ uri: user.avatar }}
                                className="w-[80px] h-[80px] rounded-full border-2 border-white"
                            />
                        </AnimatedGradientBorder>
                    ) : (
                        <View className="p-[3px] rounded-full bg-transparent">
                            <View className="bg-white p-[2px] rounded-full">
                                <Image
                                    source={{ uri: user.avatar }}
                                    className="w-20 h-20 rounded-full"
                                />
                            </View>
                        </View>
                    )}

                    {/* Optional: Add a small indicator icon if needed */}
                    {user.hasActiveChain && (
                        <View className="absolute bottom-1 right-1 bg-sky-500 rounded-full p-1 border-2 border-white">
                            <Feather name="zap" size={12} color="white" />
                        </View>
                    )}
                </TouchableOpacity>

                {/* Stats */}
                <View className="flex-1 flex-row justify-around ml-4">
                    <View className="items-center">
                        <Text className="text-lg font-bold text-gray-900">{user.stats.posts}</Text>
                        <Text className="text-xs text-gray-500">Posts</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-lg font-bold text-gray-900">{user.stats.followers}</Text>
                        <Text className="text-xs text-gray-500">Followers</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-lg font-bold text-gray-900">{user.stats.following}</Text>
                        <Text className="text-xs text-gray-500">Following</Text>
                    </View>
                </View>
            </View>

            {/* Bio Section */}
            <View className="mb-6">
                <Text className="font-bold text-gray-900 text-base mb-1">{user.name}</Text>
                <Text className="text-gray-600 text-sm leading-5">
                    {user.bio}
                </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row space-x-2">
                <TouchableOpacity className="flex-1 bg-gray-100 py-2.5 rounded-lg items-center active:opacity-70">
                    <Text className="font-bold text-sm text-gray-900">Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-100 p-2.5 rounded-lg items-center justify-center active:opacity-70">
                    <Feather name="user-plus" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
