import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Mock Messages for Chat Detail
const MOCK_CHAT_HISTORY = [
    { id: '1', text: 'Hi there! How are you?', sender: 'them', time: '10:00 AM' },
    { id: '2', text: 'I am good, thanks! Just checking out the new PayForward app.', sender: 'me', time: '10:05 AM' },
    { id: '3', text: 'It looks great! I love the chain feature.', sender: 'them', time: '10:07 AM' },
    { id: '4', text: 'Me too. Let’s start a coffee chain soon!', sender: 'me', time: '10:10 AM' },
    { id: '5', text: 'Sounds like a plan. ☕️', sender: 'them', time: '10:12 AM' },
];

export default function ChatScreen() {
    const router = useRouter();
    const { userId } = useLocalSearchParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(MOCK_CHAT_HISTORY);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const COMMON_EMOJIS = ['😀', '😂', '😍', '🔥', '👍', '🎉', '😢', '😮', '🤔', '🙌'];

    const sendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { id: Date.now().toString(), text: message, sender: 'me', time: 'Now' }]);
            setMessage('');
            setShowEmojiPicker(false);
        }
    };

    const addEmoji = (emoji: string) => {
        setMessage(prev => prev + emoji);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Fixed Header */}
            <View className="flex-row items-center px-4 py-3 border-b border-gray-100 bg-white z-10">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Feather name="arrow-left" size={24} color="#111827" />
                </TouchableOpacity>
                <View className="flex-1 items-center mr-8"> {/* mr-8 balances the back button width */}
                    <Text className="text-lg font-bold text-gray-900 tracking-tight">{userId}</Text>
                </View>
            </View>

            {/* Chat Messages */}
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                className="flex-1 px-4 py-2"
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View className={`mb-3 max-w-[80%] ${item.sender === 'me' ? 'self-end' : 'self-start'}`}>
                        <View className={`px-4 py-3 rounded-2xl ${item.sender === 'me'
                                ? 'bg-sky-500 rounded-tr-none'
                                : 'bg-gray-100 rounded-tl-none'
                            }`}>
                            <Text className={item.sender === 'me' ? 'text-white' : 'text-gray-900'}>
                                {item.text}
                            </Text>
                        </View>
                        <Text className={`text-[10px] mt-1 text-gray-400 ${item.sender === 'me' ? 'text-right' : 'text-left'}`}>
                            {item.time}
                        </Text>
                    </View>
                )}
            />

            {/* Input Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <View className="bg-gray-50 border-t border-gray-100 px-4 py-3 flex-row flex-wrap justify-between">
                        {COMMON_EMOJIS.map((emoji) => (
                            <TouchableOpacity key={emoji} onPress={() => addEmoji(emoji)} className="p-2">
                                <Text className="text-2xl">{emoji}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <View className="px-4 py-3 border-t border-gray-100 flex-row items-center bg-white pb-8">
                    <TouchableOpacity
                        onPress={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="mr-3"
                    >
                        <Feather name="smile" size={24} color={showEmojiPicker ? "#0EA5E9" : "#9CA3AF"} />
                    </TouchableOpacity>

                    <TextInput
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 mr-3 text-base"
                        placeholder="Type a message..."
                        value={message}
                        onChangeText={setMessage}
                        returnKeyType="send"
                        onSubmitEditing={sendMessage}
                        onFocus={() => setShowEmojiPicker(false)} // Hide picker when typing starts
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        className={`w-12 h-12 rounded-full items-center justify-center ${message.trim() ? 'bg-sky-500' : 'bg-gray-200'}`}
                        disabled={!message.trim()}
                    >
                        <Feather name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
