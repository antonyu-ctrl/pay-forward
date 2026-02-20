import React, { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PayForwardFeedItem from '../../components/Feed/PayForwardFeedItem';
import ProfileContent from '../../components/Profile/ProfileContent';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileInfo from '../../components/Profile/ProfileInfo';

// Mock Data
const USER = {
  username: 'Anton_Yu',
  name: 'Anton Yu',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  stats: {
    posts: 42,
    followers: 854,
    following: 120,
  },
  bio: 'Believer in the ripple effect. 🌊\nStarting small chains of kindness that change the world.\nJoin my latest chain below! 👇',
  hasActiveChain: true,
};

// Kindness / Community / Coffee / Nature / Volunteer themed images
const POSTS = [
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80', // Volunteer
  'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&q=80', // Charity
  'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&q=80', // Helping hand
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&q=80', // Solidarity
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&q=80', // Sun
  'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=500&q=80', // Coffee A
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80', // Coffee B
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80', // Laptop / Working
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80', // Charity box
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&q=80', // Group happy
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80', // Friends
  'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=500&q=80', // Community
  'https://images.unsplash.com/photo-1604881991720-f91add269ed8?w=500&q=80', // Book donation
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80', // Coding / Tech
  'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=500&q=80', // Skiing/activity
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80', // Drinks
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&q=80', // Painting / Art
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80', // Business
  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=500&q=80', // People
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80', // Education
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80', // Workgroup
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&q=80', // Meeting
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80', // Team
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80', // Office
  'https://images.unsplash.com/photo-1507537297725-24a1c434fa17?w=500&q=80', // Nature
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80', // Writing
  'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&q=80', // Planning
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80', // Typing
  'https://images.unsplash.com/photo-1593642532744-937713517365?w=500&q=80', // Modern Desk
  'https://images.unsplash.com/photo-1593642532744-937713517365?w=500&q=80', // Modern Desk
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80', // Computer
];

// Mock Thread Feed Data
const THREAD_POSTS = [
  {
    id: '1',
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    username: 'Anton_Yu',
    timeAgo: '2h',
    forwardedTo: 'Sarah Jenkins',
    caption: 'Just bought coffee for the person behind me in line! Let’s keep the kindness going. ☕️✨',
    likesCount: 15,
  },
  {
    id: '2',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    username: 'Jane_Doe',
    timeAgo: '4h',
    forwardedTo: 'Local Food Bank',
    caption: 'Dropped off some canned goods today. Small acts can make a big difference! 🥫',
    mainImageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80',
    likesCount: 34,
    replies: [
      {
        id: '3',
        avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'Anton_Yu',
        timeAgo: '3h',
        forwardedTo: 'Community Center',
        caption: 'That is so awesome! I’m going to do the same this weekend. Thanks for the inspiration!',
        likesCount: 5,
      }
    ]
  },
];

// Mock Following Feed Data
const FOLLOWING_POSTS = [
  {
    id: '1',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    username: 'Emma_W',
    timeAgo: '1h',
    forwardedTo: 'Local Animal Shelter',
    caption: 'Spent the morning walking dogs. They are all so sweet and need homes! 🐶❤️',
    mainImageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&q=80',
    likesCount: 112,
  },
  {
    id: '2',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    username: 'David_G',
    timeAgo: '5h',
    forwardedTo: 'City Park Cleanup',
    caption: 'Team effort! Collected 10 bags of trash from the park today 🌱',
    likesCount: 89,
    replies: [
      {
        id: '2a',
        avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        username: 'Anton_Yu',
        timeAgo: '4h',
        forwardedTo: 'City Park Cleanup',
        caption: 'Great job out there! I am going to try and make it out next month if it happens again.',
        likesCount: 12,
      },
      {
        id: '2b',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
        username: 'Emma_W',
        timeAgo: '2h',
        forwardedTo: 'City Park Cleanup',
        caption: 'I was there too! The park looks so much better now. Everyone did wonderful work.',
        likesCount: 5,
      }
    ]
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'Post' | 'Following' | 'Media'>('Post');

  return (
    <View
      className="flex-1 bg-white items-center"
      style={Platform.OS === 'web' ? ({ height: '100vh' } as any) : { flex: 1 }}
    >
      <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden flex flex-col">
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
          {/* Sticky Header */}
          <View className="z-10 bg-white">
            <ProfileHeader username={USER.username} />
          </View>

          {/* Scrollable Content */}
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
          >
            {/* Profile Info & Tab Menu */}
            <ProfileInfo
              user={USER}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Tab Content Rendering */}
            {activeTab === 'Post' && (
              <View className="flex-1 bg-white">
                {THREAD_POSTS.map((post) => (
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

            {activeTab === 'Following' && (
              <View className="flex-1 bg-white">
                {FOLLOWING_POSTS.map((post) => (
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
              <ProfileContent posts={POSTS} />
            )}

            {/* Bottom Spacer */}
            <View className="h-20" />
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}
