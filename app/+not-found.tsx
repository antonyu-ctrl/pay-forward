import { Feather } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center bg-white p-6">
        <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
          <Feather name="alert-circle" size={32} color="#9CA3AF" />
        </View>
        <Text className="text-lg font-bold text-gray-900 mb-2">Page Not Found</Text>
        <Text className="text-gray-500 text-center mb-6">This screen doesn't exist.</Text>
        <Link href="/" className="px-6 py-3 bg-sky-500 rounded-xl">
          <Text className="text-white font-bold">Go Home</Text>
        </Link>
      </View>
    </>
  );
}
