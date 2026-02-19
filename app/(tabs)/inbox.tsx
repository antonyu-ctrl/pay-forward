import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Mock Data for Online Users
const ONLINE_USERS = [
    { id: '1', username: 'alex', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: true },
    { id: '2', username: 'sarah', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: true },
    { id: '3', username: 'mike', avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: false },
    { id: '4', username: 'emily', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: true },
    { id: '5', username: 'david', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: false },
    { id: '6', username: 'lisa', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: false },
    { id: '7', username: 'james', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: true },
    { id: '8', username: 'olivia', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: false },
];

// Mock Data for Messages
const MESSAGES = [
    {
        id: '1',
        sender: 'alex',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        message: 'Hey! Did you get the coffee I sent?',
        time: '2m',
        unread: true,
    },
    {
        id: '2',
        sender: 'sarah',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        message: 'Thanks for the book recommendation! 📚',
        time: '1h',
        unread: true,
    },
    {
        id: '3',
        sender: 'mike',
        avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        message: 'Are we still on for the community cleanup?',
        time: '3h',
        unread: false,
    },
    {
        id: '4',
        sender: 'emily',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        message: 'I just started a new chain!',
        time: '1d',
        unread: false,
    },
];

// Mock Data for Chain Messages
const CHAIN_MESSAGES = [
    {
        id: 'c1',
        sender: 'David',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        message: 'You\'re next! Keep the kindness going.',
        unread: true,
        hoursLeft: 24,
        participants: 12,
        completed: 10,
        status: 'active', // active or completed
        time: '10m',
    },
    {
        id: 'c2',
        sender: 'Lisa',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        message: 'Chain forwarded to you. Good luck!',
        unread: true,
        hoursLeft: 48,
        participants: 5,
        completed: 4,
        status: 'active',
        time: '1h',
    },
    {
        id: 'c3',
        sender: 'Mike',
        avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        message: 'Coffee chain completed! Thanks everyone.',
        unread: false,
        hoursLeft: 0,
        participants: 20,
        completed: 20,
        status: 'completed',
        time: '2d',
    },
    {
        id: 'c4',
        sender: 'Sarah',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        message: 'Book exchange chain is still active.',
        unread: false,
        hoursLeft: 12,
        participants: 8,
        completed: 6,
        status: 'active',
        time: '3d',
    },
];

type TabType = 'chain' | 'direct';

