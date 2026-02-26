import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Svg, { Line } from 'react-native-svg';
import { MOCK_NETWORK, NetworkNode } from '../../data/mockChains';
import { useI18n } from '../../lib/i18n';

const CANVAS_SIZE = 800;
const CENTER = CANVAS_SIZE / 2;
const MAX_NODE_SIZE = 100;
const MIN_NODE_SIZE = 32;
const MAX_DIST = 350;

// ─── Per-node component: sizing runs entirely on the UI thread ───
interface NodeItemProps {
    node: NetworkNode;
    translateX: SharedValue<number>;
    translateY: SharedValue<number>;
    scale: SharedValue<number>;
    containerW: SharedValue<number>;
    containerH: SharedValue<number>;
}

function NodeItem({ node, translateX, translateY, scale, containerW, containerH }: NodeItemProps) {
    const isRoot = node.id === 'anton';

    const animatedStyle = useAnimatedStyle(() => {
        const cw = containerW.value || 400;
        const ch = containerH.value || 600;
        // RN transforms scale from the view's center, so center node (x=0,y=0)
        // maps to screen (cw/2 + translateX) regardless of scale.
        const screenX = cw / 2 + node.x * scale.value + translateX.value;
        const screenY = ch / 2 + node.y * scale.value + translateY.value;
        const dx = screenX - cw / 2;
        const dy = screenY - ch / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const size = interpolate(
            dist,
            [0, MAX_DIST],
            [MAX_NODE_SIZE, MIN_NODE_SIZE],
            Extrapolation.CLAMP,
        );
        const opacity = interpolate(
            dist,
            [0, MAX_DIST * 0.5, MAX_DIST],
            [1, 0.85, 0.4],
            Extrapolation.CLAMP,
        );

        return {
            position: 'absolute' as const,
            left: CENTER + node.x - size / 2,
            top: CENTER + node.y - size / 2,
            width: size,
            alignItems: 'center' as const,
            opacity,
        };
    });

    const avatarStyle = useAnimatedStyle(() => {
        const cw = containerW.value || 400;
        const ch = containerH.value || 600;
        const screenX = cw / 2 + node.x * scale.value + translateX.value;
        const screenY = ch / 2 + node.y * scale.value + translateY.value;
        const dx = screenX - cw / 2;
        const dy = screenY - ch / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const size = interpolate(
            dist,
            [0, MAX_DIST],
            [MAX_NODE_SIZE, MIN_NODE_SIZE],
            Extrapolation.CLAMP,
        );

        return {
            width: size,
            height: size,
            borderRadius: size / 2,
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <Animated.View style={[{ overflow: 'hidden' }, avatarStyle]}>
                <Image
                    source={{ uri: node.avatarUrl }}
                    style={{ width: '100%', height: '100%', borderRadius: 9999 } as any}
                    contentFit="cover"
                />
            </Animated.View>
            <Text
                style={{
                    fontSize: isRoot ? 12 : 9,
                    fontWeight: isRoot ? '700' : '500',
                    color: '#64748b',
                    marginTop: 2,
                    textAlign: 'center',
                }}
                numberOfLines={1}
            >
                {node.username}
            </Text>
        </Animated.View>
    );
}

// ─── Main screen ─────────────────────────────────────────────────
export default function NetworkScreen() {
    const router = useRouter();
    const { t } = useI18n();

    // Shared values for canvas animation
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    // Gesture context (saved state at gesture start)
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);
    const savedScale = useSharedValue(1);

    // Container size as shared values so NodeItem worklets can read them
    const containerW = useSharedValue(0);
    const containerH = useSharedValue(0);

    const onContainerLayout = useCallback((e: any) => {
        const { width, height } = e.nativeEvent.layout;
        containerW.value = width;
        containerH.value = height;
    }, []);

    // Build ALL connection edges (full graph, deduplicated)
    const allEdges = useMemo(() => {
        const edges: [NetworkNode, NetworkNode][] = [];
        const seen = new Set<string>();
        const nodeMap = new Map(MOCK_NETWORK.map(n => [n.id, n]));
        for (const node of MOCK_NETWORK) {
            for (const connId of node.connections) {
                const key = [node.id, connId].sort().join('-');
                if (!seen.has(key)) {
                    seen.add(key);
                    const other = nodeMap.get(connId);
                    if (other) edges.push([node, other]);
                }
            }
        }
        return edges;
    }, []);

    // Canvas initial position (centered in container)
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
    const cw = SCREEN_WIDTH > 448 ? 448 : SCREEN_WIDTH;
    const ch = SCREEN_HEIGHT - 120;
    const canvasLeft = cw / 2 - CENTER;
    const canvasTop = ch / 2 - CENTER;

    // ─── Gestures (modern Gesture API) ───
    const panGesture = Gesture.Pan()
        .onStart(() => {
            'worklet';
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
        })
        .onUpdate((e) => {
            'worklet';
            translateX.value = savedTranslateX.value + e.translationX;
            translateY.value = savedTranslateY.value + e.translationY;
        });

    const pinchGesture = Gesture.Pinch()
        .onStart(() => {
            'worklet';
            savedScale.value = scale.value;
        })
        .onUpdate((e) => {
            'worklet';
            scale.value = Math.max(0.4, Math.min(3, savedScale.value * e.scale));
        });

    const composed = Gesture.Simultaneous(panGesture, pinchGesture);

    const animatedCanvasStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    // Web mouse wheel zoom
    const handleWheel = useCallback((e: any) => {
        e.preventDefault?.();
        const delta = e.deltaY > 0 ? -0.08 : 0.08;
        const newScale = Math.max(0.4, Math.min(3, scale.value + delta));
        scale.value = withSpring(newScale, { damping: 20, stiffness: 200 });
    }, [scale]);

    return (
        <View
            className="flex-1 bg-gray-50 items-center"
            style={Platform.OS === 'web' ? ({ height: '100vh' } as any) : { flex: 1 }}
        >
            <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden flex flex-col">
                <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                    <Stack.Screen options={{ headerShown: false }} />

                    {/* Header */}
                    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-10">
                        <TouchableOpacity
                            onPress={() => {
                                if (router.canGoBack()) router.back();
                                else router.replace('/(tabs)/my-forward' as any);
                            }}
                            className="w-8"
                        >
                            <Feather name="arrow-left" size={24} color="#111827" />
                        </TouchableOpacity>
                        <Text className="text-lg font-bold text-gray-900 tracking-tight">{t('network.title')}</Text>
                        <View className="w-8" />
                    </View>

                    {/* Canvas */}
                    <View
                        className="flex-1 overflow-hidden bg-white"
                        onLayout={onContainerLayout}
                        {...(Platform.OS === 'web' ? { onWheel: handleWheel } : {})}
                    >
                        <GestureDetector gesture={composed}>
                            <Animated.View
                                style={[
                                    {
                                        width: CANVAS_SIZE,
                                        height: CANVAS_SIZE,
                                        position: 'absolute',
                                        left: canvasLeft,
                                        top: canvasTop,
                                    },
                                    animatedCanvasStyle,
                                ]}
                            >
                                {/* Connection lines — thin dotted */}
                                <Svg
                                    width={CANVAS_SIZE}
                                    height={CANVAS_SIZE}
                                    style={{ position: 'absolute', top: 0, left: 0 }}
                                >
                                    {allEdges.map(([from, to]) => (
                                        <Line
                                            key={`${from.id}-${to.id}`}
                                            x1={CENTER + from.x}
                                            y1={CENTER + from.y}
                                            x2={CENTER + to.x}
                                            y2={CENTER + to.y}
                                            stroke="#94A3B8"
                                            strokeWidth={0.5}
                                            strokeDasharray="2,2"
                                        />
                                    ))}
                                </Svg>

                                {/* Nodes */}
                                {MOCK_NETWORK.map((node) => (
                                    <NodeItem
                                        key={node.id}
                                        node={node}
                                        translateX={translateX}
                                        translateY={translateY}
                                        scale={scale}
                                        containerW={containerW}
                                        containerH={containerH}
                                    />
                                ))}
                            </Animated.View>
                        </GestureDetector>

                        {/* Zoom controls */}
                        <View className="absolute bottom-6 right-4 gap-2">
                            <TouchableOpacity
                                className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                                onPress={() => {
                                    const newScale = Math.min(3, scale.value + 0.3);
                                    scale.value = withSpring(newScale, { damping: 20, stiffness: 200 });
                                }}
                            >
                                <Feather name="plus" size={20} color="#374151" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                                onPress={() => {
                                    const newScale = Math.max(0.4, scale.value - 0.3);
                                    scale.value = withSpring(newScale, { damping: 20, stiffness: 200 });
                                }}
                            >
                                <Feather name="minus" size={20} color="#374151" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                                onPress={() => {
                                    translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
                                    translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
                                    scale.value = withSpring(1, { damping: 20, stiffness: 200 });
                                    savedTranslateX.value = 0;
                                    savedTranslateY.value = 0;
                                    savedScale.value = 1;
                                }}
                            >
                                <Feather name="maximize" size={18} color="#374151" />
                            </TouchableOpacity>
                        </View>

                        {/* Legend */}
                        <View className="absolute top-4 left-4 bg-white/90 rounded-xl p-3 shadow-sm border border-gray-100">
                            <Text className="text-[10px] text-gray-500 font-bold mb-1">CONNECTIONS</Text>
                            <Text className="text-xs text-gray-600">{MOCK_NETWORK.length} people</Text>
                            <Text className="text-xs text-gray-600">{allEdges.length} links</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
}
