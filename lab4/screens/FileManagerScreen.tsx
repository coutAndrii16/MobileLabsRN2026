import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    Alert,
    SafeAreaView,
    ActivityIndicator,
    ScrollView,
} from 'react-native';

import * as FileSystem from 'expo-file-system/legacy';

// components
import Icon from '../components/Icon';
import FileItem from '../components/FileItem';
import StorageStats from '../components/StorageStats';
import AppModal from '../components/AppModal';

// utils
import { formatBytes } from '../app/utils/formatBytes';
import { formatDate } from '../app/utils/formatDate';
import { getExtension } from '../app/utils/getExtension';

// services
import { readDirectory } from '../services/fileSystemService';

// styles
import { styles } from '../styles/globalStyles';

export default function FileManagerScreen() {
    const ROOT = FileSystem.documentDirectory;

    const [currentPath, setCurrentPath] = useState(ROOT);
    const [pathStack, setPathStack] = useState([ROOT]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [storageStats, setStorageStats] = useState(null);

    const [createModal, setCreateModal] = useState({ visible: false, type: 'folder' });
    const [newName, setNewName] = useState('');
    const [newContent, setNewContent] = useState('');

    // ── Load directory ──
    const loadDirectory = useCallback(async (path) => {
        setLoading(true);
        try {
            const data = await readDirectory(path);

            data.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });

            setItems(data);
        } catch (e) {
            Alert.alert('Помилка', e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDirectory(currentPath);
    }, [currentPath]);

    // ── Navigation ──
    const navigateTo = (path) => {
        const normalized = path.endsWith('/') ? path : path + '/';
        setPathStack((prev) => [...prev, normalized]);
        setCurrentPath(normalized);
    };

    const navigateUp = () => {
        if (pathStack.length <= 1) return;
        const newStack = pathStack.slice(0, -1);
        setPathStack(newStack);
        setCurrentPath(newStack[newStack.length - 1]);
    };

    const handleItemPress = (item) => {
        if (item.isDirectory) {
            navigateTo(item.fullPath);
        } else {
            Alert.alert('Файл', item.name);
        }
    };
    const handleCreate = async () => {
        const name = newName.trim();

        if (!name) {
            Alert.alert('Помилка', 'Введіть назву');
            return;
        }

        try {
            const target = currentPath + name + '/';

            await FileSystem.makeDirectoryAsync(target, {
                intermediates: true,
            });

            setCreateModal({visible: false, type: 'folder'});//hmm
            setNewName('');

            loadDirectory(currentPath);

        } catch (e) {
            Alert.alert('Помилка', e.message);
        }
    };
        const handleDelete = async (item) => {
            try {
                await FileSystem.deleteAsync(item.fullPath, {
                    idempotent: true,
                });

                loadDirectory(currentPath);

            } catch (e) {
                Alert.alert('Помилка', e.message);
            }
        };
        const handleEdit = async (item) => {
            Alert.prompt(
                'Перейменувати',
                'Нова назва:',
                async (newName) => {
                    if (!newName) return;

                    const newPath = currentPath + newName;

                    try {
                        await FileSystem.moveAsync({
                            from: item.fullPath,
                            to: newPath,
                        });

                        loadDirectory(currentPath);

                    } catch (e) {
                        Alert.alert('Помилка', e.message);
                    }
                }
            );
        };
        const handleInfo = (item) => {
            Alert.alert(
                'Інформація',
                `Назва: ${item.name}\nТип: ${item.isDirectory ? 'Папка' : 'Файл'}`
            );
        };
    // ── UI ──
    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>📂 Файловий менеджер</Text>
            </View>

            {/* Path */}
            <View style={styles.pathBar}>
                {pathStack.length > 1 && (
                    <TouchableOpacity onPress={navigateUp} style={styles.backBtn}>
                        <Icon name="back" size={14} />
                        <Text style={styles.backText}> Назад</Text>
                    </TouchableOpacity>
                )}

                <ScrollView horizontal>
                    <Text style={styles.pathText}>
                        🏠 {currentPath}
                    </Text>
                </ScrollView>
            </View>

            {/* Buttons */}
            <View style={styles.actionBar}>
                <TouchableOpacity onPress={() => setCreateModal({ visible: true, type: 'folder' })}>
                    <Text style={styles.createBtnText}>＋ Папка</Text>
                </TouchableOpacity>
            </View>

            {/* List */}
            {loading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.fullPath}
                    renderItem={({ item }) => (
                        <FileItem
                            item={item}
                            onPress={handleItemPress}
                            onDelete={handleDelete}
                            onInfo={handleInfo}
                            onEdit={handleEdit}
                        />
                    )}
                />
            )}

            {/* Modal */}
            <AppModal
                visible={createModal.visible}
                title="Створити"
                onClose={() => setCreateModal({ ...createModal, visible: false })}
            >
                <TextInput
                    style={styles.input}
                    value={newName}
                    onChangeText={setNewName}
                />

                <TouchableOpacity style={styles.primaryBtn} onPress={handleCreate}>
                    <Text style={styles.primaryBtnText}>Створити</Text>
                </TouchableOpacity>
            </AppModal>

        </SafeAreaView>
    );
}