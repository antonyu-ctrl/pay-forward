import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

interface Props {
    posts: string[]
}

export default function ProfileContent({ posts }: Props) {
    return (
        <View className="flex-1 bg-white">
            <View className="flex-row flex-wrap">
                {posts.map((img, i) => (
                    <TouchableOpacity
                        key={i}
                        activeOpacity={0.8}
                        style={{ width: '33.33%', aspectRatio: 1, padding: 0.5 }}
                    >
                        <Image
                            source={{ uri: img }}
                            className="w-full h-full bg-gray-100"
                            contentFit="cover"
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
