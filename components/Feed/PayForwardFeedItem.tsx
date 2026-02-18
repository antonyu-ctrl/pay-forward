import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface FeedItemProps {
    avatarUrl: string;
    username: string;
    timeAgo: string;
    mainImageUrl: string;
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
        <View className="bg-white mb-6 border-b border-gray-100 pb-4">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <View className="flex-row items-center">
                    <Image source={{ uri: avatarUrl }} className="w-9 h-9 rounded-full bg-gray-200" />
                    <View className="ml-3">
                        <Text className="font-semibold text-gray-900 text-[15px]">{username}</Text>
                        {/* Optional: Location or sub-text could go here */}
                    </View>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-gray-400 text-xs mr-3">{timeAgo}</Text>
                    <TouchableOpacity>
                        <Feather name="more-horizontal" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Visual */}
            <View className="relative w-full aspect-square bg-gray-100">
                <Image source={{ uri: mainImageUrl }} className="w-full h-full resize-cover" />

                {/* Hand Holding Heart Icon Overlay */}
                <View className="absolute top-4 left-4 bg-white/90 w-10 h-10 rounded-full items-center justify-center shadow-sm border border-gray-100/50">
                    <MaterialCommunityIcons name="hand-heart" size={20} color="#0EA5E9" />
                    {/* Green intent for "Pay It Forward" action */}
                </View>
            </View>

            {/* Forward Tagging */}
            <View className="px-4 mt-3">
                {/* Forwarded Badge */}
                <View className="flex-row items-center bg-sky-50 px-3 py-1 rounded-full self-start mb-1">
                    <Feather name="corner-down-right" size={14} color="#0EA5E9" />
                    <Text className="text-gray-600 text-xs ml-1">
                        Forwarded to <Text className="font-bold text-sky-600">{forwardedTo}</Text>
                    </Text>
                </View>
            </View>

            {/* Action Bar */}
            <View className="flex-row items-center justify-between px-4 mt-3">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity>
                        <Ionicons name="heart-outline" size={26} color="#1F2937" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="chatbubble-outline" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="send" size={22} color="#1F2937" />
                    </TouchableOpacity>
                </View>

                {/* Save / Bookmark */}
                <TouchableOpacity>
                    <Feather name="bookmark" size={24} color="#1F2937" />
                </TouchableOpacity>
            </View>

            {/* Likes & Caption */}
            <View className="px-4 mt-2.5">
                <Text className="text-gray-900 font-bold text-sm mb-1">{likesCount > 0 ? `${likesCount} likes` : 'Be the first to like'}</Text>
                <Text className="text-gray-800 text-[14.5px] leading-5">
                    <Text className="font-bold mr-2">{username}</Text> {caption}
                </Text>
            </View>
        </View>
    );
};

export default PayForwardFeedItem;
