import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    PanResponder,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import CustomSlider from '../../components/UI/CustomSlider';

const screenWidth = Dimensions.get('window').width;

type ScreenMode = 'REPLY' | 'EDITOR';
type EditorTab = 'FILTERS' | 'ADJUST';

// Per-image filter settings
interface ImageFilterState {
    filter: string;       // 'Normal' | 'Warm' | 'Cool' | 'Vintage' | 'B&W'
    brightness: number;
    contrast: number;
    saturation: number;
}

const DEFAULT_FILTER: ImageFilterState = {
    filter: 'Normal',
    brightness: 1,
    contrast: 1,
    saturation: 1,
};

// TODO [PRODUCTION]: Replace state-based CSS filters with expo-image-manipulator
// to apply actual image transformations before upload.
// Current approach: filter values stored per image, applied as CSS filters (web)
// and as overlay tints. On production, call ImageManipulator.manipulateAsync()
// in handlePost() to create processed image URIs before sending to API.

export default function ReplyScreen() {
    const { feedId, username } = useLocalSearchParams<{ feedId: string; username: string }>();
    const router = useRouter();
    const [replyText, setReplyText] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [imageFilters, setImageFilters] = useState<ImageFilterState[]>([]);
    const inputRef = useRef<TextInput>(null);
    const { width } = useWindowDimensions();
    const isNarrow = width < 768;
    const contentWidth = Math.min(width, 448);

    // Current user mock
    const currentUserAvatar = 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80';

    // ── Screen mode ──
    const [mode, setMode] = useState<ScreenMode>('REPLY');
    const [editingIndex, setEditingIndex] = useState(0);

    // ── Temporary editor state (working copy while editing) ──
    const [editorTab, setEditorTab] = useState<EditorTab>('FILTERS');
    const [tempFilter, setTempFilter] = useState<ImageFilterState>(DEFAULT_FILTER);

    // ── Zoom / Pan state for editor ──
    const [zoomScale, setZoomScale] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const panRef = useRef({ x: 0, y: 0 });       // live value for PanResponder closure
    const panStart = useRef({ x: 0, y: 0 });

    const editorPanResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dx) > 2 || Math.abs(gs.dy) > 2,
            onPanResponderGrant: () => {
                panStart.current = { ...panRef.current };
            },
            onPanResponderMove: (_, gs) => {
                const next = {
                    x: panStart.current.x + gs.dx,
                    y: panStart.current.y + gs.dy,
                };
                panRef.current = next;
                setPanOffset(next);
            },
        })
    ).current;

    const handleZoomWheel = useCallback((e: any) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoomScale(prev => Math.min(Math.max(prev + delta, 0.5), 4));
    }, []);

    const resetZoom = () => {
        setZoomScale(1);
        setPanOffset({ x: 0, y: 0 });
        panRef.current = { x: 0, y: 0 };
    };

    const handlePost = () => {
        // TODO [PRODUCTION]: Apply imageFilters[i] to each image via ImageManipulator
        // before uploading. For now, filters are visual-only (CSS).
        console.log('Posting reply:', replyText, 'images:', images, 'filters:', imageFilters, 'to feed:', feedId);
        router.back();
    };

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            selectionLimit: 4,
            quality: 0.8,
        });

        if (!result.canceled) {
            const uris = result.assets.map(asset => asset.uri);
            const newImages = [...images, ...uris].slice(0, 4);
            setImages(newImages);
            // Initialize filters for new images
            const newFilters = [...imageFilters];
            while (newFilters.length < newImages.length) {
                newFilters.push({ ...DEFAULT_FILTER });
            }
            setImageFilters(newFilters);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImageFilters(prev => prev.filter((_, i) => i !== index));
    };

    // ── Editor helpers ──
    const openEditor = (index: number) => {
        setEditingIndex(index);
        // Load existing filter for this image into temp editor state
        const existing = imageFilters[index] ?? DEFAULT_FILTER;
        setTempFilter({ ...existing });
        setEditorTab('FILTERS');
        // Reset zoom/pan when entering editor
        setZoomScale(1);
        setPanOffset({ x: 0, y: 0 });
        panRef.current = { x: 0, y: 0 };
        setMode('EDITOR');
    };

    const applyFilterPreset = (filterName: string) => {
        let newState: ImageFilterState;
        switch (filterName) {
            case 'B&W':
                newState = { filter: filterName, brightness: 1, contrast: 1.2, saturation: 0 };
                break;
            case 'Vintage':
                newState = { filter: filterName, brightness: 1.1, contrast: 0.9, saturation: 0.6 };
                break;
            case 'Warm':
                newState = { filter: filterName, brightness: 1, contrast: 1, saturation: 1 };
                break;
            case 'Cool':
                newState = { filter: filterName, brightness: 1, contrast: 1, saturation: 1 };
                break;
            default: // Normal
                newState = { filter: 'Normal', brightness: 1, contrast: 1, saturation: 1 };
                break;
        }
        setTempFilter(newState);
    };

    const handleEditorDone = () => {
        // Save temp filter back to imageFilters array
        const updated = [...imageFilters];
        updated[editingIndex] = { ...tempFilter };
        setImageFilters(updated);
        setMode('REPLY');
    };

    const hasContent = replyText.trim() || images.length > 0;

    // ── Build CSS filter style for a given filter state ──
    const buildFilterStyle = (fs: ImageFilterState) => {
        if (Platform.OS !== 'web') return {};
        return {
            filter: `brightness(${fs.brightness}) contrast(${fs.contrast}) saturate(${fs.saturation})`,
        };
    };

    const getOverlayClass = (filterName: string) => {
        switch (filterName) {
            case 'Warm': return 'bg-orange-500/10';
            case 'Cool': return 'bg-blue-500/10';
            case 'Vintage': return 'bg-yellow-900/10';
            default: return 'bg-transparent';
        }
    };

    // ── EDITOR MODE ──
    if (mode === 'EDITOR' && images[editingIndex]) {
        const editingImage = images[editingIndex];
        const editorFilterStyle = buildFilterStyle(tempFilter);

        return (
            <View
                className="flex-1 bg-gray-50 items-center"
                style={Platform.OS === 'web' ? { height: '100vh' as any } : { flex: 1 }}
            >
                <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden">
                    <Stack.Screen options={{ headerShown: false }} />

                    {/* Editor Header — Light theme */}
                    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                        <TouchableOpacity onPress={() => setMode('REPLY')} className="flex-row items-center">
                            <Feather name="chevron-left" size={22} color="#111827" />
                            <Text className="text-gray-900 text-sm ml-1">Back</Text>
                        </TouchableOpacity>
                        <Text className="text-gray-900 text-base font-bold">Edit Photo</Text>
                        <TouchableOpacity onPress={handleEditorDone} className="bg-sky-500 px-4 py-1.5 rounded-full">
                            <Text className="text-white font-bold text-sm">Done</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Image Preview — Zoomable / Pannable */}
                    <View
                        className="flex-1 justify-center items-center bg-gray-50"
                        // @ts-ignore — web-only wheel event
                        onWheel={Platform.OS === 'web' ? handleZoomWheel : undefined}
                    >
                        <View
                            className="relative rounded-2xl overflow-hidden shadow-sm bg-white"
                            style={{ width: contentWidth - 32, height: (contentWidth - 32) * 0.85 }}
                        >
                            <View
                                {...editorPanResponder.panHandlers}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    source={{ uri: editingImage }}
                                    style={[
                                        {
                                            width: (contentWidth - 32) * zoomScale,
                                            height: (contentWidth - 32) * 0.85 * zoomScale,
                                            transform: [
                                                { translateX: panOffset.x },
                                                { translateY: panOffset.y },
                                            ],
                                        },
                                        editorFilterStyle as any,
                                    ]}
                                    resizeMode="contain"
                                />
                                <View
                                    className={`absolute inset-0 pointer-events-none ${getOverlayClass(tempFilter.filter)}`}
                                />
                            </View>
                        </View>

                        {/* Zoom Controls */}
                        <View className="flex-row items-center mt-3" style={{ gap: 12 }}>
                            <TouchableOpacity
                                onPress={() => setZoomScale(prev => Math.max(prev - 0.25, 0.5))}
                                className="w-8 h-8 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm"
                            >
                                <Feather name="minus" size={16} color="#374151" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={resetZoom}>
                                <Text className="text-gray-500 text-xs font-bold min-w-[40px] text-center">
                                    {Math.round(zoomScale * 100)}%
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setZoomScale(prev => Math.min(prev + 0.25, 4))}
                                className="w-8 h-8 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm"
                            >
                                <Feather name="plus" size={16} color="#374151" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Editor Controls — Light theme */}
                    <View className="bg-white pb-8 pt-4 rounded-t-3xl border-t border-gray-100">
                        {/* Tab Switcher */}
                        <View className="flex-row justify-center mb-5 mx-6">
                            <View className="flex-row bg-gray-100 rounded-full p-1">
                                <TouchableOpacity
                                    onPress={() => setEditorTab('FILTERS')}
                                    className={`px-6 py-2 rounded-full ${editorTab === 'FILTERS' ? 'bg-white shadow-sm' : 'bg-transparent'}`}
                                >
                                    <Text className={`text-xs font-bold ${editorTab === 'FILTERS' ? 'text-gray-900' : 'text-gray-400'}`}>FILTERS</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setEditorTab('ADJUST')}
                                    className={`px-6 py-2 rounded-full ${editorTab === 'ADJUST' ? 'bg-white shadow-sm' : 'bg-transparent'}`}
                                >
                                    <Text className={`text-xs font-bold ${editorTab === 'ADJUST' ? 'text-gray-900' : 'text-gray-400'}`}>ADJUST</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {editorTab === 'FILTERS' ? (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1, justifyContent: 'space-evenly' }}>
                                {['Normal', 'Warm', 'Cool', 'Vintage', 'B&W'].map((filter) => {
                                    let iconName = 'aperture';
                                    if (filter === 'Warm') iconName = 'sun';
                                    if (filter === 'Cool') iconName = 'wind';
                                    if (filter === 'Vintage') iconName = 'coffee';
                                    if (filter === 'B&W') iconName = 'moon';
                                    const isSelected = tempFilter.filter === filter;

                                    return (
                                        <TouchableOpacity
                                            key={filter}
                                            onPress={() => applyFilterPreset(filter)}
                                            className="items-center"
                                        >
                                            <View className={`w-16 h-16 rounded-2xl items-center justify-center mb-2 border-2 ${isSelected ? 'border-sky-500 bg-sky-50' : 'border-gray-200 bg-gray-50'}`}>
                                                <Feather name={iconName as any} size={22} color={isSelected ? '#0EA5E9' : '#6B7280'} />
                                            </View>
                                            <Text className={`text-xs ${isSelected ? 'text-sky-600 font-bold' : 'text-gray-500'}`}>
                                                {filter}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        ) : (
                            <View className="px-8">
                                <CustomSlider
                                    label="Brightness" icon="sun"
                                    value={tempFilter.brightness} min={0.5} max={2}
                                    onChange={(v) => setTempFilter(prev => ({ ...prev, brightness: v }))}
                                />
                                <CustomSlider
                                    label="Contrast" icon="sliders"
                                    value={tempFilter.contrast} min={0.5} max={2}
                                    onChange={(v) => setTempFilter(prev => ({ ...prev, contrast: v }))}
                                />
                                <CustomSlider
                                    label="Saturation" icon="droplet"
                                    value={tempFilter.saturation} min={0} max={2}
                                    onChange={(v) => setTempFilter(prev => ({ ...prev, saturation: v }))}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    }

    // ── REPLY MODE (default) ──
    return (
        <View
            className="flex-1 bg-gray-50 items-center"
            style={Platform.OS === 'web' ? { height: '100vh' as any } : { flex: 1 }}
        >
            <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden">
                <Stack.Screen options={{ headerShown: false }} />

                {/* Top Bar */}
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="x" size={22} color="#111827" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handlePost}
                        disabled={!hasContent}
                        className={`px-5 py-1.5 rounded-full ${hasContent ? 'bg-sky-500' : 'bg-sky-300'}`}
                    >
                        <Text className="text-white font-bold text-[14px]">Reply</Text>
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                >
                    <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
                        <View className="px-4 pt-4">
                            {/* Replying To Indicator */}
                            <View className="flex-row items-start mb-3">
                                <View className="w-[2px] h-6 bg-gray-300 ml-[18px] mr-3 mt-1 rounded-full" />
                                <Text className="text-gray-500 text-[14px]">
                                    Replying to <Text className="text-sky-500">@{username?.toLowerCase()}</Text>
                                </Text>
                            </View>

                            {/* Input Area */}
                            <View className="flex-row items-start">
                                <Image
                                    source={{ uri: currentUserAvatar }}
                                    className="w-9 h-9 rounded-full bg-gray-200 mr-3"
                                />
                                <TextInput
                                    ref={inputRef}
                                    className="flex-1 text-gray-900 text-[16px] leading-5 pt-1"
                                    placeholder="Post your reply"
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    autoFocus={isNarrow}
                                    value={replyText}
                                    onChangeText={setReplyText}
                                    style={{ minHeight: 60, textAlignVertical: 'top', outlineStyle: 'none' as any }}
                                />
                            </View>

                            {/* Attached Images — Full-width with PERSISTED filters */}
                            {images.length > 0 && (
                                <View className="mt-3 ml-12">
                                    {images.length === 1 ? (
                                        <View className="relative">
                                            <TouchableOpacity activeOpacity={0.85} onPress={() => openEditor(0)}>
                                                <View className="relative overflow-hidden rounded-2xl">
                                                    <Image
                                                        source={{ uri: images[0] }}
                                                        className="w-full bg-gray-100"
                                                        style={[
                                                            { aspectRatio: 4 / 3 },
                                                            buildFilterStyle(imageFilters[0] ?? DEFAULT_FILTER) as any,
                                                        ]}
                                                        resizeMode="cover"
                                                    />
                                                    <View
                                                        className={`absolute inset-0 pointer-events-none ${getOverlayClass((imageFilters[0] ?? DEFAULT_FILTER).filter)}`}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => removeImage(0)}
                                                className="absolute top-2 right-2 bg-black/60 rounded-full p-1"
                                            >
                                                <Feather name="x" size={16} color="white" />
                                            </TouchableOpacity>
                                            {/* Edit indicator */}
                                            {(imageFilters[0] && imageFilters[0].filter !== 'Normal') && (
                                                <View className="absolute bottom-2 left-2 bg-black/50 rounded-full px-2 py-0.5 flex-row items-center">
                                                    <Feather name="sliders" size={12} color="white" />
                                                    <Text className="text-white text-[11px] ml-1 font-medium">{imageFilters[0].filter}</Text>
                                                </View>
                                            )}
                                        </View>
                                    ) : (
                                        <View className="flex-row flex-wrap" style={{ gap: 4 }}>
                                            {images.map((uri, index) => {
                                                const fs = imageFilters[index] ?? DEFAULT_FILTER;
                                                return (
                                                    <View
                                                        key={index}
                                                        className="relative overflow-hidden rounded-xl"
                                                        style={{
                                                            width: images.length === 3 && index === 0
                                                                ? '100%'
                                                                : '48.5%' as any,
                                                            aspectRatio: images.length === 3 && index === 0
                                                                ? 16 / 9
                                                                : 1,
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            activeOpacity={0.85}
                                                            onPress={() => openEditor(index)}
                                                            className="flex-1"
                                                        >
                                                            <Image
                                                                source={{ uri }}
                                                                className="w-full h-full bg-gray-100"
                                                                style={buildFilterStyle(fs) as any}
                                                                resizeMode="cover"
                                                            />
                                                            <View
                                                                className={`absolute inset-0 pointer-events-none ${getOverlayClass(fs.filter)}`}
                                                            />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => removeImage(index)}
                                                            className="absolute top-1.5 right-1.5 bg-black/60 rounded-full p-0.5"
                                                        >
                                                            <Feather name="x" size={14} color="white" />
                                                        </TouchableOpacity>
                                                        {fs.filter !== 'Normal' && (
                                                            <View className="absolute bottom-1 left-1 bg-black/50 rounded-full px-1.5 py-0.5">
                                                                <Text className="text-white text-[10px] font-medium">{fs.filter}</Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    {/* Bottom Toolbar */}
                    <View className="flex-row items-center px-4 py-3 border-t border-gray-100 bg-white">
                        <TouchableOpacity className="mr-5" onPress={pickImages}>
                            <Feather name="image" size={20} color="#0EA5E9" />
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-5">
                            <Feather name="smile" size={20} color="#0EA5E9" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="map-pin" size={20} color="#0EA5E9" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}
