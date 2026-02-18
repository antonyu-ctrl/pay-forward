import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

interface AnimatedGradientBorderProps {
    children: React.ReactNode;
    size?: number;
    colors?: string[];
    borderWidth?: number;
}

const AnimatedGradientBorder: React.FC<AnimatedGradientBorderProps> = ({
    children,
    size = 68, // Default outer size
    colors = ['#0EA5E9', '#38BDF8', '#7DD3FC', '#0EA5E9'], // Sky blue gradient
    borderWidth = 3
}) => {
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 2000,
                easing: Easing.linear,
            }),
            -1, // Infinite loop
            false // No reverse
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            {/* Rotating Gradient Background */}
            <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ width: '100%', height: '100%', borderRadius: size / 2 }}
                />
            </Animated.View>

            {/* Inner White Container (Mask) and Content */}
            <View
                style={{
                    width: size - borderWidth * 2,
                    height: size - borderWidth * 2,
                    borderRadius: (size - borderWidth * 2) / 2,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                }}
            >
                {children}
            </View>
        </View>
    );
};

export default AnimatedGradientBorder;
