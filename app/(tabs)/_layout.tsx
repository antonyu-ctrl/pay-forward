import { Feather } from '@expo/vector-icons';
import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
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
  const router = useRouter();

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width >= DESKTOP_BREAKPOINT;
  const pathname = usePathname();

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

      {/* Floating Action Button — Home feed only, Mobile only */}
      {!isDesktop && pathname === '/' && (() => {
        const maxContentWidth = 448; // max-w-md
        const contentWidth = Math.min(width, maxContentWidth);
        const contentRight = (width - contentWidth) / 2;
        return (
          <TouchableOpacity
            onPress={() => router.push('/feed/create')}
            style={{
              position: 'absolute',
              bottom: 76 + insets.bottom,
              right: contentRight + 16,
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: '#0EA5E9',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              zIndex: 100,
            }}
            activeOpacity={0.8}
          >
            <Feather name="plus" size={28} color="white" />
          </TouchableOpacity>
        );
      })()}
    </>
  );
}
