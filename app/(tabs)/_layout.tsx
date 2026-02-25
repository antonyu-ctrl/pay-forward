import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DESKTOP_BREAKPOINT } from '../../constants/Layout';
import { useI18n } from '../../lib/i18n';




function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={26} {...props} />;
}

export default function TabLayout() {
  const { t } = useI18n();

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  return (
    <>

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
            title: t('nav.home'),
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="my-forward"
          options={{
            title: t('nav.myForward'),
            tabBarIcon: ({ color }) => <TabBarIcon name="layers" color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: t('nav.search'),
            tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            title: t('nav.inbox'),
            tabBarIcon: ({ color }) => <TabBarIcon name="send" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('nav.profile'),
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
        <Tabs.Screen
          name="create-forward"
          options={{
            href: null, // Hide from tab bar
            title: t('nav.newChain'),
          }}
        />
        <Tabs.Screen
          name="user/[userId]"
          options={{
            href: null,
            title: t('nav.userProfile'),
          }}
        />
        <Tabs.Screen
          name="user/followers"
          options={{
            href: null,
            title: t('nav.followers'),
          }}
        />
        <Tabs.Screen
          name="user/following"
          options={{
            href: null,
            title: t('nav.following'),
          }}
        />
        <Tabs.Screen
          name="user/user-impact"
          options={{
            href: null,
            title: t('nav.userImpact'),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            href: null,
            title: t('nav.userSetting'),
          }}
        />
      </Tabs>
    </>
  );
}
