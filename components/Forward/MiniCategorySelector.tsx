import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export type CategoryType = 'coffee' | 'meal' | 'book' | 'cheer' | 'mentor' | 'gift' | 'thanks';

// Using Feather icon names
const CATEGORIES: { id: CategoryType; label: string; icon: keyof typeof Feather.glyphMap }[] = [
    { id: 'coffee', label: 'Coffee', icon: 'coffee' },
    { id: 'meal', label: 'Meal', icon: 'heart' },
    { id: 'book', label: 'Book', icon: 'book' },
    { id: 'cheer', label: 'Cheer Up', icon: 'sun' },     // Encouragement
    { id: 'mentor', label: 'Mentor', icon: 'briefcase' }, // Work/Advice
    { id: 'gift', label: 'Gift', icon: 'gift' },         // General Gift
    { id: 'thanks', label: 'Thanks', icon: 'star' },     // Gratitude
];

interface MiniCategorySelectorProps {
    selected: CategoryType;
    onSelect: (category: CategoryType) => void;
}

export default function MiniCategorySelector({ selected, onSelect }: MiniCategorySelectorProps) {
    return (
        <View className="py-2">
            <Text className="text-xs font-bold text-gray-500 mb-3 px-1 tracking-widest">CHOOSE THEME</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-1">
                {CATEGORIES.map((cat) => {
                    const isSelected = selected === cat.id;
                    return (
                        <TouchableOpacity
                            key={cat.id}
                            onPress={() => onSelect(cat.id)}
                            activeOpacity={0.7}
                            className="mr-3"
                        >
                            <View
                                className={`items-center justify-center w-16 h-20 rounded-xl border-2 ${isSelected
                                        ? 'border-sky-500 bg-sky-100' // Selected: Darker border & bg
                                        : 'border-transparent bg-sky-50' // Default: Light bg, no border
                                    }`}
                            >
                                <Feather
                                    name={cat.icon}
                                    size={24}
                                    color={isSelected ? '#0284c7' : '#7dd3fc'}
                                    style={{ marginBottom: 4 }}
                                />
                                <Text
                                    numberOfLines={1}
                                    className={`text-[10px] font-bold px-1 ${isSelected ? 'text-sky-700' : 'text-sky-300'
                                        }`}>
                                    {cat.label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                <View className="w-4" />
            </ScrollView>
        </View>
    );
}
