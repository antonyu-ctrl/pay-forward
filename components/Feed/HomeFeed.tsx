import React from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import ForwardBar from './ForwardBar';
import PayForwardFeedItem from './PayForwardFeedItem';

// Dummy Data
const FEED_DATA = [
    {
        id: '1',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
        username: 'community_roots',
        timeAgo: '2h ago',
        mainImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        forwardedTo: '@alice',
        caption: 'Treated Alice to a warm coffee today. It’s small, but it starts here. ☕️',
        likesCount: 24,
    },
    {
        id: '2',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
        username: 'alex_builder',
        timeAgo: '5h ago',
        mainImageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        forwardedTo: '@mark_k',
        caption: 'Passed on the kindness by helping Mark with his moving boxes. Paying it forward!',
        likesCount: 56,
    },
];

import { Ionicons } from '@expo/vector-icons'; // Added import

// ... imports

const HomeFeed = () => {
    return (
        <View
            className="flex-1 bg-gray-50 items-center"
            style={Platform.OS === 'web' ? { height: '100vh' as any } : { flex: 1 }}
        >
            <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden">
                {/* Mobile Header - Centered Logo */}
                <View className="items-center justify-center py-3 border-b border-gray-100 bg-white z-20">
                    <View className="flex-row items-center">
                        <View className="w-7 h-7 bg-sky-500 rounded-lg items-center justify-center mr-2">
                            <Ionicons name="heart" size={16} color="white" />
                        </View>
                        <Text className="text-lg font-bold text-gray-900 tracking-tight">PayForward</Text>
                    </View>
                </View>

                <View className="bg-white z-10">
                    <ForwardBar />
                </View>
                <FlatList
                    data={FEED_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PayForwardFeedItem
                            avatarUrl={item.avatarUrl}
                            username={item.username}
                            timeAgo={item.timeAgo}
                            mainImageUrl={item.mainImageUrl}
                            forwardedTo={item.forwardedTo}
                            caption={item.caption}
                            likesCount={item.likesCount}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default HomeFeed;
