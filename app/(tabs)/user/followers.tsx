import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    doIFollow,
    getUsersByIds,
    MockUser,
    MY_FOLLOWERS,
    MY_USER_ID,
} from '../../../data/mockUsers';

export default function FollowersScreen() {
    const router = useRouter();
    const { userId } = useLocalSearchParams<{ userId: string }>();
    const [searchQuery, setSearchQuery] = useState('');

    const isMyProfile = !userId || userId === MY_USER_ID;
    const followers = isMyProfile ? getUsersByIds(MY_FOLLOWERS) : [];
    const title = isMyProfile ? 'Followers' : `${userId}'s Followers`;

    const filteredFollowers = useMemo(() => {
        if (!searchQuery.trim()) return followers;
        const q = searchQuery.toLowerCase();
        return followers.filter(
            (user) =>
                user.name.toLowerCase().includes(q) ||
                user.username.toLowerCase().includes(q)
        );
    }, [followers, searchQuery]);

    return (
        <View
            className="flex-1 bg-white items-center"
            style={Platform.OS === 'web' ? ({ height: '100%' } as any) : { flex: 1 }}
        >
            <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden flex flex-col">
                <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                        <TouchableOpacity onPress={() => router.back()} className="w-8">
                            <Feather name="arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-lg font-bold text-gray-900">{title}</Text>
                        <View className="w-8" />
                    </View>

                    {/* Search Box */}
                    <View className="px-4 py-3 bg-white border-b border-gray-100">
                        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2.5">
                            <Feather name="search" size={18} color="#9CA3AF" />
                            <TextInput
                                className="flex-1 ml-2 text-sm text-gray-900"
                                placeholder="Search"
                                placeholderTextColor="#9CA3AF"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery('')}>
                                    <Feather name="x-circle" size={16} color="#9CA3AF" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Followers List */}
                    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                        {filteredFollowers.map((follower) => (
                            <FollowerItem
                                key={follower.id}
                                user={follower}
                                iFollowThem={doIFollow(follower.id)}
                                onPress={() => {
                                    if (follower.id === MY_USER_ID) {
                                        router.push('/(tabs)/profile');
                                    } else {
                                        router.push({ pathname: '/user/[userId]', params: { userId: follower.id } } as any);
                                    }
                                }}
                            />
                        ))}

                        {filteredFollowers.length === 0 && (
                            <View className="items-center justify-center py-20">
                                <Feather name="users" size={48} color="#D1D5DB" />
                                <Text className="text-gray-400 mt-4 text-base">
                                    {searchQuery ? 'No matching followers' : 'No followers yet'}
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
}

interface FollowerItemProps {
    user: MockUser;
    iFollowThem: boolean;
    onPress: () => void;
}

function FollowerItem({ user, iFollowThem, onPress }: FollowerItemProps) {
    return (
        <TouchableOpacity
            className="flex-row items-center px-4 py-3 border-b border-gray-50"
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Image
                source={{ uri: user.avatar }}
                className="w-12 h-12 rounded-full bg-gray-200"
            />
            <View className="flex-1 ml-3">
                <Text className="font-bold text-gray-900 text-[15px]">{user.name}</Text>
                <Text className="text-gray-500 text-sm">@{user.username}</Text>
            </View>
            {iFollowThem ? (
                <View className="bg-gray-100 px-4 py-2 rounded-full">
                    <Text className="text-sm font-semibold text-gray-700">Following</Text>
                </View>
            ) : (
                <TouchableOpacity className="bg-sky-500 px-4 py-2 rounded-full">
                    <Text className="text-sm font-bold text-white">Follow</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
}
