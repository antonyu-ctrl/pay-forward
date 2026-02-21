import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import WebTopBar from '@/components/Navigation/WebTopBar';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={26} {...props} />;
}

export default function TabLayout() {

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width >= 768; // 768px is the standard MD breakpoint

  return (
    <>
      {/* Web Top Navigation Bar - Only visible on Desktop */}
      {isDesktop && <WebTopBar />}

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#0EA5E9', // Sky 500
          headerShown: false,
          tabBarShowLabel: false, // Removes text labels from the bottom menu
          // Hide bottom tabs on Desktop, Show on Mobile (App or Mobile Web)
          tabBarStyle: isDesktop ? { display: 'none' } : {
            // Adjust height to accurately center without text, accounting for bottom safe area on devices like iPhone
            height: 60 + insets.bottom,
            paddingTop: 8,
            paddingBottom: 8 + insets.bottom,
          },
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
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            title: 'Inbox',
            tabBarIcon: ({ color }) => <TabBarIcon name="send" color={color} />,
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
