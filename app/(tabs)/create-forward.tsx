import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Components
import ImpactCalculator from '../../components/Forward/ImpactCalculator';
import InviteForm from '../../components/Forward/InviteForm';
import MiniCategorySelector, { CategoryType } from '../../components/Forward/MiniCategorySelector';

export default function CreateForwardScreen() {
    const router = useRouter();

    const [category, setCategory] = useState<CategoryType>('coffee');
    const [branching, setBranching] = useState(2);
    const [depth, setDepth] = useState(3);
    const [recipients, setRecipients] = useState<string[]>([]);

    const handleIgnite = () => {
        if (recipients.length < 1) {
            const msg = "Please invite at least one person to start the chain.";
            if (Platform.OS === 'web') alert(msg);
            else Alert.alert('Missing Info', msg);
            return;
        }

        console.log('Igniting Chain!', { category, branching, depth, recipients });
        router.push('/(tabs)');
    };

    return (
        <View className="flex-1 bg-gray-50 items-center">
            <Stack.Screen options={{ headerShown: false }} />
            <View className="w-full max-w-md h-full bg-white shadow-sm overflow-hidden">
                <SafeAreaView className="flex-1 bg-white">

                    {/* Header */}
                    <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-50 bg-white z-10">
                        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                            <Feather name="chevron-left" size={26} color="#4B5563" />
                        </TouchableOpacity>

                        <Text className="text-base font-bold text-gray-900">New Chain</Text>

                        <View className="w-10" />
                    </View>

                    {/* Single Scroll Content */}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        className="flex-1"
                    >
                        <ScrollView
                            className="flex-1"
                            contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
                            showsVerticalScrollIndicator={false}
                        >

                            {/* Section 1: Theme */}
                            <View className="mb-8">
                                <MiniCategorySelector selected={category} onSelect={setCategory} />
                            </View>

                            {/* Section 2: Rules (Impact) */}
                            <View className="mb-8">
                                <Text className="text-xs font-bold text-gray-500 mb-3 px-1 tracking-widest">DESIGN RULES</Text>
                                <View className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                                    <ImpactCalculator
                                        initialBranching={branching}
                                        initialDepth={depth}
                                        onChange={(b, d) => {
                                            setBranching(b);
                                            setDepth(d);
                                        }}
                                    />
                                </View>
                            </View>

                            {/* Section 3: Invite */}
                            <View className="mb-8">
                                <Text className="text-xs font-bold text-gray-500 mb-3 px-1 tracking-widest">INVITE STARTERS</Text>
                                <InviteForm
                                    branchingLimit={branching}
                                    onRecipientsChange={setRecipients}
                                />
                            </View>

                            {/* Bottom Button (Static) */}
                            <View className="mt-4 mb-8">
                                <TouchableOpacity
                                    onPress={handleIgnite}
                                    activeOpacity={0.8}
                                    className="w-full bg-sky-500 py-4 rounded-xl items-center shadow-lg shadow-sky-100"
                                >
                                    <Text className="text-white font-bold text-base">
                                        Ignite Chain 🔥
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>

                </SafeAreaView>
            </View>
        </View>
    );
}
