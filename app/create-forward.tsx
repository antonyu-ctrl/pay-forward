import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateForwardScreen() {
    const router = useRouter();
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="x" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Start Forwarding</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1 p-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6">Who are you helping today?</Text>

                <View className="mb-6">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Recipient</Text>
                    <TextInput
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
                        placeholder="@username or name"
                        value={recipient}
                        onChangeText={setRecipient}
                    />
                </View>

                <View className="mb-8">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Message</Text>
                    <TextInput
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base min-h-[120px]"
                        placeholder="What act of kindness did you do?"
                        multiline
                        textAlignVertical="top"
                        value={message}
                        onChangeText={setMessage}
                    />
                </View>

                <TouchableOpacity
                    className="w-full bg-green-500 py-4 rounded-xl items-center shadow-sm"
                    onPress={() => router.back()} // Mock action
                >
                    <Text className="text-white font-bold text-lg">Start Chain</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
