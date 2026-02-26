import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, PanResponder, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';
import { MOCK_NETWORK, NetworkNode } from '../../data/mockChains';
import { useI18n } from '../../lib/i18n';

const CANVAS_SIZE = 800;
const CENTER = CANVAS_SIZE / 2;
const MAX_NODE_SIZE = 68;
const MIN_NODE_SIZE = 20;
const MAX_DIST = 400;

export default function NetworkScreen() {
    const router = useRouter();
    const { t } = useI18n();

    // Shared values for smooth canvas animation (UI thread)
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    // Refs for gesture tracking
    const offsetX = useRef(0);
    const offsetY = useRef(0);
    const lastScale = useRef(1);
    const lastPinchDist = useRef(0);

    // JS-thread mirror of shared values for dynamic node sizing
    const [transform, setTransform] = useState({ x: 0, y: 0, s: 1 });
    const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

    const syncTransform = useCallback((x: number, y: number, s: number) => {
        setTransform({ x, y, s });
    }, []);

    useAnimatedReaction(
        () => ({
            x: translateX.value,
            y: translateY.value,
            s: scale.value,
        }),
        (current) => {
            runOnJS(syncTransform)(current.x, current.y, current.s);
        }
    );

    const onContainerLayout = useCallback((e: any) => {
        const { width, height } = e.nativeEvent.layout;
        setContainerSize({ w: width, h: height });
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

    // Canvas origin relative to container
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
    const cw = containerSize.w || (SCREEN_WIDTH > 448 ? 448 : SCREEN_WIDTH);
    const ch = containerSize.h || (SCREEN_HEIGHT - 120);
    const canvasLeft = cw / 2 - CENTER;
    const canvasTop = ch / 2 - CENTER;

    // Dynamic node size: nodes closer to viewport center appear larger
    // RN transforms scale from the view's center, so the center node (x=0,y=0)
    // maps to screen (canvasLeft + CENTER + translateX, canvasTop + CENTER + translateY)
    // regardless of scale. This keeps zoom from shrinking the center avatar.
    const getNodeSize = useCallback((node: NetworkNode) => {
        const screenX = canvasLeft + CENTER + node.x * transform.s + transform.x;
        const screenY = canvasTop + CENTER + node.y * transform.s + transform.y;
        const dx = screenX - cw / 2;
        const dy = screenY - ch / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ratio = Math.min(dist / MAX_DIST, 1);
        // Gentle curve for gradual size change across layers
        const t = Math.pow(ratio, 1.2);
        return MAX_NODE_SIZE - t * (MAX_NODE_SIZE - MIN_NODE_SIZE);
    }, [transform, cw, ch, canvasLeft, canvasTop]);

    // Interpolate border color from bright sky-blue (close) to dark slate (far)
    const getBorderColor = (size: number) => {
        const t = 1 - (size - MIN_NODE_SIZE) / (MAX_NODE_SIZE - MIN_NODE_SIZE);
        const r = Math.round(14 + t * (51 - 14));
        const g = Math.round(165 + t * (65 - 165));
        const b = Math.round(233 + t * (85 - 233));
        return `rgb(${r},${g},${b})`;
    };

    const getDistance = (touches: any) => {
        const [t1, t2] = [touches[0], touches[1]];
        const dx = t1.pageX - t2.pageX;
        const dy = t1.pageY - t2.pageY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                if (evt.nativeEvent.touches.length === 2) {
                    lastPinchDist.current = getDistance(evt.nativeEvent.touches);
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                if (evt.nativeEvent.touches.length === 2) {
                    const dist = getDistance(evt.nativeEvent.touches);
                    if (lastPinchDist.current > 0) {
                        const pinchScale = dist / lastPinchDist.current;
                        const newScale = Math.max(0.4, Math.min(3, lastScale.current * pinchScale));
                        scale.value = newScale;
                    }
                } else {
                    translateX.value = offsetX.current + gestureState.dx;
                    translateY.value = offsetY.current + gestureState.dy;
                }
            },
            onPanResponderRelease: () => {
                offsetX.current = translateX.value;
                offsetY.current = translateY.value;
                lastScale.current = scale.value;
                lastPinchDist.current = 0;
            },
        })
    ).current;

    const animatedCanvasStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    const handleWheel = useCallback((e: any) => {
        e.preventDefault?.();
        const delta = e.deltaY > 0 ? -0.08 : 0.08;
        const newScale = Math.max(0.4, Math.min(3, scale.value + delta));
        scale.value = withSpring(newScale, { damping: 20, stiffness: 200 });
        lastScale.current = newScale;
    }, [scale]);

    const renderNode = (node: NetworkNode) => {
        const size = getNodeSize(node);
        const x = CENTER + node.x - size / 2;
        const y = CENTER + node.y - size / 2;
        const isRoot = node.id === 'anton';
        const textColor = getBorderColor(size);

        return (
            <View
                key={node.id}
                style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    width: size,
                    alignItems: 'center',
                }}
            >
                <Image
                    source={{ uri: node.avatarUrl }}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                    }}
                    contentFit="cover"
                />
                <Text
                    style={{
                        fontSize: Math.max(7, size > 50 ? 12 : size > 30 ? 10 : 8),
                        fontWeight: isRoot ? '700' : '500',
                        color: textColor,
                        marginTop: 2,
                        textAlign: 'center',
                    }}
                    numberOfLines={1}
                >
                    {node.username}
                </Text>
            </View>
        );
    };

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
                        {...panResponder.panHandlers}
                        {...(Platform.OS === 'web' ? { onWheel: handleWheel } : {})}
                    >
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
                            {/* Connection lines — thin and consistent */}
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
                            {MOCK_NETWORK.map(renderNode)}
                        </Animated.View>

                        {/* Zoom controls */}
                        <View className="absolute bottom-6 right-4 gap-2">
                            <TouchableOpacity
                                className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                                onPress={() => {
                                    const newScale = Math.min(3, scale.value + 0.3);
                                    scale.value = withSpring(newScale, { damping: 20, stiffness: 200 });
                                    lastScale.current = newScale;
                                }}
                            >
                                <Feather name="plus" size={20} color="#374151" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                                onPress={() => {
                                    const newScale = Math.max(0.4, scale.value - 0.3);
                                    scale.value = withSpring(newScale, { damping: 20, stiffness: 200 });
                                    lastScale.current = newScale;
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
                                    offsetX.current = 0;
                                    offsetY.current = 0;
                                    lastScale.current = 1;
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
