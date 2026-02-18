import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface Props {
    initialBranching?: number;
    initialDepth?: number;
    onChange: (branching: number, depth: number) => void;
}

export default function ImpactCalculator({ initialBranching = 2, initialDepth = 3, onChange }: Props) {
    const [branching, setBranching] = useState(initialBranching);
    const [depth, setDepth] = useState(initialDepth);

    const calculateTotalPeople = (r: number, n: number) => {
        if (r === 1) return n;
        return (r * (Math.pow(r, n) - 1)) / (r - 1);
    };

    const totalPeople = calculateTotalPeople(branching, depth);

    useEffect(() => {
        onChange(branching, depth);
    }, [branching, depth]);

    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withSpring(1.2, {}, () => {
            scale.value = withSpring(1);
        });
    }, [totalPeople]);

    const animatedNumberStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <View className="w-full">
            {/* Controls Container - Compact */}
            <View className="space-y-4 mb-6">

                {/* Branching Factor Control */}
                <View className="flex-row items-center justify-between">
                    <Text className="text-gray-600 font-medium text-sm">Pass to</Text>
                    <View className="flex-row space-x-2">
                        {[2, 3, 4].map((num) => (
                            <TouchableOpacity
                                key={num}
                                onPress={() => setBranching(num)}
                                className={`w-8 h-8 rounded-full border items-center justify-center ${branching === num
                                    ? 'bg-sky-500 border-sky-500'
                                    : 'bg-white border-gray-200'
                                    }`}
                            >
                                <Text className={`text-xs font-bold ${branching === num ? 'text-white' : 'text-gray-400'}`}>
                                    {num}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Depth Control */}
                <View className="flex-row items-center justify-between">
                    <Text className="text-gray-600 font-medium text-sm">Generations</Text>
                    <View className="flex-row items-center bg-white rounded-full border border-gray-200 px-1 py-1">
                        <TouchableOpacity
                            onPress={() => setDepth(Math.max(2, depth - 1))}
                            className="w-7 h-7 bg-gray-50 rounded-full items-center justify-center"
                        >
                            <Feather name="minus" size={14} color="#6B7280" />
                        </TouchableOpacity>

                        <Text className="text-sm font-bold text-gray-800 w-8 text-center">
                            {depth}
                        </Text>

                        <TouchableOpacity
                            onPress={() => setDepth(Math.min(10, depth + 1))}
                            className="w-7 h-7 bg-gray-50 rounded-full items-center justify-center"
                        >
                            <Feather name="plus" size={14} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            {/* Impact Metric - Moved to Bottom & Compact */}
            <View className="items-center pt-4 border-t border-gray-100">
                <Text className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wider">
                    People will be touched
                </Text>
                <Animated.Text
                    style={[animatedNumberStyle, { color: '#0EA5E9', fontSize: 32, fontWeight: '800' }]}
                >
                    {totalPeople.toLocaleString()}
                </Animated.Text>
            </View>
        </View>
    );
}
