import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PayForwardFeedItem from '../../../components/Feed/PayForwardFeedItem';
import ProfileContent from '../../../components/Profile/ProfileContent';
import UserProfileHeader from '../../../components/Profile/UserProfileHeader';
import UserProfileInfo from '../../../components/Profile/UserProfileInfo';
import { getUser, hasRelationship } from '../../../data/mockUsers';

// Mock posts for other users (sample data)
const USER_POSTS: Record<string, any[]> = {
    alex: [
        {
            id: 'alex-1',
            avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            username: 'alex',
            timeAgo: '3h',
            forwardedTo: 'Coffee Shop Stranger',
            caption: 'Bought coffee for the next person in line today! The barista said it made their day. ☕💛',
            mainImageUrl: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=500&q=80',
            likesCount: 42,
        },
        {
            id: 'alex-2',
            avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            username: 'alex',
            timeAgo: '1d',
            forwardedTo: 'Local Library',
            caption: 'Donated a box of books to the local library. Knowledge should be shared freely 📚',
            likesCount: 28,
        },
    ],
    sarah_writer: [
        {
            id: 'sarah-1',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            username: 'sarah_writer',
            timeAgo: '5h',
            forwardedTo: 'Writing Workshop',
            caption: 'Hosted a free creative writing workshop for teens today. Their stories were incredible! ✍️✨',
            mainImageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80',
            likesCount: 89,
        },
        {
            id: 'sarah-2',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            username: 'sarah_writer',
            timeAgo: '2d',
            forwardedTo: 'Community Center',
            caption: 'Left encouraging notes in library books for the next reader to find 📖💌',
            likesCount: 56,
        },
    ],
    Jane_Doe: [
        {
            id: 'jane-1',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            username: 'Jane_Doe',
            timeAgo: '4h',
            forwardedTo: 'Local Food Bank',
            caption: 'Dropped off some canned goods today. Small acts can make a big difference! 🥫',
            mainImageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80',
            likesCount: 34,
        },
    ],
    David_G: [
        {
            id: 'david-1',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
            username: 'David_G',
            timeAgo: '5h',
            forwardedTo: 'City Park Cleanup',
            caption: 'Team effort! Collected 10 bags of trash from the park today 🌱',
            likesCount: 89,
        },
    ],
    Emma_W: [
        {
            id: 'emma-1',
            avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
            username: 'Emma_W',
            timeAgo: '1h',
            forwardedTo: 'Local Animal Shelter',
            caption: 'Spent the morning walking dogs. They are all so sweet and need homes! 🐶❤️',
            mainImageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&q=80',
            likesCount: 112,
        },
    ],
};

// Mock media images for other users
const USER_MEDIA: Record<string, string[]> = {
    alex: [
        'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=500&q=80',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80',
        'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=500&q=80',
    ],
    sarah_writer: [
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80',
        'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&q=80',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80',
        'https://images.unsplash.com/photo-1593642532744-937713517365?w=500&q=80',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80',
    ],
};

// Mock following feed (posts from people the user follows)
const USER_FOLLOWING_POSTS: Record<string, any[]> = {
    alex: [
        {
            id: 'alex-fol-1',
            avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            username: 'Anton_Yu',
            timeAgo: '2h',
            forwardedTo: 'Sarah Jenkins',
            caption: 'Just bought coffee for the person behind me in line! Let\'s keep the kindness going. ☕✨',
            likesCount: 15,
        },
    ],
};

export default function UserProfileScreen() {
    const { userId } = useLocalSearchParams<{ userId: string }>();
    const user = getUser(userId ?? '');
    const isFollowerRelationship = hasRelationship(userId ?? '');

    // Determine default tab based on relationship
    const defaultTab = 'Post';
    const [activeTab, setActiveTab] = useState(defaultTab);

    if (!user) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <Text className="text-gray-500 text-lg">User not found</Text>
            </View>
        );
    }

    const posts = USER_POSTS[userId ?? ''] ?? [];
    const media = USER_MEDIA[userId ?? ''] ?? [
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80',
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&q=80',
        'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&q=80',
    ];
    const followingPosts = USER_FOLLOWING_POSTS[userId ?? ''] ?? [];

    return (
        <View
            className="flex-1 bg-white items-center"
            style={Platform.OS === 'web' ? ({ height: '100%' } as any) : { flex: 1 }}
        >
            <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden flex flex-col">
                <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                    {/* Sticky Header */}
                    <View className="z-10 bg-white">
                        <UserProfileHeader username={user.username} />
                    </View>

                    {/* Scrollable Content */}
                    <ScrollView
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Profile Info & Tab Menu */}
                        <UserProfileInfo
                            user={user}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            isFollower={isFollowerRelationship}
                        />

                        {/* Tab Content Rendering */}
                        {activeTab === 'Post' && (
                            <View className="flex-1 bg-white">
                                {posts.map((post) => (
                                    <PayForwardFeedItem
                                        key={post.id}
                                        id={post.id}
                                        avatarUrl={post.avatarUrl}
                                        username={post.username}
                                        timeAgo={post.timeAgo}
                                        mainImageUrl={post.mainImageUrl}
                                        forwardedTo={post.forwardedTo}
                                        caption={post.caption}
                                        likesCount={post.likesCount}
                                        replies={post.replies}
                                        defaultShowReplies={true}
                                        showMyRepliesInline={true}
                                    />
                                ))}
                            </View>
                        )}

                        {activeTab === 'Following' && isFollowerRelationship && (
                            <View className="flex-1 bg-white">
                                {followingPosts.map((post) => (
                                    <PayForwardFeedItem
                                        key={post.id}
                                        id={post.id}
                                        avatarUrl={post.avatarUrl}
                                        username={post.username}
                                        timeAgo={post.timeAgo}
                                        mainImageUrl={post.mainImageUrl}
                                        forwardedTo={post.forwardedTo}
                                        caption={post.caption}
                                        likesCount={post.likesCount}
                                        replies={post.replies}
                                    />
                                ))}
                            </View>
                        )}

                        {activeTab === 'Media' && (
                            <ProfileContent posts={media} />
                        )}

                        {/* Bottom Spacer */}
                        <View className="h-20" />
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
}
