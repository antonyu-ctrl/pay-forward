import { Feather } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { PanResponder, Text, View } from 'react-native';

interface CustomSliderProps {
    value: number;
    min: number;
    max: number;
    onChange: (val: number) => void;
    label: string;
    icon: any;
}

export default function CustomSlider({ value, min, max, onChange, label, icon }: CustomSliderProps) {
    const [width, setWidth] = useState(0);
    const sliderRef = useRef<View>(null);

    // Calculate percentage for display
    const range = max - min;
    const percentage = ((value - min) / range) * 100;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
            updateValue(evt.nativeEvent.locationX);
        },
        onPanResponderMove: (evt) => {
            updateValue(evt.nativeEvent.locationX);
        },
    });

    const updateValue = (x: number) => {
        if (width === 0) return;

        let newHeaderX = x;
        if (newHeaderX < 0) newHeaderX = 0;
        if (newHeaderX > width) newHeaderX = width;

        const newPercent = newHeaderX / width;
        const newValue = min + (range * newPercent);

        onChange(newValue);
    };

    return (
        <View className="mb-6">
            <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                    <Feather name={icon} size={16} color="#9CA3AF" />
                    <Text className="text-gray-400 text-xs font-bold ml-2 uppercase">{label}</Text>
                </View>
                <Text className="text-sky-500 text-xs font-bold">{value.toFixed(1)}</Text>
            </View>

            <View
                className="h-10 justify-center"
                {...panResponder.panHandlers}
            >
                {/* Track Background */}
                <View
                    className="h-2 bg-gray-800 rounded-full w-full absolute"
                    onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
                />

                {/* Active Track */}
                <View
                    className="h-2 bg-sky-500 rounded-full absolute"
                    style={{ width: `${percentage}%` }}
                />

                {/* Thumb */}
                <View
                    className="w-6 h-6 bg-white rounded-full absolute shadow-lg border-2 border-sky-500"
                    style={{ left: `${percentage}%`, marginLeft: -12 }}
                />
            </View>
        </View>
    );
}
