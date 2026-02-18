import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, View, ViewProps } from 'react-native';

interface SafeGradientProps extends ViewProps {
    colors: string[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    locations?: number[];
    className?: string;
    children?: React.ReactNode;
}

/**
 * A wrapper around LinearGradient that safely handles Web fallbacks if necessary.
 * On Web, if expo-linear-gradient fails, we can fallback to CSS or a solid color.
 * However, expo-linear-gradient SHOULD work on web. If it crashes, we use this to debug/fallback.
 */
export default function SafeGradient({
    colors,
    start,
    end,
    locations,
    style,
    children,
    ...props
}: SafeGradientProps) {
    if (Platform.OS === 'web') {
        // Basic CSS Gradient fallback for Web to avoid runtime module issues if bundler is misbehaving
        // Converting simple hex colors to CSS linear-gradient
        const gradientStyle = {
            backgroundImage: `linear-gradient(to right bottom, ${colors[0]}, ${colors[1] || colors[0]})`,
            ...style as object
        };

        return (
            // @ts-ignore - style prop on View implies web style support in RNW
            <View style={[style, { backgroundImage: `linear-gradient(135deg, ${colors.join(', ')})` }]} {...props}>
                {children}
            </View>
        );
    }

    return (
        <LinearGradient
            colors={colors as any}
            start={start}
            end={end}
            locations={locations as any}
            style={style}
            {...props}
        >
            {children}
        </LinearGradient>
    );
}
