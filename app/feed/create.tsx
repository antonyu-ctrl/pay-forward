import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import SafeGradient from '../../components/SafeGradient';
import CustomSlider from '../../components/UI/CustomSlider';

const { width } = Dimensions.get('window');

type Step = 'PICKER' | 'EDITOR' | 'POST';

export default function CreateFeedScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const isNewChain = params.origin === 'new_chain';
    const lockedRecipients = params.recipients ? JSON.parse(params.recipients as string) : [];

    const [step, setStep] = useState<Step>('PICKER');
    const [images, setImages] = useState<string[]>([]);
    const [caption, setCaption] = useState('');

    // Editor State (Mock Filters)
    const [selectedFilter, setSelectedFilter] = useState('Normal');

    // Step 1: Pick Images
    const pickImages = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            selectionLimit: 5,
            quality: 0.8,
        });

        if (!result.canceled) {
            const uris = result.assets.map(asset => asset.uri);
            setImages([...images, ...uris]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    // Navigation Handlers
    const handleNext = () => {
        if (step === 'PICKER') setStep('EDITOR');
        else if (step === 'EDITOR') setStep('POST');
        else handlePost();
    };

    const handleBack = () => {
        if (step === 'POST') setStep('EDITOR');
        else if (step === 'EDITOR') setStep('PICKER');
        else router.back();
    };

    const handlePost = () => {
        // Post logic here
        router.push('/(tabs)'); // Go back home after posting
    };

    // Render Steps
    const renderPicker = () => (
        <View className="flex-1">
            <View className="flex-1 items-center justify-center bg-gray-50 m-4 rounded-xl border-dashed border-2 border-gray-300">
                {images.length === 0 ? (
                    <TouchableOpacity onPress={pickImages} className="items-center">
                        <Feather name="image" size={48} color="#9CA3AF" />
                        <Text className="text-gray-400 mt-4 font-medium">Select photos from gallery</Text>
                        <Text className="text-gray-400 text-xs mt-1">(Up to 5 photos)</Text>
                    </TouchableOpacity>
                ) : (
                    <View className="flex-1 w-full p-2">
                        <FlatList
                            data={images}
                            keyExtractor={(_, i) => i.toString()}
                            numColumns={2}
                            renderItem={({ item, index }) => (
                                <View className="flex-1 m-1 relative aspect-square">
                                    <Image source={{ uri: item }} className="w-full h-full rounded-lg" />
                                    <TouchableOpacity
                                        onPress={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-black/50 p-1 rounded-full"
                                    >
                                        <Feather name="x" size={16} color="white" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        <TouchableOpacity onPress={pickImages} className="py-3 items-center">
                            <Text className="text-sky-500 font-bold">+ Add More</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Text Only Mode Hint */}
            {images.length === 0 && (
                <View className="px-6 pb-6">
                    <TouchableOpacity
                        onPress={() => setStep('POST')} // Skip Editor for text-only
                        className="bg-gray-800 py-4 rounded-xl items-center"
                    >
                        <Text className="text-white font-bold">Write Text Only Post</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    // Editor State
    const [editorTab, setEditorTab] = useState<'FILTERS' | 'ADJUST'>('FILTERS');

    // Adjustments
    const [brightness, setBrightness] = useState(1);
    const [contrast, setContrast] = useState(1);
    const [saturation, setSaturation] = useState(1);

    // Filters Logic
    const applyFilter = (filter: string) => {
        setSelectedFilter(filter);
        // Reset adjustments when changing filters (optional, but cleaner)
        if (filter === 'B&W') {
            setSaturation(0);
            setContrast(1.2);
            setBrightness(1);
        } else if (filter === 'Vintage') {
            setSaturation(0.6);
            setContrast(0.9);
            setBrightness(1.1); // Warm effect simulated via sepia overlay + brightness? CSS sepia is better but sticking to basics
        } else {
            // Reset to defaults
            setSaturation(1);
            setContrast(1);
            setBrightness(1);
        }
    };

    const renderEditor = () => {
        // Generate CSS Filter String for Web
        const filterStyle = Platform.OS === 'web' ? {
            filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`
        } : {};

        return (
            <View className="flex-1 bg-black">
                {/* Main Image View */}
                <View className="flex-1 justify-center relative">
                    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                        {images.map((img, index) => (
                            <View key={index} style={{ width }} className="items-center justify-center relative">
                                <Image
                                    source={{ uri: img }}
                                    style={[{ width: width, height: width }, filterStyle as any]} // Apply CSS filters here
                                    resizeMode="cover"
                                />
                                {/* Overlay Filters (for Color Tints) */}
                                <View
                                    className={`absolute inset-0 pointer-events-none ${selectedFilter === 'Warm' ? 'bg-orange-500/10' :
                                        selectedFilter === 'Cool' ? 'bg-blue-500/10' :
                                            selectedFilter === 'Vintage' ? 'bg-yellow-900/10' : // Sepia-ish tint
                                                'bg-transparent'
                                        }`}
                                />
                            </View>
                        ))}
                    </ScrollView>
                    <View className="absolute bottom-4 w-full flex-row justify-center gap-1">
                        {images.map((_, i) => (
                            <View key={i} className="w-2 h-2 rounded-full bg-white/50" />
                        ))}
                    </View>
                </View>

                {/* Editor Controls */}
                <View className="bg-gray-900 pb-10 pt-4 rounded-t-3xl border-t border-gray-800">

                    {/* Tab Switcher */}
                    <View className="flex-row justify-center mb-6 border-b border-gray-800 pb-2">
                        <TouchableOpacity
                            onPress={() => setEditorTab('FILTERS')}
                            className={`px-6 py-2 mx-1 rounded-full ${editorTab === 'FILTERS' ? 'bg-gray-800' : 'bg-transparent'}`}
                        >
                            <Text className={`text-xs font-bold ${editorTab === 'FILTERS' ? 'text-white' : 'text-gray-500'}`}>FILTERS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setEditorTab('ADJUST')}
                            className={`px-6 py-2 mx-1 rounded-full ${editorTab === 'ADJUST' ? 'bg-gray-800' : 'bg-transparent'}`}
                        >
                            <Text className={`text-xs font-bold ${editorTab === 'ADJUST' ? 'text-white' : 'text-gray-500'}`}>ADJUST</Text>
                        </TouchableOpacity>
                    </View>

                    {editorTab === 'FILTERS' ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1, justifyContent: 'space-evenly' }}>
                            {['Normal', 'Warm', 'Cool', 'Vintage', 'B&W'].map((filter) => {
                                let iconName = 'aperture';
                                if (filter === 'Warm') iconName = 'sun';
                                if (filter === 'Cool') iconName = 'wind';
                                if (filter === 'Vintage') iconName = 'coffee';
                                if (filter === 'B&W') iconName = 'moon';

                                return (
                                    <TouchableOpacity
                                        key={filter}
                                        onPress={() => applyFilter(filter)}
                                        className="items-center"
                                    >
                                        <View className={`w-16 h-16 rounded-full items-center justify-center mb-2 border-2 ${selectedFilter === filter ? 'border-sky-500 bg-gray-800' : 'border-gray-700 bg-gray-800'}`}>
                                            <Feather name={iconName as any} size={24} color={selectedFilter === filter ? '#0EA5E9' : '#9CA3AF'} />
                                        </View>
                                        <Text className={`text-xs ${selectedFilter === filter ? 'text-sky-500 font-bold' : 'text-gray-400'}`}>
                                            {filter}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    ) : (
                        <View className="px-8">
                            <CustomSlider
                                label="Brightness"
                                icon="sun"
                                value={brightness}
                                min={0.5}
                                max={2}
                                onChange={setBrightness}
                            />
                            <CustomSlider
                                label="Contrast"
                                icon="sliders"
                                value={contrast}
                                min={0.5}
                                max={2}
                                onChange={setContrast}
                            />
                            <CustomSlider
                                label="Saturation"
                                icon="droplet"
                                value={saturation}
                                min={0}
                                max={2}
                                onChange={setSaturation}
                            />
                        </View>
                    )}
                </View>
            </View>
        );
    };

    const renderPost = () => (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
            <ScrollView className="flex-1 p-4">
                <View className="flex-row gap-4 mb-6">
                    {images.length > 0 ? (
                        <Image source={{ uri: images[0] }} className="w-20 h-20 rounded-lg bg-gray-200" />
                    ) : (
                        <SafeGradient
                            colors={['#6366f1', '#a855f7']} // indigo-500 to purple-500
                            className="w-20 h-20 rounded-lg items-center justify-center"
                        >
                            <Feather name="type" size={24} color="white" />
                        </SafeGradient>
                    )}
                    <TextInput
                        className="flex-1 text-base text-gray-800 pt-2"
                        placeholder="Write a caption..."
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={caption}
                        onChangeText={setCaption}
                    />
                </View>

                <View className="border-t border-gray-100 py-4">
                    <TouchableOpacity className="flex-row items-center justify-between py-3">
                        <Text className="text-base text-gray-900">Tag People</Text>
                        <View className="flex-row items-center">
                            {isNewChain ? (
                                <View className="flex-row items-center bg-gray-100 px-3 py-1 rounded-full">
                                    <Feather name="lock" size={12} color="#6B7280" />
                                    <Text className="text-gray-600 text-xs ml-1 font-bold">
                                        {lockedRecipients.length > 0 ? `${lockedRecipients.length} Recipients` : 'Locked'}
                                    </Text>
                                </View>
                            ) : (
                                <Feather name="chevron-right" size={20} color="#9CA3AF" />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center justify-between py-3 border-t border-gray-50">
                        <Text className="text-base text-gray-900">Add Location</Text>
                        <Feather name="chevron-right" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1 bg-white">
                {/* Header */}
                <View className={`flex-row items-center justify-between px-4 py-3 border-b ${step === 'EDITOR' ? 'bg-black border-gray-800' : 'bg-white border-gray-100'}`}>
                    <TouchableOpacity onPress={handleBack} className="p-2 -ml-2">
                        <Feather name="chevron-left" size={26} color={step === 'EDITOR' ? 'white' : '#1F2937'} />
                    </TouchableOpacity>

                    <Text className={`text-base font-bold ${step === 'EDITOR' ? 'text-white' : 'text-gray-900'}`}>
                        {step === 'PICKER' ? 'New Post' : step === 'EDITOR' ? 'Edit' : 'New Post'}
                    </Text>

                    <TouchableOpacity
                        onPress={handleNext}
                        disabled={step === 'PICKER' && images.length === 0}
                        className="p-2 -mr-2"
                    >
                        <Text className={`font-bold text-base ${(step === 'PICKER' && images.length === 0) ? 'text-gray-300' : 'text-sky-500'
                            }`}>
                            {step === 'POST' ? 'Share' : 'Next'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {step === 'PICKER' && renderPicker()}
                {step === 'EDITOR' && renderEditor()}
                {step === 'POST' && renderPost()}

            </SafeAreaView>
        </View>
    );
}
