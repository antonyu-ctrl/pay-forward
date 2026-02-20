import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AnimatedGradientBorder from '../UI/AnimatedGradientBorder';

// Dummy Data for Forward Chains
const FORWARD_DATA = [
    { id: '1', username: 'alex', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: true },
    { id: '2', username: 'sarah', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: true },
    { id: '3', username: 'mike', avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: false },
    { id: '4', username: 'emily', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: true },
    { id: '5', username: 'david', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', hasActiveChain: false },
];

const ForwardBar = () => {
    const router = useRouter();

    return (
        <View className="py-3 border-b border-gray-100 bg-white">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>

                {/* Start Forwarding Button */}
                <TouchableOpacity
                    className="items-center mr-5"
                    onPress={() => router.push('/create-forward')}
                >
                    <View className="w-16 h-16 rounded-full border-2 border-dashed border-sky-500 items-center justify-center bg-sky-50 mb-1">
                        <Feather name="plus" size={24} color="#0EA5E9" />
                    </View>
                    <Text className="text-xs font-medium text-gray-900">Start Forward</Text>
                </TouchableOpacity>

                {/* Friends List */}
                {FORWARD_DATA.map((story) => (
                    <TouchableOpacity
                        key={story.id}
                        className="items-center mr-4"
                        onPress={() => router.push({ pathname: '/chain/[userId]', params: { userId: story.username } })}
                    >
                        {story.hasActiveChain ? (
                            <View className="mb-1">
                                <AnimatedGradientBorder
                                    size={68}
                                    borderWidth={3}
                                    colors={['#0369A1', '#38BDF8', '#E0F2FE', '#38BDF8', '#0369A1']}
                                >
                                    <Image
                                        source={{ uri: story.avatarUrl }}
                                        className="w-[60px] h-[60px] rounded-full border-2 border-white"
                                    />
                                </AnimatedGradientBorder>
                            </View>
                        ) : (
                            <View className="p-[2px] rounded-full border border-gray-200 mb-1">
                                <Image
                                    source={{ uri: story.avatarUrl }}
                                    className="w-[60px] h-[60px] rounded-full border-2 border-white"
                                />
                            </View>
                        )}
                        <Text className="text-xs text-gray-600 mt-1">{story.username}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default ForwardBar;
