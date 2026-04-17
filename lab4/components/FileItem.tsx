import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from './Icon';
import { styles } from '../styles/globalStyles';

const FileItem = ({ item, onPress, onDelete, onInfo, onEdit }) => (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
        <Icon name={item.isDirectory ? 'folder' : 'file'} size={22} />

        <Text style={styles.itemName}>{item.name}</Text>

        <View style={styles.itemActions}>
            {!item.isDirectory && (
                <TouchableOpacity onPress={() => onEdit(item)}>
                    <Icon name="edit" size={16} />
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => onInfo(item)}>
                <Icon name="info" size={16} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item)}>
                <Icon name="trash" size={16} />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
);

export default FileItem;