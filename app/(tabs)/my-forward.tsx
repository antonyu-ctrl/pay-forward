import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import SafeGradient from '../../components/SafeGradient';
import { useI18n } from '../../lib/i18n';

// Extended Mock Data Structure
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

const INITIAL_CHAINS: ChainItem[] = [
    {
        id: '1',
        title: 'Morning Coffee Relay',
        category: 'coffee',
        status: 'Active',
        startDate: '2025-02-10',
        stats: {
            generation: 3,
            maxDepth: 5,
            impact: 14 // People touched
        },
        participants: [
            'https://randomuser.me/api/portraits/men/32.jpg',
            'https://randomuser.me/api/portraits/women/44.jpg',
            'https://randomuser.me/api/portraits/men/86.jpg',
        ],
        type: 'ignited',
        isArchived: false,
    },
    {
        id: '2',
        title: 'Book Donation Drive',
        category: 'book',
        status: 'Completed',
        startDate: '2025-01-15',
        stats: {
            generation: 4,
            maxDepth: 4,
            impact: 30 // Completed
        },
        participants: [
            'https://randomuser.me/api/portraits/women/68.jpg',
            'https://randomuser.me/api/portraits/men/22.jpg',
        ],
        type: 'ignited',
        isArchived: false, // Potentially archivable
    },
    // Received Chains (Sync with Inbox)
    {
        id: 'c1',
        title: 'Pay it Forward: Coffee',
        category: 'coffee',
        status: 'Active',
        startDate: '2025-02-19',
        stats: {
            generation: 12,
            maxDepth: 15,
            impact: 10
        },
        participants: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', // David
            'https://randomuser.me/api/portraits/women/68.jpg',
        ],
        type: 'invited',
        isArchived: false,
    },
    {
        id: 'c4',
        title: 'Community Book Exchange',
        category: 'book',
        status: 'Active',
        startDate: '2025-02-18',
        stats: {
            generation: 6,
            maxDepth: 10,
            impact: 6
        },
        participants: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', // Sarah
            'https://randomuser.me/api/portraits/men/32.jpg',
        ],
        type: 'invited',
        isArchived: false,
    }
];

type FilterOption = 'All' | 'Active' | 'Completed' | 'Archived';

