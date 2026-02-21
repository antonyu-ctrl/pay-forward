import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AnimatedGradientBorder from '../UI/AnimatedGradientBorder';

// Shared data source — only users with active chain activity appear here
// In production, this would be fetched from the backend (followed users with incomplete chains they initiated)
const ACTIVE_CHAIN_USERS = [
    { id: '1', username: 'alex', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: '2', username: 'sarah', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: '4', username: 'emily', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: '7', username: 'james', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
];

const ForwardBar = () => {
    const router = useRouter();

    return (
        <View className="py-3 border-b border-gray-100 bg-white">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>

                {/* Start Forwarding Button — same height alignment as avatars */}
                <TouchableOpacity
                    className="items-center mr-4"
                    onPress={() => router.push('/create-forward')}
                >
                    <View className="mb-1">
                        <View className="w-[68px] h-[68px] rounded-full border-2 border-dashed border-sky-500 items-center justify-center bg-sky-50">
                            <Feather name="plus" size={24} color="#0EA5E9" />
                        </View>
                    </View>
                    <Text className="text-xs text-gray-600 mt-1 font-medium">Start</Text>
                </TouchableOpacity>

                {/* Active Chain Users Only */}
                {ACTIVE_CHAIN_USERS.map((user) => (
                    <TouchableOpacity
                        key={user.id}
                        className="items-center mr-4"
                        onPress={() => router.push({ pathname: '/chain/[userId]', params: { userId: user.username } })}
                    >
                        <View className="mb-1">
                            <AnimatedGradientBorder
                                size={68}
                                borderWidth={3}
                                colors={['#0369A1', '#38BDF8', '#E0F2FE', '#38BDF8', '#0369A1']}
                            >
                                <Image
                                    source={{ uri: user.avatarUrl }}
                                    className="w-[60px] h-[60px] rounded-full border-2 border-white"
                                />
                            </AnimatedGradientBorder>
                        </View>
                        <Text className="text-xs text-gray-600 mt-1">{user.username}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default ForwardBar;
