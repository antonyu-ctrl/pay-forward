import { Feather, Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Image } from 'expo-image';
import { ALL_FEEDS } from '../../data/mockFeeds';

export default function FeedDetailScreen() {
    const { feedId } = useLocalSearchParams<{ feedId: string }>();
    const router = useRouter();
    const feed = ALL_FEEDS[feedId ?? ''] ?? ALL_FEEDS['1'];
    const replies = feed.replies ?? [];

    const renderHeader = () => (
        <View>
            {/* Original Feed */}
            <View className="bg-white px-4 py-3 border-b border-gray-100">
                {/* Author Row */}
                <View className="flex-row items-center mb-2">
                    <Image source={{ uri: feed.avatarUrl }} className="w-10 h-10 rounded-full bg-gray-200" />
                    <View className="ml-3 flex-1">
                        <View className="flex-row items-center">
                            <Text className="font-bold text-gray-900 text-[15px]">{feed.username}</Text>
                            <Text className="text-gray-500 text-[14px] ml-1">@{feed.username.toLowerCase()} · {feed.timeAgo}</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Feather name="more-horizontal" size={18} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                {/* Forwarded Badge */}
                <View className="flex-row items-center mb-1.5">
                    <Ionicons name="arrow-redo" size={13} color="#0EA5E9" />
                    <Text className="text-gray-500 text-xs ml-1.5">
                        Forwarded to <Text className="font-medium text-gray-700">{feed.forwardedTo}</Text>
                    </Text>
                </View>

                {/* Caption */}
                <Text className="text-gray-900 text-[15px] leading-5 mb-2.5">{feed.caption}</Text>

                {/* Image */}
                {feed.mainImageUrl && (
                    <View className="w-full rounded-2xl overflow-hidden border border-gray-100 mb-3 bg-gray-100">
                        <Image source={{ uri: feed.mainImageUrl }} className="w-full aspect-[4/3]" contentFit="cover" />
                    </View>
                )}

                {/* Action Bar */}
                <View className="flex-row items-center justify-between mt-1 pr-2">
                    <View className="flex-row items-center gap-6">
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => router.push({ pathname: '/feed/reply', params: { feedId: feed.id, username: feed.username } })}
                        >
                            <Feather name="message-circle" size={18} color="#6B7280" />
                            <Text className="text-gray-500 text-xs ml-1.5">{replies.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <Feather name="repeat" size={18} color="#6B7280" />
                            <Text className="text-gray-500 text-xs ml-1.5">2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <Ionicons name="heart-outline" size={19} color="#6B7280" />
                            <Text className="text-gray-500 text-xs ml-1.5">{feed.likesCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <Feather name="bookmark" size={18} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity className="flex-row items-center">
                        <Feather name="share" size={18} color="#6B7280" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Replies Section Header */}
            {replies.length > 0 && (
                <View className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <Text className="text-sm font-semibold text-gray-700">Replies</Text>
                </View>
            )}
        </View>
    );

    const renderReply = ({ item }: { item: any }) => (
        <View className="bg-white px-4 py-3 border-b border-gray-100">
            <View className="flex-row">
                <Image source={{ uri: item.avatarUrl }} className="w-9 h-9 rounded-full bg-gray-200 mr-3" />
                <View className="flex-1">
                    <View className="flex-row items-center mb-0.5">
                        <Text className="font-bold text-gray-900 text-[14px]">{item.username}</Text>
                        <Text className="text-gray-500 text-[13px] ml-1">· {item.timeAgo}</Text>
                    </View>
                    <Text className="text-gray-500 text-[13px] mb-1">
                        Replying to <Text className="text-sky-500">@{feed.username.toLowerCase()}</Text>
                    </Text>
                    <Text className="text-gray-900 text-[14px] leading-5">{item.caption}</Text>
                    {/* Reply Action Bar */}
                    <View className="flex-row items-center gap-5 mt-2">
                        <TouchableOpacity className="flex-row items-center">
                            <Feather name="message-circle" size={15} color="#6B7280" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <Feather name="repeat" size={15} color="#6B7280" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <Ionicons name="heart-outline" size={16} color="#6B7280" />
                            <Text className="text-gray-500 text-xs ml-1">{item.likesCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <Feather name="share" size={15} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View
            className="flex-1 bg-gray-50 items-center"
            style={Platform.OS === 'web' ? { height: '100vh' as any } : { flex: 1 }}
        >
            <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden">
                {/* Hide default Stack header */}
                <Stack.Screen options={{ headerShown: false }} />

                {/* Custom Header — uses same px-4 as content for aligned margins */}
                <View className="flex-row items-center px-4 py-3 border-b border-gray-100 bg-white">
                    <TouchableOpacity onPress={() => router.back()} className="mr-3">
                        <Feather name="arrow-left" size={22} color="#111827" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-gray-900">Post</Text>
                </View>

                <FlatList
                    data={replies}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={renderHeader}
                    renderItem={renderReply}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}
