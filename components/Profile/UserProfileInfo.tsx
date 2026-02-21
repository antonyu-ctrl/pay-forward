import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AnimatedGradientBorder from '../UI/AnimatedGradientBorder';

interface Props {
    user: {
        username: string;
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
    activeTab: string;
    onTabChange: (tab: any) => void;
    isFollower: boolean; // whether this user has relationship with me
}

export default function UserProfileInfo({ user, activeTab, onTabChange, isFollower }: Props) {
    const router = useRouter();

    // Determine available tabs based on relationship
    const tabs = isFollower
        ? (['Post', 'Following', 'Media'] as const)
        : (['Post', 'Media'] as const);

    return (
        <View className="px-4 py-4 bg-white">
            {/* Top Row: Avatar & Stats */}
            <View className="flex-row items-center justify-between mb-6">
                {/* Avatar with Status Ring */}
                <View className="items-center justify-center">
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

                    {user.hasActiveChain && (
                        <View className="absolute bottom-1 right-1 bg-sky-500 rounded-full p-1 border-2 border-white">
                            <Feather name="zap" size={12} color="white" />
                        </View>
                    )}
                </View>

                {/* Stats */}
                <View className="flex-1 flex-row justify-around ml-4">
                    <View className="items-center">
                        <Text className="text-lg font-bold text-gray-900">{user.stats.posts}</Text>
                        <Text className="text-xs text-gray-500">Posts</Text>
                    </View>
                    <TouchableOpacity
                        className="items-center"
                        onPress={() => router.push({ pathname: '/user/followers', params: { userId: user.username } } as any)}
                    >
                        <Text className="text-lg font-bold text-gray-900">{user.stats.followers}</Text>
                        <Text className="text-xs text-gray-500">Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="items-center"
                        onPress={() => router.push({ pathname: '/user/following', params: { userId: user.username } } as any)}
                    >
                        <Text className="text-lg font-bold text-gray-900">{user.stats.following}</Text>
                        <Text className="text-xs text-gray-500">Following</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bio Section */}
            <View className="mb-6">
                <Text className="font-bold text-gray-900 text-base mb-1">{user.name}</Text>
                <Text className="text-gray-600 text-sm leading-5">
                    {user.bio}
                </Text>
            </View>

            {/* Action Buttons — Impact + Direct Message, evenly split */}
            <View className="flex-row gap-2">
                <TouchableOpacity className="flex-1 bg-sky-500 py-2.5 rounded-lg items-center active:opacity-70">
                    <Text className="font-bold text-sm text-white">{user.username}'s Impact</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row bg-sky-500 py-2.5 rounded-lg items-center justify-center active:opacity-70 gap-1.5">
                    <Feather name="send" size={16} color="white" />
                    <Text className="font-bold text-sm text-white">Message</Text>
                </TouchableOpacity>
            </View>

            {/* Profile Tabs — conditionally show Following tab */}
            <View className="flex-row mt-4 pt-1 border-b border-gray-100 pb-0">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            className={`flex-1 items-center pb-3 ${isActive ? 'border-b-2 border-sky-500' : ''}`}
                            onPress={() => onTabChange(tab)}
                        >
                            <Text className={`text-sm ${isActive ? 'font-bold text-gray-900' : 'font-medium text-gray-400'}`}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
