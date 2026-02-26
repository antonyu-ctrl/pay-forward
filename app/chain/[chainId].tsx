import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChainTimelineEvent, getChainById } from '../../data/mockChains';
import { useI18n } from '../../lib/i18n';

export default function ChainDetailScreen() {
    const router = useRouter();
    const { chainId, senderMessage } = useLocalSearchParams<{ chainId: string; senderMessage?: string }>();
    const { t } = useI18n();
    const chain = useMemo(() => getChainById(chainId), [chainId]);

    if (!chain) {
        return (
            <View className="flex-1 bg-gray-50 items-center justify-center">
                <Text className="text-gray-500">Chain not found</Text>
            </View>
        );
    }

    const statusBadgeStyle = (status: ChainTimelineEvent['status']) => {
        switch (status) {
            case 'response_needed':
                return { bg: 'bg-orange-100', text: 'text-orange-600', label: t('chain.responseNeeded') };
            case 'pay_forward_response':
                return { bg: 'bg-teal-100', text: 'text-teal-600', label: t('chain.payForwardResponse') };
            case 'completed':
                return { bg: 'bg-gray-100', text: 'text-gray-500', label: t('chain.completed') };
        }
    };

    const dotColor = (status: ChainTimelineEvent['status']) => {
        switch (status) {
            case 'response_needed': return 'bg-orange-400';
            case 'pay_forward_response': return 'bg-teal-400';
            case 'completed': return 'bg-gray-400';
        }
    };

    const iconForStatus = (status: ChainTimelineEvent['status']) => {
        switch (status) {
            case 'response_needed': return 'alert-circle' as const;
            case 'pay_forward_response': return 'check-circle' as const;
            case 'completed': return 'award' as const;
        }
    };

    const iconColorForStatus = (status: ChainTimelineEvent['status']) => {
        switch (status) {
            case 'response_needed': return '#FB923C';
            case 'pay_forward_response': return '#2DD4BF';
            case 'completed': return '#9CA3AF';
        }
    };

    const renderTimelineItem = (event: ChainTimelineEvent, index: number, isLast: boolean) => {
        const badge = statusBadgeStyle(event.status);

        return (
            <View key={event.id} className="flex-row">
                {/* Timeline line + dot */}
                <View className="w-6 items-center mr-3">
                    <View className={`w-3 h-3 rounded-full ${dotColor(event.status)} z-10 border-2 border-white shadow-sm`} />
                    {!isLast && (
                        <View
                            className="flex-1 w-0"
                            style={{ borderLeftWidth: 2, borderStyle: 'dashed', borderColor: '#D1D5DB' }}
                        />
                    )}
                </View>

                {/* Card */}
                <View className="flex-1 mb-4">
                    <View
                        className="bg-white rounded-2xl p-4 shadow-sm"
                        style={{
                            borderWidth: event.status === 'response_needed' ? 2 : 1,
                            borderColor: event.status === 'response_needed' ? '#FDBA74' : '#F3F4F6',
                        }}
                    >
                        {/* Status badge */}
                        <View className={`self-start px-2.5 py-1 rounded-md mb-3 ${badge.bg}`}>
                            <Text className={`text-[10px] font-bold tracking-wide ${badge.text}`}>
                                {badge.label}
                            </Text>
                        </View>

                        {/* Avatar + name + time */}
                        <View className="flex-row items-center mb-2">
                            <Image
                                source={{ uri: event.participant.avatarUrl }}
                                className="w-9 h-9 rounded-full mr-2.5"
                                contentFit="cover"
                            />
                            <View className="flex-1">
                                <Text className="font-bold text-gray-900 text-sm">{event.participant.name}</Text>
                                <Text className="text-[11px] text-gray-400">{event.time}</Text>
                            </View>

                            {/* Right icon indicator */}
                            <View
                                className="w-8 h-8 rounded-full items-center justify-center"
                                style={{ backgroundColor: event.status === 'response_needed' ? '#FFF7ED' : '#F0FDFA' }}
                            >
                                <Feather name={iconForStatus(event.status)} size={16} color={iconColorForStatus(event.status)} />
                            </View>
                        </View>

                        {/* Message */}
                        <Text className="text-gray-600 text-sm leading-5 mb-3">{event.message}</Text>

                        {/* Action row */}
                        <View className="flex-row items-center pt-2 border-t border-gray-50">
                            <TouchableOpacity className="flex-row items-center mr-4">
                                <Feather name="heart" size={14} color="#9CA3AF" />
                                {event.reactions > 0 && (
                                    <Text className="text-xs text-gray-400 ml-1">+{event.reactions} others celebrated this</Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* React button for response_needed */}
                        {event.status === 'response_needed' && (
                            <TouchableOpacity className="flex-row items-center mt-3 bg-sky-50 py-2 px-3 rounded-lg self-start">
                                <Feather name="heart" size={14} color="#0EA5E9" />
                                <Text className="text-sky-600 text-xs font-bold ml-1.5">{t('chain.react')}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View
            className="flex-1 bg-gray-50 items-center"
            style={Platform.OS === 'web' ? ({ height: '100vh' } as any) : { flex: 1 }}
        >
            <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden flex flex-col">
                <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                    <Stack.Screen options={{ headerShown: false }} />

                    {/* Header */}
                    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                        <TouchableOpacity
                            onPress={() => {
                                if (router.canGoBack()) router.back();
                                else router.replace('/(tabs)/my-forward' as any);
                            }}
                            className="w-8"
                        >
                            <Feather name="arrow-left" size={24} color="#111827" />
                        </TouchableOpacity>
                        <Text className="text-lg font-bold text-gray-900 tracking-tight">{t('chain.history')}</Text>
                        <TouchableOpacity className="flex-row items-center">
                            <Text className="text-sky-500 font-bold text-sm mr-1">{t('chain.filter')}</Text>
                            <Feather name="sliders" size={16} color="#0EA5E9" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        className="flex-1"
                        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Forwarded message banner (from inbox navigation) */}
                        {senderMessage && (
                            <View className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-4">
                                <View className="flex-row items-center mb-2">
                                    <Feather name="message-circle" size={16} color="#0EA5E9" />
                                    <Text className="text-sky-700 font-bold text-sm ml-2">{t('chain.forwardedMessage')}</Text>
                                </View>
                                <Text className="text-sky-800 text-sm leading-5">{senderMessage}</Text>
                            </View>
                        )}

                        {/* Chain summary card */}
                        <View className="bg-white rounded-2xl p-4 mb-6 border border-gray-100 shadow-sm">
                            <View className="flex-row items-center mb-3">
                                <View className={`w-10 h-10 rounded-full items-center justify-center ${chain.category === 'coffee' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                                    <Feather
                                        name={chain.category === 'coffee' ? 'coffee' : 'book'}
                                        size={18}
                                        color={chain.category === 'coffee' ? '#EA580C' : '#2563EB'}
                                    />
                                </View>
                                <View className="flex-1 ml-3">
                                    <Text className="font-bold text-gray-900 text-base">{chain.title}</Text>
                                    <Text className="text-xs text-gray-500">{chain.startDate} • Gen {chain.stats.generation}/{chain.stats.maxDepth}</Text>
                                </View>
                                <View className={`px-2 py-1 rounded-md ${chain.status === 'Active' ? 'bg-green-100' : 'bg-gray-100'}`}>
                                    <Text className={`text-[10px] font-bold ${chain.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                                        {chain.status.toUpperCase()}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row">
                                <View className="flex-1 bg-gray-50 p-3 rounded-xl mr-2 items-center">
                                    <Text className="text-xs text-gray-400 font-medium">Lives Touched</Text>
                                    <Text className="text-lg font-bold text-gray-900">{chain.stats.impact}</Text>
                                </View>
                                <View className="flex-1 bg-gray-50 p-3 rounded-xl items-center">
                                    <Text className="text-xs text-gray-400 font-medium">Participants</Text>
                                    <View className="flex-row mt-1">
                                        {chain.participants.slice(0, 3).map((url, i) => (
                                            <Image
                                                key={i}
                                                source={{ uri: url }}
                                                className="w-6 h-6 rounded-full border-2 border-white -ml-1"
                                                contentFit="cover"
                                            />
                                        ))}
                                        {chain.participants.length > 3 && (
                                            <View className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white -ml-1 items-center justify-center">
                                                <Text className="text-[8px] text-gray-500 font-bold">+{chain.participants.length - 3}</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Timeline */}
                        <View className="ml-1">
                            {chain.timeline.map((event, index) =>
                                renderTimelineItem(event, index, index === chain.timeline.length - 1)
                            )}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
}
