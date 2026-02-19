import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import ProfileContent from '../../components/Profile/ProfileContent';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileTabs from '../../components/Profile/ProfileTabs';

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
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80', // Computer
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'grid' | 'reels' | 'tagged'>('grid');

  // Force re-render on focus if needed, but mainly ensuring layout here
  useFocusEffect(() => { });

  return (
    <View
      className="flex-1 bg-white items-center"
      style={Platform.OS === 'web' ? { height: '100vh' } : { flex: 1 }}
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
            stickyHeaderIndices={[1]} // Sticky Tabs (Index 1 now, after removing Highlights)
          >
            {/* Profile Info */}
            <ProfileInfo user={USER} />

            {/* Tabs (Sticky) */}
            <View className="bg-white z-10 shadow-sm">
              <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </View>

            {/* Grid Content */}
            <ProfileContent posts={POSTS} />

            {/* Bottom Spacer */}
            <View className="h-20" />
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}
