import HomeFeed from '@/components/Feed/HomeFeed';
import React from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <HomeFeed />
    </View>
  );
}
