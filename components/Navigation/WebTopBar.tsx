import { Feather, Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function WebTopBar() {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <View className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
            <View className="flex-row items-center justify-between px-4 py-4 max-w-7xl mx-auto w-full">
                <View className="flex-row items-center justify-between px-4 py-4 max-w-7xl mx-auto w-full">
                    {/* Logo area - Left Section */}
                    <View className="flex-1 flex-row justify-start">
                        <TouchableOpacity onPress={() => router.push('/')} className="flex-row items-center">
                            <View className="w-8 h-8 bg-sky-500 rounded-lg items-center justify-center mr-2">
                                <Ionicons name="heart" size={18} color="white" />
                            </View>
                            <Text className="text-xl font-bold text-gray-900 tracking-tight">PayForward</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Navigation Links - Center Section */}
                    <View className="flex-row items-center justify-center space-x-8 gap-8">
                        <TouchableOpacity onPress={() => router.push('/')} className="flex-row items-center">
                            <Feather name="home" size={20} color={isActive('/') ? '#0EA5E9' : '#4B5563'} />
                            <Text className={`ml-2 font-medium ${isActive('/') ? 'text-sky-500' : 'text-gray-600'}`}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/my-forward')} className="flex-row items-center">
                            <Feather name="layers" size={20} color={isActive('/my-forward') ? '#0EA5E9' : '#4B5563'} />
                            <Text className={`ml-2 font-medium ${isActive('/my-forward') ? 'text-sky-500' : 'text-gray-600'}`}>My Forward</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/inbox')} className="flex-row items-center">
                            <Feather name="send" size={20} color={isActive('/inbox') ? '#0EA5E9' : '#4B5563'} />
                            <Text className={`ml-2 font-medium ${isActive('/inbox') ? 'text-sky-500' : 'text-gray-600'}`}>Inbox</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/profile')} className="flex-row items-center">
                            <Feather name="user" size={20} color={isActive('/profile') ? '#0EA5E9' : '#4B5563'} />
                            <Text className={`ml-2 font-medium ${isActive('/profile') ? 'text-sky-500' : 'text-gray-600'}`}>Profile</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Right Action Area - Right Section */}
                    <View className="flex-1 flex-row justify-end items-center gap-4">
                        {/* Placeholder for future use (e.g. Notifications) */}
                        <View className="w-8" />
                    </View>
                </View>
            </View>
        </View>
    );
}
