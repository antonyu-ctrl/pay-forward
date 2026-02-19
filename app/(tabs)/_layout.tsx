import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import WebTopBar from '@/components/Navigation/WebTopBar';
import { useColorScheme } from '@/components/useColorScheme';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768; // 768px is the standard MD breakpoint

  return (
    <>
      {/* Web Top Navigation Bar - Only visible on Desktop */}
      {isDesktop && <WebTopBar />}

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#0EA5E9', // Sky 500
          headerShown: false,
          // Hide bottom tabs on Desktop, Show on Mobile (App or Mobile Web)
          tabBarStyle: isDesktop ? { display: 'none' } : {},
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="my-forward"
          options={{
            title: 'My Forward',
            tabBarIcon: ({ color }) => <TabBarIcon name="layers" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
        <Tabs.Screen
          name="create-forward"
          options={{
            href: null, // Hide from tab bar
            title: 'New Chain',
          }}
        />
      </Tabs>
    </>
  );
}
