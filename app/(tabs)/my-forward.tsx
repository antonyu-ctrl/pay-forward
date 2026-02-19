import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SafeGradient from '../../components/SafeGradient';

// Mock Data for "My Chains"
const MY_CHAINS = [
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
        ]
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
        ]
    }
];

export default function MyForwardScreen() {
    const router = useRouter();

    // Aggregate Stats
    const totalImpact = MY_CHAINS.reduce((acc, chain) => acc + chain.stats.impact, 0);
    const activeChains = MY_CHAINS.filter(c => c.status === 'Active').length;

    const renderChainCard = ({ item }: { item: typeof MY_CHAINS[0] }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            className="bg-white mb-4 rounded-2xl p-4 border border-gray-100 shadow-sm"
        >
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-row items-center gap-3">
                    <View className={`w-10 h-10 rounded-full items-center justify-center ${item.category === 'coffee' ? 'bg-orange-100' : 'bg-blue-100'
                        }`}>
                        <Feather
                            name={item.category === 'coffee' ? 'coffee' : 'book'}
                            size={18}
                            color={item.category === 'coffee' ? '#EA580C' : '#2563EB'}
                        />
                    </View>
                    <View>
                        <Text className="font-bold text-gray-900 text-base">{item.title}</Text>
                        <Text className="text-xs text-gray-500">{item.startDate} • Gen {item.stats.generation}/{item.stats.maxDepth}</Text>
                    </View>
                </View>
                <View className={`px-2 py-1 rounded-full ${item.status === 'Active' ? 'bg-green-100' : 'bg-gray-100'
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
                {/* Header - Consistent with HomeFeed style but with specific title */}
                <View className="items-center justify-center py-3 border-b border-gray-100 bg-white z-20">
                    <Text className="text-lg font-bold text-gray-900 tracking-tight">My Impact</Text>
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
                                <Text className="text-xl font-bold text-white">{activeChains + 1}</Text>
                            </View>
                            <View className="bg-black/10 flex-1 p-3 rounded-xl">
                                <Text className="text-sky-50 text-[10px] font-bold">TOTAL GENERATIONS</Text>
                                <Text className="text-xl font-bold text-white">7</Text>
                            </View>
                        </View>
                    </SafeGradient>

                    {/* Section Title */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-gray-900">My Chains</Text>
                        <TouchableOpacity>
                            <Text className="text-sm font-bold text-sky-500">View All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Chain List */}
                    {MY_CHAINS.map(chain => (
                        <View key={chain.id}>
                            {renderChainCard({ item: chain })}
                        </View>
                    ))}

                    {/* New Chain CTA */}
                    <TouchableOpacity
                        onPress={() => router.push('/(tabs)/create-forward')}
                        className="border-2 border-dashed border-gray-200 rounded-2xl p-6 items-center justify-center mt-2"
                    >
                        <Feather name="plus-circle" size={32} color="#9CA3AF" />
                        <Text className="text-gray-400 font-bold mt-2">Start a New Chain</Text>
                    </TouchableOpacity>

                    <View className="h-20" />
                </ScrollView>
            </View>
        </View>
    );
}
