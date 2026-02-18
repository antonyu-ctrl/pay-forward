import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    Extrapolation,
    SharedValue,
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const SPACING = (width - CARD_WIDTH) / 2;

export type CategoryType = 'coffee' | 'meal' | 'support' | 'knowledge' | 'help';

interface Category {
    id: CategoryType;
    title: string;
    subtitle: string;
    icon: keyof typeof Feather.glyphMap;
    colors: string[];
}

const CATEGORIES: Category[] = [
    {
        id: 'coffee',
        title: 'Coffee Break',
        subtitle: 'Share a moment of relaxation',
        icon: 'coffee',
        colors: ['#B45309', '#F59E0B'], // Amber
    },
    {
        id: 'meal',
        title: 'Warm Meal',
        subtitle: 'Feed someone in need',
        icon: 'heart',
        colors: ['#BE123C', '#FB7185'], // Rose
    },
    {
        id: 'knowledge',
        title: 'Share Wisdom',
        subtitle: 'Books, mentorship, or advice',
        icon: 'book-open',
        colors: ['#1D4ED8', '#60A5FA'], // Blue
    },
    {
        id: 'support',
        title: 'Cheer Up',
        subtitle: 'Emotional support & kindness',
        icon: 'sun',
        colors: ['#047857', '#34D399'], // Emerald
    },
    {
        id: 'help',
        title: 'Just Help',
        subtitle: 'Any act of kindness',
        icon: 'gift',
        colors: ['#7C3AED', '#A78BFA'], // Violet
    },
];

interface Props {
    onSelect: (category: CategoryType) => void;
    selectedDetails?: CategoryType;
}

const CategoryCard = ({ item, index, scrollX, isSelected }: { item: Category, index: number, scrollX: SharedValue<number>, isSelected: boolean }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
        ];

        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.6, 1, 0.6],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity,
        };
    });

    return (
        <Animated.View style={[animatedStyle, { width: CARD_WIDTH }]} className="h-[400px] px-2">
            <TouchableOpacity activeOpacity={0.9} className="flex-1">
                <LinearGradient
                    colors={item.colors as any}
                    className="flex-1 rounded-3xl p-6 justify-between shadow-lg"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ shadowColor: item.colors[0], shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 }}
                >
                    <View className="bg-white/20 p-4 rounded-full self-start backdrop-blur-md">
                        <Feather name={item.icon} size={32} color="white" />
                    </View>

                    <View>
                        <Text className="text-white text-3xl font-bold mb-2">{item.title}</Text>
                        <Text className="text-white/90 text-lg font-medium">{item.subtitle}</Text>
                    </View>

                    {
                        isSelected && (
                            <View className="absolute top-6 right-6 bg-white rounded-full p-2">
                                <Feather name="check" size={20} color={item.colors[0]} />
                            </View>
                        )
                    }
                </LinearGradient >
            </TouchableOpacity >
        </Animated.View >
    );
};

export default function CategoryCarousel({ onSelect }: Props) {
    const scrollX = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollX.value = event.nativeEvent.contentOffset.x;
    };

    const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
        if (index !== currentIndex && index >= 0 && index < CATEGORIES.length) {
            setCurrentIndex(index);
            onSelect(CATEGORIES[index].id);
        }
    };

    return (
        <View className="py-8">
            <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
                Choose a Theme
            </Text>
            <Text className="text-gray-500 text-center mb-6">
                What kind of spark do you want to start?
            </Text>

            <Animated.FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH}
                decelerationRate="fast"
                contentContainerStyle={{
                    paddingHorizontal: SPACING,
                }}
                onScroll={onScroll}
                onMomentumScrollEnd={onMomentumScrollEnd}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => (
                    <CategoryCard
                        item={item}
                        index={index}
                        scrollX={scrollX}
                        isSelected={index === currentIndex}
                    />
                )}
            />
        </View>
    );
}
