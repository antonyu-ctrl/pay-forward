import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Platform, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { DESKTOP_BREAKPOINT } from '../../constants/Layout';
import { HOME_FEED_DATA } from '../../data/mockFeeds';
import ForwardBar from './ForwardBar';
import PayForwardFeedItem from './PayForwardFeedItem';

const HomeFeed = () => {
    const { width } = useWindowDimensions();
    const isDesktop = width >= DESKTOP_BREAKPOINT;
    const router = useRouter();

    return (
        <View
            className="flex-1 bg-gray-50 items-center"
            style={Platform.OS === 'web' ? { height: '100vh' as any } : { flex: 1 }}
        >
            <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden">
                {/* Header - Logo + Compose (desktop) */}
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 bg-white z-20">
                    <View className="w-10" />
                    <View className="flex-row items-center">
                        <View className="w-7 h-7 bg-sky-500 rounded-lg items-center justify-center mr-2">
                            <Ionicons name="heart" size={16} color="white" />
                        </View>
                        <Text className="text-lg font-bold text-gray-900 tracking-tight">PayForward</Text>
                    </View>
                    {isDesktop ? (
                        <TouchableOpacity
                            onPress={() => router.push('/feed/create')}
                            activeOpacity={0.7}
                        >
                            <Feather name="plus-square" size={24} color="#111827" />
                        </TouchableOpacity>
                    ) : (
                        <View className="w-10" />
                    )}
                </View>

                <View className="bg-white z-10">
                    <ForwardBar />
                </View>
                <FlatList
                    data={HOME_FEED_DATA}
                    keyExtractor={(item) => item.id!}
                    renderItem={({ item }) => (
                        <PayForwardFeedItem
                            id={item.id}
                            avatarUrl={item.avatarUrl}
                            username={item.username}
                            timeAgo={item.timeAgo}
                            mainImageUrl={item.mainImageUrl}
                            forwardedTo={item.forwardedTo}
                            caption={item.caption}
                            likesCount={item.likesCount}
                            replies={item.replies}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={Platform.OS !== 'web'}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                />
            </View>
        </View>
    );
};

export default HomeFeed;
