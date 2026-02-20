import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface FeedItemProps {
    avatarUrl: string;
    username: string;
    timeAgo: string;
    mainImageUrl?: string; // Optional for text-only posts
    forwardedTo: string; // Changed back to single string (1 Feed = 1 Person)
    caption: string;
    likesCount?: number;
}

const PayForwardFeedItem: React.FC<FeedItemProps> = ({
    avatarUrl,
    username,
    timeAgo,
    mainImageUrl,
    forwardedTo,
    caption,
    likesCount = 0,
}) => {
    return (
        <View className="bg-white border-b border-gray-100 flex-row px-4 py-3">
            {/* Left Column: Avatar & Optional Thread Line */}
            <View className="mr-3 items-center">
                <Image source={{ uri: avatarUrl }} className="w-10 h-10 rounded-full bg-gray-200" />
            </View>

            {/* Right Column: Content */}
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center space-x-1 flex-1">
                        <Text className="font-bold text-gray-900 text-[15px]" numberOfLines={1}>{username}</Text>
                        <Text className="text-gray-500 text-[14px] ml-1 flex-shrink" numberOfLines={1}>@{username.toLowerCase()} · {timeAgo}</Text>
                    </View>
                    <TouchableOpacity>
                        <Feather name="more-horizontal" size={18} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                {/* Forwarded Badge */}
                <View className="flex-row items-center mt-0.5 mb-1.5 self-start">
                    <MaterialCommunityIcons name="hand-heart" size={13} color="#0EA5E9" />
                    <Text className="text-gray-500 text-xs ml-1.5">
                        Forwarded to <Text className="font-medium text-gray-700">{forwardedTo}</Text>
                    </Text>
                </View>

                {/* Text Content */}
                <Text className="text-gray-900 text-[15px] leading-5 mb-2.5">
                    {caption}
                </Text>

                {/* Main Visual */}
                {mainImageUrl && (
                    <View className="w-full relative rounded-2xl overflow-hidden border border-gray-100 mb-3 bg-gray-100">
                        <Image source={{ uri: mainImageUrl }} className="w-full aspect-[4/3] resize-cover" />
                    </View>
                )}

                {/* Action Bar (Twitter Style) */}
                <View className="flex-row items-center justify-between text-gray-500 mt-1 pr-2">
                    {/* Left Group: Reply, Repost, Like, Bookmark */}
                    <View className="flex-row items-center gap-6">
                        {/* Reply */}
                        <TouchableOpacity className="flex-row items-center">
                            <Feather name="message-circle" size={18} color="#6B7280" />
                            <Text className="text-gray-500 text-xs ml-1.5">1</Text>
                        </TouchableOpacity>

                        {/* Repost/Forward */}
                        <TouchableOpacity className="flex-row items-center">
                            <Feather name="repeat" size={18} color="#6B7280" />
                            <Text className="text-gray-500 text-xs ml-1.5">2</Text>
                        </TouchableOpacity>

                        {/* Like */}
                        <TouchableOpacity className="flex-row items-center">
                            <Ionicons name="heart-outline" size={19} color="#6B7280" />
                            <Text className="text-gray-500 text-xs ml-1.5">{likesCount}</Text>
                        </TouchableOpacity>

                        {/* Bookmark */}
                        <TouchableOpacity className="flex-row items-center">
                            <Feather name="bookmark" size={18} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    {/* Share */}
                    <TouchableOpacity className="flex-row items-center">
                        <Feather name="share" size={18} color="#6B7280" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PayForwardFeedItem;
