import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { styles } from '../styles/globalStyles';

const AppModal = ({ visible, title, onClose, children }) => (
    <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{title}</Text>

                    <TouchableOpacity onPress={onClose}>
                        <Icon name="close" size={14} />
                    </TouchableOpacity>
                </View>

                {children}
            </View>
        </View>
    </Modal>
);

export default AppModal;