import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);

    const handleIgnite = () => {
        // Validation: Must match branching count exactly
        if (recipients.length !== branching) {
            setShowWarningModal(true);
            return;
        }

        // Show Custom Confirmation Modal
        setShowConfirmModal(true);
    };

    const proceedToFeed = () => {
        setShowConfirmModal(false); // Close modal


        try {
            router.push({
                pathname: '/feed/create',
                params: {
                    origin: 'new_chain',
                    category,
                    branching,
                    depth,
                    recipients: JSON.stringify(recipients)
                }
            });
        } catch (error) {
            console.error("Navigation error:", error);
            alert("Navigation Error. Please restart the app.");
        }
    };

    return (
        <View className="flex-1 bg-gray-50 items-center relative">
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
                                    className="w-full bg-sky-500 py-4 rounded-xl items-center justify-center shadow-lg shadow-sky-100 flex-row gap-2"
                                >
                                    <Text className="text-white font-bold text-base">
                                        Ignite Chain
                                    </Text>
                                    <Feather name="zap" size={20} color="white" />
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>

                    {/* Custom Confirmation Modal */}
                    {showConfirmModal && (
                        <View className="absolute inset-0 z-50 bg-black/50 items-center justify-center p-6">
                            <View className="bg-white rounded-2xl p-6 w-full max-w-sm items-center shadow-2xl">
                                <View className="w-12 h-12 bg-sky-100 rounded-full items-center justify-center mb-4">
                                    <Feather name="check" size={24} color="#0EA5E9" />
                                </View>
                                <Text className="text-lg font-bold text-gray-900 mb-2">Ready to Inspire?</Text>
                                <Text className="text-gray-500 text-center mb-6 leading-relaxed">
                                    You should have already performed the first act of kindness. Are you ready to post your story?
                                </Text>
                                <View className="flex-row w-full gap-3">
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmModal(false)}
                                        className="flex-1 py-3 bg-gray-100 rounded-xl items-center"
                                    >
                                        <Text className="text-gray-700 font-bold">Not Yet</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={proceedToFeed}
                                        className="flex-1 py-3 bg-sky-500 rounded-xl items-center"
                                    >
                                        <Text className="text-white font-bold">Yes, Let's Go</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Friendly Warning Modal */}
                    {showWarningModal && (
                        <View className="absolute inset-0 z-50 bg-black/50 items-center justify-center p-6">
                            <View className="bg-white rounded-2xl p-6 w-full max-w-sm items-center shadow-2xl">
                                <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mb-4">
                                    <Feather name="users" size={24} color="#F97316" />
                                </View>
                                <Text className="text-lg font-bold text-gray-900 mb-2">Almost Ready!</Text>
                                <Text className="text-gray-500 text-center mb-6 leading-relaxed">
                                    To spread the love as you planned, please invite exactly <Text className="font-bold text-gray-800">{branching}</Text> friends.
                                    {'\n'}Currently selected: <Text className="font-bold text-orange-500">{recipients.length}</Text>
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowWarningModal(false)}
                                    className="w-full py-3 bg-sky-500 rounded-xl items-center"
                                >
                                    <Text className="text-white font-bold">Okay, I'll add more</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                </SafeAreaView>
            </View>
        </View>
    );
}
