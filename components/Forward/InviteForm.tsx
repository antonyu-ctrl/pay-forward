import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Recipient {
    type: 'email' | 'user';
    value: string; // email address or userId
    displayName?: string; // For users
    avatarUrl?: string; // For users
}

interface Props {
    onRecipientsChange?: (recipients: string[]) => void; // Keeping string[] for now to maintain compat, will send values
    branchingLimit: number;
}

// Mock Search Data
const MOCK_USERS = [
    { id: 'alex', name: 'Alex Kim', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 'sarah', name: 'Sarah Lee', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 'mike', name: 'Mike Chen', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
];

export default function InviteForm({ onRecipientsChange, branchingLimit }: Props) {
    const [activeTab, setActiveTab] = useState<'search' | 'email'>('search');
    const [searchText, setSearchText] = useState('');
    const [invitedList, setInvitedList] = useState<Recipient[]>([]);

    // Helper to notify parent
    const updateParent = (newList: Recipient[]) => {
        setInvitedList(newList);
        // For compatibility with parent which expects string[], we map to value
        onRecipientsChange?.(newList.map(r => r.value));
    };

    const handleAddUser = (user: typeof MOCK_USERS[0]) => {
        if (invitedList.length >= branchingLimit) {
            Alert.alert('Limit Reached', `You can only invite ${branchingLimit} people.`);
            return;
        }
        if (invitedList.some(r => r.value === user.id && r.type === 'user')) return;

        const newRecipient: Recipient = {
            type: 'user',
            value: user.id,
            displayName: user.name,
            avatarUrl: user.avatar
        };
        updateParent([...invitedList, newRecipient]);
        setSearchText('');
    };

    const handleAddEmail = () => {
        if (!searchText.includes('@')) {
            Alert.alert('Invalid Email', 'Please enter a valid email.');
            return;
        }
        if (invitedList.length >= branchingLimit) {
            Alert.alert('Limit Reached', `You can only invite ${branchingLimit} people.`);
            return;
        }

        const newRecipient: Recipient = { type: 'email', value: searchText };
        updateParent([...invitedList, newRecipient]);
        setSearchText('');
    };

    const removeRecipient = (index: number) => {
        const newList = invitedList.filter((_, i) => i !== index);
        updateParent(newList);
    };

    const filteredUsers = searchText
        ? MOCK_USERS.filter(u => u.name.toLowerCase().includes(searchText.toLowerCase()) || u.id.includes(searchText.toLowerCase()))
        : [];

    return (
        <View className="w-full">
            {/* Input Tabs */}
            <View className="flex-row mb-3 bg-gray-100 p-1 rounded-xl">
                <TouchableOpacity
                    onPress={() => setActiveTab('search')}
                    className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'search' ? 'bg-white shadow-sm' : ''}`}
                >
                    <Text className={`text-xs font-bold ${activeTab === 'search' ? 'text-sky-600' : 'text-gray-400'}`}>SEARCH USER</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('email')}
                    className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'email' ? 'bg-white shadow-sm' : ''}`}
                >
                    <Text className={`text-xs font-bold ${activeTab === 'email' ? 'text-sky-600' : 'text-gray-400'}`}>BY EMAIL</Text>
                </TouchableOpacity>
            </View>

            {/* Input Field */}
            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 mb-2">
                <Feather name={activeTab === 'search' ? 'search' : 'mail'} size={20} color="#9CA3AF" />
                <TextInput
                    className="flex-1 ml-2 text-gray-900 text-base"
                    placeholder={activeTab === 'search' ? "Search by name or ID..." : "Enter email address..."}
                    placeholderTextColor="#9CA3AF"
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={activeTab === 'email' ? handleAddEmail : undefined}
                />
                {activeTab === 'email' && searchText.length > 0 && (
                    <TouchableOpacity onPress={handleAddEmail}>
                        <Text className="text-sky-600 font-bold ml-2">ADD</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Search Results (Dropdown-ish) */}
            {activeTab === 'search' && searchText.length > 0 && (
                <View className="bg-white border border-gray-100 rounded-xl mb-4 overflow-hidden">
                    {filteredUsers.length === 0 ? (
                        <View className="p-4 items-center">
                            <Text className="text-gray-400 text-sm">No users found.</Text>
                        </View>
                    ) : (
                        filteredUsers.map((user) => (
                            <TouchableOpacity
                                key={user.id}
                                onPress={() => handleAddUser(user)}
                                className="flex-row items-center p-3 border-b border-gray-50 active:bg-gray-50"
                            >
                                <Image source={{ uri: user.avatar }} className="w-8 h-8 rounded-full bg-gray-200" />
                                <View className="ml-3 flex-1">
                                    <Text className="font-bold text-gray-800">{user.name}</Text>
                                    <Text className="text-xs text-gray-400">@{user.id}</Text>
                                </View>
                                <Feather name="plus-circle" size={20} color="#0EA5E9" />
                            </TouchableOpacity>
                        ))
                    )}
                </View>
            )}

            {/* Invited List */}
            <View className="mt-4">
                <Text className="text-xs text-gray-400 mb-2 font-medium">
                    INVITED ({invitedList.length}/{branchingLimit})
                </Text>

                {invitedList.length === 0 ? (
                    <View className="p-6 border border-dashed border-gray-200 rounded-xl items-center bg-gray-50/50">
                        <Text className="text-gray-400 text-xs">Add people to start the chain</Text>
                    </View>
                ) : (
                    <View className="space-y-2">
                        {invitedList.map((item, index) => (
                            <View key={index} className="flex-row items-center bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                                {item.type === 'user' ? (
                                    <Image source={{ uri: item.avatarUrl }} className="w-8 h-8 rounded-full" />
                                ) : (
                                    <View className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center">
                                        <Feather name="mail" size={14} color="#EA580C" />
                                    </View>
                                )}

                                <View className="ml-3 flex-1">
                                    <Text className="text-sm font-bold text-gray-800">
                                        {item.type === 'user' ? item.displayName : item.value}
                                    </Text>
                                    {item.type === 'user' && (
                                        <Text className="text-[10px] text-gray-400">Invited via PayForward</Text>
                                    )}
                                    {item.type === 'email' && (
                                        <Text className="text-[10px] text-orange-400">Future User (Email)</Text>
                                    )}
                                </View>

                                <TouchableOpacity onPress={() => removeRecipient(index)} className="p-2">
                                    <Feather name="x" size={16} color="#9CA3AF" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </View>

        </View>
    );
}