export default function MyForwardScreen() {
    const router = useRouter();
    const { t } = useI18n();
    const [chains, setChains] = useState<ChainItem[]>(INITIAL_CHAINS);
    const [activeTab, setActiveTab] = useState<ChainType>('ignited');
    const [filter, setFilter] = useState<FilterOption>('All');
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    // Aggregate Stats (only count 'ignited' chains as requested)
    const ignitedChains = useMemo(() => chains.filter(c => c.type === 'ignited'), [chains]);
    const totalImpact = useMemo(() => ignitedChains.reduce((acc, chain) => acc + chain.stats.impact, 0), [ignitedChains]);
    const activeChainsCount = ignitedChains.length;
    const totalGenerations = useMemo(() => ignitedChains.reduce((acc, chain) => acc + chain.stats.generation, 0), [ignitedChains]);

    // Filter Logic
    const displayedChains = useMemo(() => chains.filter(chain => {
        // 1. Tab Filter (Ignited vs Invited)
        if (chain.type !== activeTab) return false;

        // 2. Status/Archive Filter
        if (filter === 'Archived') {
            return chain.isArchived;
        } else {
            // If not viewing Archives, hide archived items
            if (chain.isArchived) return false;

            if (filter === 'All') return true;
            return chain.status === filter;
        }
    }), [chains, activeTab, filter]);

    const filterLabel = (option: FilterOption) => {
        if (option === 'All') return t('myForward.filter.all');
        if (option === 'Active') return t('myForward.filter.active');
        if (option === 'Completed') return t('myForward.filter.completed');
        return t('myForward.filter.archived');
    };

    const toggleArchive = useCallback((id: string) => {
        setChains(prev => prev.map(chain => {
            if (chain.id === id) {
                return { ...chain, isArchived: !chain.isArchived };
            }
            return chain;
        }));
    }, []);

    const renderChainCard = useCallback(({ item }: { item: ChainItem }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push({ pathname: '/chain/[chainId]', params: { chainId: item.id } } as any)}
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

                {/* Status Badge - Moved to Top Right */}
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
                    <Text className="text-xs text-gray-400 font-medium">{t('myForward.livesTouched')}</Text>
                    <Text className="text-lg font-bold text-gray-900">{item.stats.impact}</Text>
                </View>
                <View className="items-center flex-1">
                    <Text className="text-xs text-gray-400 font-medium">{t('myForward.nextGoal')}</Text>
                    {item.status === 'Completed' ? (
                        <Text className="text-lg font-bold text-sky-500">{t('common.completed')}</Text>
                    ) : (
                        <Text className="text-lg font-bold text-sky-500">
                            {Math.pow(2, item.stats.generation) * 2} <Text className="text-xs text-gray-400 font-normal">{t('common.people')}</Text>
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
                    {t('myForward.othersJoinedWave')}
                </Text>
            </View>

            {/* Archive Button (Bottom Right) - Only for Completed chains */}
            {item.status === 'Completed' && (
                <TouchableOpacity
                    className="absolute bottom-4 right-4 p-2"
                    onPress={() => toggleArchive(item.id)}
                >
                    <Feather
                        name={item.isArchived ? "rotate-ccw" : "archive"}
                        size={16}
                        color="#6B7280"
                    />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    ), [t, toggleArchive, router]);

    return (
        <View
            className="flex-1 bg-gray-50 items-center"
            style={Platform.OS === 'web' ? { height: '100vh' as any } : { flex: 1 }}
        >
            <View className="w-full max-w-md bg-white shadow-sm overflow-hidden flex-1">
                {/* Header - Consistent with HomeFeed style but with specific title */}
                <View className="items-center justify-center py-3 border-b border-gray-100 bg-white z-20">
                    <Text className="text-lg font-bold text-gray-900 tracking-tight">{t('myForward.title')}</Text>
                </View>

                <FlatList
                    data={displayedChains}
                    keyExtractor={(item) => item.id}
                    renderItem={renderChainCard}
                    contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={Platform.OS !== 'web'}
                    ListHeaderComponent={
                        <>
                            {/* Hero Stats Card */}
                            <SafeGradient
                                colors={['#0EA5E9', '#38BDF8']}
                                className="rounded-3xl p-6 mb-8 shadow-lg shadow-sky-200"
                            >
                                <View className="flex-row justify-between items-start mb-6">
                                    <View>
                                        <Text className="text-sky-100 font-medium text-xs tracking-widest mb-1">{t('myForward.totalLivesTouched')}</Text>
                                        <Text className="text-4xl font-extrabold text-white">{totalImpact}</Text>
                                    </View>
                                    <TouchableOpacity
                                        className="bg-white/20 p-2 rounded-full"
                                        onPress={() => router.push('/chain/network')}
                                        activeOpacity={0.7}
                                    >
                                        <Feather name="globe" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>

                                <View className="flex-row gap-4">
                                    <View className="bg-black/10 flex-1 p-3 rounded-xl">
                                        <Text className="text-sky-50 text-[10px] font-bold">{t('myForward.chainsStarted')}</Text>
                                        <Text className="text-xl font-bold text-white">{activeChainsCount}</Text>
                                    </View>
                                    <View className="bg-black/10 flex-1 p-3 rounded-xl">
                                        <Text className="text-sky-50 text-[10px] font-bold">{t('myForward.totalGenerations')}</Text>
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
                                    <Text className={`font-bold ${activeTab === 'ignited' ? 'text-gray-900' : 'text-gray-500'}`}>{t('myForward.tab.ignited')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'invited' ? 'bg-white shadow-sm' : ''}`}
                                    onPress={() => setActiveTab('invited')}
                                >
                                    <Text className={`font-bold ${activeTab === 'invited' ? 'text-gray-900' : 'text-gray-500'}`}>{t('myForward.tab.invited')}</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Section Title & Filter */}
                            <View className="flex-row justify-between items-center mb-4 z-10 relative">
                                <Text className="text-lg font-bold text-gray-900">{t('myForward.myChains')}</Text>
                                <TouchableOpacity
                                    onPress={() => setFilterModalVisible(true)}
                                    className="flex-row items-center"
                                >
                                    <Text className="text-sm font-bold text-sky-500 mr-1">{filter === 'All' ? t('myForward.viewAll') : filterLabel(filter)}</Text>
                                    <Feather name="chevron-down" size={16} color="#0EA5E9" />
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                    ListEmptyComponent={
                        <View className="items-center justify-center py-10">
                            <Text className="text-gray-400 text-sm">{t('myForward.noChainsFound')}</Text>
                        </View>
                    }
                    ListFooterComponent={
                        <>
                            {activeTab === 'ignited' && filter !== 'Archived' && (
                                <TouchableOpacity
                                    onPress={() => router.push({ pathname: '/(tabs)/create-forward', params: { from: '/my-forward' } })}
                                    className="border-2 border-dashed border-gray-200 rounded-2xl p-6 items-center justify-center mt-2"
                                >
                                    <Feather name="plus-circle" size={32} color="#9CA3AF" />
                                    <Text className="text-gray-400 font-bold mt-2">{t('myForward.startNewChain')}</Text>
                                </TouchableOpacity>
                            )}
                            <View className="h-20" />
                        </>
                    }
                />

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
                            <Text className="text-lg font-bold text-gray-900 mb-4 text-center">{t('myForward.filterChains')}</Text>

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
                                        {filterLabel(option)}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity
                                className="mt-4 py-2"
                                onPress={() => setFilterModalVisible(false)}
                            >
                                <Text className="text-center text-gray-500 text-sm">{t('common.cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </View>
    );
}
