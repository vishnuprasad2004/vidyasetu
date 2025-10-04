import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    isActive?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

const Button = ({ title, onPress, isActive, disabled, style }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                isActive ? styles.activeButton : styles.deactivatedButton,
                style,
            ]}
        >
            <Text style={[styles.text, disabled && styles.disabledText, isActive ? styles.activeText : styles.deactivatedText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#6f72df',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeButton: {
        backgroundColor: '#4a4de7',
    },
    deactivatedButton: {
        borderColor: '#4a4de7',
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    activeText: {
        color: '#fff',
    },
    deactivatedText: {
        color: '#4a4de7',
    },
    disabledText: {
        color: '#666',
    },
});
