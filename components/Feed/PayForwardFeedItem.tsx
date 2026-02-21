import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export interface FeedItemProps {
    id?: string;
    avatarUrl: string;
    username: string;
    timeAgo: string;
    mainImageUrl?: string; // Optional for text-only posts
    forwardedTo: string; // Changed back to single string (1 Feed = 1 Person)
    caption: string;
    likesCount?: number;
    isThreadParent?: boolean; // Draws a line down to the next item
    isReply?: boolean; // Adjusts top padding/border
    isReplyTo?: string; // "Replying to @username" text
    replies?: FeedItemProps[]; // Nested replies to expand inline
    defaultShowReplies?: boolean; // Expands thread immediately on mount
    showMyRepliesInline?: boolean; // Only show MY replies inline (Profile > Post)
}

const PayForwardFeedItem: React.FC<FeedItemProps> = ({
    id,
    avatarUrl,
    username,
    timeAgo,
    mainImageUrl,
    forwardedTo,
    caption,
    likesCount = 0,
    isThreadParent = false,
    isReply = false,
    isReplyTo,
    replies = [],
    defaultShowReplies = false,
    showMyRepliesInline = false,
}) => {
    const router = useRouter();

    // For inline expansion: only used when showMyRepliesInline is true
    const showReplies = showMyRepliesInline && defaultShowReplies;
    const hasReplies = replies && replies.length > 0;
    const effectivelyThreadParent = isThreadParent || (showReplies && hasReplies);

    // Navigate to feed detail page (to read replies)
    const handlePressFeed = () => {
        if (id && !isReply) {
            router.push({ pathname: '/feed/[feedId]', params: { feedId: id } });
        }
    };

    // Navigate to reply page (to write a reply)
    const handlePressReply = () => {
        router.push({ pathname: '/feed/reply', params: { feedId: id ?? '', username } });
    };

    return (
        <>
            <View className={`bg-white px-4 flex-row ${isReply ? 'pt-1 pb-3' : 'py-3'} ${((!effectivelyThreadParent && !isReply) || (!effectivelyThreadParent && isReply)) ? 'border-b border-gray-100' : ''}`}>
                {/* Left Column: Avatar & Optional Thread Line */}
                <View className="mr-3 items-center relative">
                    <Image source={{ uri: avatarUrl }} className="w-10 h-10 rounded-full bg-gray-200 z-10" />
                    {/* Vertical Thread Line */}
                    {effectivelyThreadParent && (
                        <View className="absolute top-10 bottom-[-24px] w-[2px] bg-gray-200 z-0" />
                    )}
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

                    {/* Replying To Indicator */}
                    {isReplyTo && (
                        <View className="flex-row items-center mt-0.5 mb-1">
                            <Text className="text-gray-500 text-[14px]">
                                Replying to <Text className="text-sky-500">@{isReplyTo}</Text>
                            </Text>
                        </View>
                    )}

                    {/* Forwarded Badge */}
                    <View className="flex-row items-center mt-0.5 mb-1.5 self-start">
                        <MaterialCommunityIcons name="hand-heart" size={13} color="#0EA5E9" />
                        <Text className="text-gray-500 text-xs ml-1.5">
                            Forwarded to <Text className="font-medium text-gray-700">{forwardedTo}</Text>
                        </Text>
                    </View>

                    {/* Tappable Content Area → navigates to feed detail */}
                    <TouchableOpacity activeOpacity={0.7} onPress={handlePressFeed} disabled={isReply || !id}>
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
                    </TouchableOpacity>

                    {/* Action Bar (Twitter Style) */}
                    <View className="flex-row items-center justify-between text-gray-500 mt-1 pr-2">
                        {/* Left Group: Reply, Repost, Like, Bookmark */}
                        <View className="flex-row items-center gap-6">
                            {/* Reply → goes to reply page */}
                            <TouchableOpacity
                                className="flex-row items-center"
                                onPress={handlePressReply}
                            >
                                <Feather name="message-circle" size={18} color="#6B7280" />
                                <Text className="text-gray-500 text-xs ml-1.5">
                                    {hasReplies ? replies.length : 1}
                                </Text>
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

            {/* Inline Expanded Replies (only when showMyRepliesInline is true) */}
            {showReplies && hasReplies && (
                <View>
                    {replies.map((reply, index) => (
                        <PayForwardFeedItem
                            key={reply.id || `reply-${index}`}
                            {...reply}
                            isReply={true}
                            isReplyTo={username}
                            // Connect to next reply if it exists, or let it end
                            isThreadParent={index < replies.length - 1 || reply.isThreadParent}
                        />
                    ))}
                </View>
            )}
        </>
    );
};

export default PayForwardFeedItem;