export default function InboxScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('chain'); // Default to chain for review

    const renderOnlineUsers = () => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-4 border-b border-gray-100" contentContainerStyle={{ paddingHorizontal: 16 }}>
            {ONLINE_USERS.map((user) => (
                <TouchableOpacity
                    key={user.id}
                    className="items-center mr-4"
                    onPress={() => router.push({ pathname: '/chat/[userId]', params: { userId: user.username } })}
                >
                    <View className="relative">
                        <View className={`p-[2px] rounded-full ${user.hasActiveChain ? 'border-2 border-sky-400' : 'border border-transparent'}`}>
                            <Image
                                source={{ uri: user.avatarUrl }}
                                className="w-14 h-14 rounded-full border border-gray-100"
                            />
                        </View>
                        {/* Green Online Dot - Overlapped at bottom right */}
                        <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                    </View>

                    <Text className="text-xs text-gray-600 mt-1 font-medium">{user.username}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderChainMessages = () => {
        const unreadChains = CHAIN_MESSAGES.filter(m => m.unread);
        const historyChains = CHAIN_MESSAGES.filter(m => !m.unread);

        if (unreadChains.length === 0 && historyChains.length === 0) {
            return (
                <View className="flex-1 items-center justify-center p-4">
                    <View className="w-16 h-16 bg-sky-50 rounded-full items-center justify-center mb-4">
                        <Feather name="link" size={32} color="#0EA5E9" />
                    </View>
                    <Text className="text-gray-900 font-bold text-lg mb-2">No Chain Messages</Text>
                    <Text className="text-gray-500 text-center px-8">
                        When someone forwards a chain to you, it will appear here.
                    </Text>
                </View>
            );
        }

        return (
            <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16 }}>
                {unreadChains.length > 0 && (
                    <View className="mb-6">
                        <Text className="text-gray-900 font-bold text-lg mb-3">New Chains</Text>
                        {unreadChains.map((item) => (
                            <TouchableOpacity key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 mb-3 shadow-sm active:bg-gray-50">
                                <View className="flex-row items-start">
                                    <Image
                                        source={{ uri: item.avatarUrl }}
                                        className="w-12 h-12 rounded-full bg-gray-200 mr-3 border border-gray-100"
                                    />
                                    <View className="flex-1">
                                        <View className="flex-row justify-between items-center mb-1">
                                            <Text className="text-sm font-bold text-gray-900">{item.sender} forwarded a chain</Text>
                                            <Text className="text-xs text-sky-500 font-medium">{item.time} ago</Text>
                                        </View>
                                        <Text className="text-gray-600 text-sm mb-3 leading-5">
                                            {item.message}
                                        </Text>

                                        {/* Stats Row */}
                                        <View className="flex-row items-center justify-between bg-gray-50 rounded-lg p-2">
                                            <View className="flex-row items-center">
                                                <View className="bg-sky-100 rounded px-2 py-0.5 mr-2">
                                                    <Text className="text-sky-600 text-xs font-bold">{item.hoursLeft}h left</Text>
                                                </View>
                                                <Text className="text-gray-500 text-xs">
                                                    {item.participants} joined • {item.completed} completed
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {historyChains.length > 0 && (
                    <View className="mb-8">
                        <Text className="text-gray-900 font-bold text-lg mb-3">History</Text>
                        {historyChains.map((item) => (
                            <TouchableOpacity key={item.id} className="flex-row items-center py-3 border-b border-gray-50 active:bg-gray-50">
                                <Image
                                    source={{ uri: item.avatarUrl }}
                                    className="w-10 h-10 rounded-full bg-gray-200 mr-3 opacity-80"
                                />
                                <View className="flex-1">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-900 font-medium text-sm mb-0.5">{item.sender}</Text>
                                        <Text className="text-gray-400 text-xs">{item.time} ago</Text>
                                    </View>
                                    <Text numberOfLines={1} className="text-gray-500 text-xs">
                                        {item.message}
                                    </Text>
                                </View>

                                {/* Status Dot */}
                                <View className={`w-2.5 h-2.5 rounded-full ml-3 ${item.status === 'active' ? 'bg-sky-500' : 'bg-gray-300'
                                    }`} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        );
    };





    return (
        <View
            className="flex-1 bg-gray-50 items-center relative"
            style={Platform.OS === 'web' ? { height: '100vh' as any } : { flex: 1 }}
        >
            <Stack.Screen options={{ headerShown: false }} />
            <View className="w-full max-w-md bg-white shadow-sm overflow-hidden flex-1">
                <View className="flex-1 bg-white">
                    {/* Header - Matches 'My Impact' style for consistency */}
                    <View className="items-center justify-center py-3 border-b border-gray-100 bg-white z-10 relative">
                        {/* Centered Title */}
                        <Text className="text-lg font-bold text-gray-900 tracking-tight">Inbox</Text>
                    </View>

                    {/* Tabs */}
                    <View className="flex-row border-b border-gray-100">
                        <TouchableOpacity
                            onPress={() => setActiveTab('chain')}
                            className={`flex-1 py-3 items-center justify-center border-b-2 ${activeTab === 'chain' ? 'border-sky-500' : 'border-transparent'
                                }`}
                        >
                            <Text
                                className={`font-medium ${activeTab === 'chain' ? 'text-sky-500 font-bold' : 'text-gray-500'
                                    }`}
                            >
                                Chain Message
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('direct')}
                            className={`flex-1 py-3 items-center justify-center border-b-2 ${activeTab === 'direct' ? 'border-sky-500' : 'border-transparent'
                                }`}
                        >
                            <Text
                                className={`font-medium ${activeTab === 'direct' ? 'text-sky-500 font-bold' : 'text-gray-500'
                                    }`}
                            >
                                Direct Message
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Content Area */}
                    <View className="flex-1 bg-white">
                        {activeTab === 'chain' ? (
                            renderChainMessages()
                        ) : (
                            <View className="flex-1">
                                <FlatList
                                    data={MESSAGES}
                                    keyExtractor={(item) => item.id}
                                    ListHeaderComponent={renderOnlineUsers}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            className="flex-row items-center px-4 py-3 active:bg-gray-50"
                                            onPress={() => router.push({ pathname: '/chat/[userId]', params: { userId: item.sender } })}
                                        >
                                            <View className="relative">
                                                <Image
                                                    source={{ uri: item.avatarUrl }}
                                                    className="w-12 h-12 rounded-full bg-gray-200"
                                                />
                                                {/* Online status could be shown here too if needed, but per request it's top only for now */}
                                            </View>

                                            <View className="flex-1 ml-3">
                                                <View className="flex-row justify-between items-center mb-1">
                                                    <Text className={`text-base text-gray-900 ${item.unread ? 'font-bold' : 'font-medium'}`}>
                                                        {item.sender}
                                                    </Text>
                                                    <Text className={`text-xs ${item.unread ? 'text-sky-500 font-bold' : 'text-gray-400'}`}>
                                                        {item.time}
                                                    </Text>
                                                </View>
                                                <Text
                                                    numberOfLines={1}
                                                    className={`text-sm ${item.unread ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}
                                                >
                                                    {item.message}
                                                </Text>
                                            </View>

                                            {/* Unread Indicator Dot */}
                                            {item.unread && (
                                                <View className="w-2.5 h-2.5 bg-sky-500 rounded-full ml-2" />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = {
    // keeping for potential reuse or override
};
