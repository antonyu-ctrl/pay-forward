import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SafeGradient from '../../../components/SafeGradient';

// Mock Data Structure (same as my-forward.tsx)
type ChainType = 'ignited' | 'invited';
type ChainStatus = 'Active' | 'Completed';

interface ChainItem {
    id: string;
    title: string;
    category: 'coffee' | 'book';
    status: ChainStatus;
    startDate: string;
    stats: {
        generation: number;
        maxDepth: number;
        impact: number;
    };
    participants: string[];
    type: ChainType;
    isArchived: boolean;
}

// Mock chains for other users
const USER_CHAINS: Record<string, ChainItem[]> = {
    alex: [
        {
            id: 'a1',
            title: 'Morning Coffee Relay',
            category: 'coffee',
            status: 'Active',
            startDate: '2025-02-12',
            stats: { generation: 5, maxDepth: 8, impact: 22 },
            participants: [
                'https://randomuser.me/api/portraits/men/32.jpg',
                'https://randomuser.me/api/portraits/women/44.jpg',
            ],
            type: 'ignited',
            isArchived: false,
        },
        {
            id: 'a2',
            title: 'Book Swap Circle',
            category: 'book',
            status: 'Completed',
            startDate: '2025-01-20',
            stats: { generation: 3, maxDepth: 5, impact: 15 },
            participants: [
                'https://randomuser.me/api/portraits/women/68.jpg',
            ],
            type: 'ignited',
            isArchived: false,
        },
    ],
    sarah_writer: [
        {
            id: 's1',
            title: 'Story Sharing Chain',
            category: 'book',
            status: 'Active',
            startDate: '2025-02-05',
            stats: { generation: 7, maxDepth: 10, impact: 35 },
            participants: [
                'https://randomuser.me/api/portraits/women/44.jpg',
                'https://randomuser.me/api/portraits/men/22.jpg',
            ],
            type: 'ignited',
            isArchived: false,
        },
    ],
};

// Default chains for users without specific data
const DEFAULT_CHAINS: ChainItem[] = [
    {
        id: 'd1',
        title: 'Kindness Chain',
        category: 'coffee',
        status: 'Active',
        startDate: '2025-02-15',
        stats: { generation: 2, maxDepth: 5, impact: 8 },
        participants: [
            'https://randomuser.me/api/portraits/men/32.jpg',
        ],
        type: 'ignited',
        isArchived: false,
    },
];

type FilterOption = 'All' | 'Active' | 'Completed' | 'Archived';

