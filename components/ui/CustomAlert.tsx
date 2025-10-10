// components/ActionModal.tsx
import React from 'react';
import {
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type ActionModalProps = {
    visible: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

const CustomAlert: React.FC<ActionModalProps> = ({
    visible,
    title = 'Confirm Action',
    message,
    confirmText = 'Yes',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
}) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.backdrop}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    {/* <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <Pressable hitSlop={10} onPress={onCancel}>
                            <Ionicons name="close" size={22} color="#444" />
                        </Pressable>
                    </View> */}

                    {/* Message */}
                    <Text style={styles.message}>{message}</Text>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.cancelButton,
                                pressed && { backgroundColor: '#ccc' },
                            ]}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelText}>{cancelText}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CustomAlert;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 380,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
        color: '#222',
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        color: '#555',
        lineHeight: 22,
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#eee',
        borderRadius: 10,
        paddingVertical: 12,
        marginRight: 8,
        alignItems: 'center',
    },
    confirmButton: {
        flex: 1,
        backgroundColor: '#e74c3c',
        borderRadius: 10,
        paddingVertical: 12,
        marginLeft: 8,
        alignItems: 'center',
    },
    cancelText: {
        color: '#333',
        fontSize: 15,
        fontWeight: '500',
    },
    confirmText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});
