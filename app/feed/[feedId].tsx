import { Feather, Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// ── Consolidated Mock Data Store ────────────────────────────
// All feeds from HomeFeed + Profile are stored here with unique IDs.
// In production this would come from a global store or API.
const ALL_FEEDS: Record<string, any> = {
    // ── HomeFeed items ──
    '1': {
        id: '1',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'community_roots',
        timeAgo: '2h ago',
        mainImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80',
        forwardedTo: '@alice',
        caption: 'Treated Alice to a warm coffee today. It\u2019s small, but it starts here. \u2615\ufe0f',
        likesCount: 24,
        replies: [
            {
                id: 'r1a',
                avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                username: 'alex_builder',
                timeAgo: '1h ago',
                caption: 'This is amazing! Keep it up! \ud83d\ude4c',
                likesCount: 3,
            },
            {
                id: 'r1b',
                avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                username: 'emily_h',
                timeAgo: '45m ago',
                caption: 'Love this chain of kindness! I want to join too!',
                likesCount: 1,
            },
        ],
    },
    '2': {
        id: '2',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'alex_builder',
        timeAgo: '5h ago',
        mainImageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80',
        forwardedTo: '@mark_k',
        caption: 'Passed on the kindness by helping Mark with his moving boxes. Paying it forward!',
        likesCount: 56,
        replies: [
            {
                id: '2a',
                avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                username: 'Anton_Yu',
                timeAgo: '4h',
                caption: 'Love seeing this! I was just talking to Mark yesterday.',
                likesCount: 12,
            },
        ],
    },
    '3': {
        id: '3',
        avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'sarah_writer',
        timeAgo: '1d ago',
        forwardedTo: '@community_center',
        caption: 'Just dropped off some books at the local community center. Reading can change lives! \ud83d\udcda\u2728 Hope they find good homes.',
        likesCount: 15,
        replies: [],
    },

    // ── Profile > Post (Thread) items ──
    '4': {
        id: '4',
        avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'Anton_Yu',
        timeAgo: '2h',
        forwardedTo: 'Sarah Jenkins',
        caption: 'Just bought coffee for the person behind me in line! Let\u2019s keep the kindness going. \u2615\ufe0f\u2728',
        likesCount: 15,
        replies: [],
    },
    '5': {
        id: '5',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'Jane_Doe',
        timeAgo: '4h',
        forwardedTo: 'Local Food Bank',
        caption: 'Dropped off some canned goods today. Small acts can make a big difference! \ud83e\udd6b',
        mainImageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80',
        likesCount: 34,
        replies: [
            {
                id: '5a',
                avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                username: 'Anton_Yu',
                timeAgo: '3h',
                forwardedTo: 'Community Center',
                caption: 'That is so awesome! I\u2019m going to do the same this weekend. Thanks for the inspiration!',
                likesCount: 5,
            },
        ],
    },
    '6': {
        id: '6',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        username: 'David_G',
        timeAgo: '5h',
        forwardedTo: 'City Park Cleanup',
        caption: 'Team effort! Collected 10 bags of trash from the park today \ud83c\udf31',
        likesCount: 89,
        replies: [
            {
                id: '6a',
                avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                username: 'Anton_Yu',
                timeAgo: '4h',
                forwardedTo: 'City Park Cleanup',
                caption: 'Great job out there! I am going to try and make it out next month if it happens again.',
                likesCount: 12,
            },
            {
                id: '6b',
                avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
                username: 'Emma_W',
                timeAgo: '2h',
                forwardedTo: 'City Park Cleanup',
                caption: 'I was there too! The park looks so much better now. Everyone did wonderful work.',
                likesCount: 5,
            },
        ],
    },

    // ── Profile > Following items ──
    '7': {
        id: '7',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
        username: 'Emma_W',
        timeAgo: '1h',
        forwardedTo: 'Local Animal Shelter',
        caption: 'Spent the morning walking dogs. They are all so sweet and need homes! \ud83d\udc36\u2764\ufe0f',
        mainImageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&q=80',
        likesCount: 112,
        replies: [],
    },
};

// ── Component ───────────────────────────────────────────────
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
                        <Image source={{ uri: feed.mainImageUrl }} className="w-full aspect-[4/3]" resizeMode="cover" />
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