export default function UserImpactScreen() {
    const router = useRouter();
    const { userId, returnTo } = useLocalSearchParams<{ userId: string; returnTo?: string }>();
    const chains = USER_CHAINS[userId ?? ''] ?? DEFAULT_CHAINS;

    const handleGoBack = () => {
        if (returnTo) {
            router.replace(returnTo as any);
        } else if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)/profile');
        }
    };

    const [activeTab, setActiveTab] = useState<ChainType>('ignited');
    const [filter, setFilter] = useState<FilterOption>('All');
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    // Aggregate Stats (only count 'ignited' chains)
    const ignitedChains = chains.filter(c => c.type === 'ignited');
    const totalImpact = ignitedChains.reduce((acc, chain) => acc + chain.stats.impact, 0);
    const activeChainsCount = ignitedChains.length;
    const totalGenerations = ignitedChains.reduce((acc, chain) => acc + chain.stats.generation, 0);

    // Filter Logic
    const displayedChains = chains.filter(chain => {
        if (chain.type !== activeTab) return false;
        if (filter === 'Archived') {
            return chain.isArchived;
        } else {
            if (chain.isArchived) return false;
            if (filter === 'All') return true;
            return chain.status === filter;
        }
    });

    const renderChainCard = ({ item }: { item: ChainItem }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            className="bg-white mb-4 rounded-2xl p-4 border border-gray-100 shadow-sm relative"
        >
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-row items-center gap-3 flex-1 mr-2">
                    <View className={`w-10 h-10 rounded-full items-center justify-center ${item.category === 'coffee' ? 'bg-orange-100' : 'bg-blue-100'
                        }`}>
                        <Feather
                            name={item.category === 'coffee' ? 'coffee' : 'book'}
                            size={18}
                            color={item.category === 'coffee' ? '#EA580C' : '#2563EB'}
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="font-bold text-gray-900 text-base" numberOfLines={1}>{item.title}</Text>
                        <Text className="text-xs text-gray-500">{item.startDate} • Gen {item.stats.generation}/{item.stats.maxDepth}</Text>
                    </View>
                </View>

                {/* Status Badge */}
                <View className={`px-2 py-1 rounded-md ${item.status === 'Active' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                    <Text className={`text-[10px] font-bold ${item.status === 'Active' ? 'text-green-600' : 'text-gray-500'
                        }`}>
                        {item.status.toUpperCase()}
                    </Text>
                </View>
            </View>

            {/* Progress / Stats Row */}
            <View className="flex-row items-center justify-between mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <View className="items-center flex-1 border-r border-gray-200">
                    <Text className="text-xs text-gray-400 font-medium">LIVES TOUCHED</Text>
                    <Text className="text-lg font-bold text-gray-900">{item.stats.impact}</Text>
                </View>
                <View className="items-center flex-1">
                    <Text className="text-xs text-gray-400 font-medium">NEXT GOAL</Text>
                    {item.status === 'Completed' ? (
                        <Text className="text-lg font-bold text-sky-500">Completed</Text>
                    ) : (
                        <Text className="text-lg font-bold text-sky-500">
                            {Math.pow(2, item.stats.generation) * 2} <Text className="text-xs text-gray-400 font-normal">people</Text>
                        </Text>
                    )}
                </View>
            </View>

            {/* Participants Preview */}
            <View className="flex-row items-center mt-4">
                <View className="flex-row -space-x-2 mr-2">
                    {item.participants.map((url, i) => (
                        <Image
                            key={i}
                            source={{ uri: url }}
                            className="w-6 h-6 rounded-full border-2 border-white"
                        />
                    ))}
                    <View className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white items-center justify-center">
                        <Feather name="more-horizontal" size={10} color="#6B7280" />
                    </View>
                </View>
                <Text className="text-xs text-gray-400">
                    and others joined this wave
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            className="flex-1 bg-gray-50 items-center"
            style={Platform.OS === 'web' ? { height: '100vh' as any } : { flex: 1 }}
        >
            <View className="w-full max-w-md bg-white shadow-sm overflow-hidden flex-1">
                {/* Header with Back Arrow */}
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 bg-white z-20">
                    <View className="w-8">
                        <TouchableOpacity onPress={handleGoBack}>
                            <Feather name="arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className="items-center justify-center">
                        <Text className="text-lg font-bold text-gray-900 tracking-tight">{userId}'s Impact</Text>
                    </View>
                    <View className="w-8" />
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                    {/* Hero Stats Card */}
                    <SafeGradient
                        colors={['#0EA5E9', '#38BDF8']}
                        className="rounded-3xl p-6 mb-8 shadow-lg shadow-sky-200"
                    >
                        <View className="flex-row justify-between items-start mb-6">
                            <View>
                                <Text className="text-sky-100 font-medium text-xs tracking-widest mb-1">TOTAL LIVES TOUCHED</Text>
                                <Text className="text-4xl font-extrabold text-white">{totalImpact}</Text>
                            </View>
                            <View className="bg-white/20 p-2 rounded-full">
                                <Feather name="globe" size={24} color="white" />
                            </View>
                        </View>

                        <View className="flex-row gap-4">
                            <View className="bg-black/10 flex-1 p-3 rounded-xl">
                                <Text className="text-sky-50 text-[10px] font-bold">CHAINS STARTED</Text>
                                <Text className="text-xl font-bold text-white">{activeChainsCount}</Text>
                            </View>
                            <View className="bg-black/10 flex-1 p-3 rounded-xl">
                                <Text className="text-sky-50 text-[10px] font-bold">TOTAL GENERATIONS</Text>
                                <Text className="text-xl font-bold text-white">{totalGenerations}</Text>
                            </View>
                        </View>
                    </SafeGradient>

                    {/* Tabs / Toggle (Ignited vs Invited) */}
                    <View className="flex-row bg-gray-100 p-1 rounded-xl mb-6">
                        <TouchableOpacity
                            className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'ignited' ? 'bg-white shadow-sm' : ''}`}
                            onPress={() => setActiveTab('ignited')}
                        >
                            <Text className={`font-bold ${activeTab === 'ignited' ? 'text-gray-900' : 'text-gray-500'}`}>Ignited</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'invited' ? 'bg-white shadow-sm' : ''}`}
                            onPress={() => setActiveTab('invited')}
                        >
                            <Text className={`font-bold ${activeTab === 'invited' ? 'text-gray-900' : 'text-gray-500'}`}>Invited</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Section Title & Filter */}
                    <View className="flex-row justify-between items-center mb-4 z-10 relative">
                        <Text className="text-lg font-bold text-gray-900">{userId}'s Chains</Text>
                        <TouchableOpacity
                            onPress={() => setFilterModalVisible(true)}
                            className="flex-row items-center"
                        >
                            <Text className="text-sm font-bold text-sky-500 mr-1">{filter === 'All' ? 'View All' : filter}</Text>
                            <Feather name="chevron-down" size={16} color="#0EA5E9" />
                        </TouchableOpacity>
                    </View>

                    {/* Chain List */}
                    {displayedChains.length > 0 ? (
                        displayedChains.map(chain => (
                            <View key={chain.id}>
                                {renderChainCard({ item: chain })}
                            </View>
                        ))
                    ) : (
                        <View className="items-center justify-center py-10">
                            <Text className="text-gray-400 text-sm">No {filter === 'All' ? '' : filter.toLowerCase()} chains found.</Text>
                        </View>
                    )}

                    {/* NO "Start a New Chain" button — this is someone else's Impact page */}

                    <View className="h-20" />
                </ScrollView>

                {/* Filter Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={filterModalVisible}
                    onRequestClose={() => setFilterModalVisible(false)}
                >
                    <TouchableOpacity
                        className="flex-1 bg-black/50 items-center justify-center"
                        activeOpacity={1}
                        onPress={() => setFilterModalVisible(false)}
                    >
                        <View className="bg-white rounded-2xl w-3/4 max-w-sm p-6 shadow-xl m-4">
                            <Text className="text-lg font-bold text-gray-900 mb-4 text-center">Filter Chains</Text>

                            {(['All', 'Active', 'Completed', 'Archived'] as FilterOption[]).map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    className={`py-3 border-b border-gray-100 ${filter === option ? 'bg-sky-50 rounded-lg px-2' : ''}`}
                                    onPress={() => {
                                        setFilter(option);
                                        setFilterModalVisible(false);
                                    }}
                                >
                                    <Text className={`text-center font-medium ${filter === option ? 'text-sky-500' : 'text-gray-700'}`}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity
                                className="mt-4 py-2"
                                onPress={() => setFilterModalVisible(false)}
                            >
                                <Text className="text-center text-gray-500 text-sm">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </View>
    );
}
