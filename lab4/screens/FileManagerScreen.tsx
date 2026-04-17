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
    Platform,
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
    const ROOT = FileSystem.documentDirectory!;

    const [currentPath, setCurrentPath] = useState(ROOT);
    const [pathStack, setPathStack] = useState([ROOT]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [storageStats, setStorageStats] = useState(null);

    // Modals
    const [createModal, setCreateModal] = useState({ visible: false, type: 'folder' });
    const [newName, setNewName] = useState('');
    const [newContent, setNewContent] = useState('');

    const [viewModal, setViewModal] = useState({ visible: false, content: '', name: '' });
    const [editModal, setEditModal] = useState({ visible: false, path: '', name: '', content: '' });
    const [infoModal, setInfoModal] = useState({ visible: false, info: null });

    // ── Load directory ──
    const loadDirectory = useCallback(async (path: string) => {
        setLoading(true);
        try {
            const data = await readDirectory(path);
            data.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });
            setItems(data);
        } catch (e: any) {
            Alert.alert('Помилка', e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // ── Load storage stats ──
    const loadStats = useCallback(async () => {
        try {
            const free = await FileSystem.getFreeDiskStorageAsync();
            const total = await FileSystem.getTotalDiskCapacityAsync();
            setStorageStats({ freeDiskSpace: free, totalDiskCapacity: total });
        } catch {
            setStorageStats({ freeDiskSpace: null, totalDiskCapacity: null });
        }
    }, []);

    useEffect(() => {
        loadDirectory(currentPath);
        if (pathStack.length === 1) loadStats();
    }, [currentPath]);

    // ── Navigation ──
    const navigateTo = (path: string) => {
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

    const handleItemPress = (item: any) => {
        if (item.isDirectory) {
            navigateTo(item.fullPath);
        } else if (item.name.endsWith('.txt')) {
            openViewModal(item);
        } else {
            Alert.alert('Файл', `Перегляд "${item.name}" не підтримується (тільки .txt)`);
        }
    };

    const relativePath = currentPath.replace(ROOT, '') || '/';

    // ── Create folder or file ──
    const openCreateModal = (type: string) => {
        setNewName('');
        setNewContent('');
        setCreateModal({ visible: true, type });
    };

    const handleCreate = async () => {
        const name = newName.trim();
        if (!name) return Alert.alert('Помилка', 'Введіть назву');

        try {
            if (createModal.type === 'folder') {
                await FileSystem.makeDirectoryAsync(currentPath + name + '/', {
                    intermediates: true,
                });
            } else {
                const finalName = name.endsWith('.txt') ? name : name + '.txt';
                await FileSystem.writeAsStringAsync(currentPath + finalName, newContent);
            }
            setCreateModal({ visible: false, type: 'folder' });
            setNewName('');
            setNewContent('');
            loadDirectory(currentPath);
        } catch (e: any) {
            Alert.alert('Помилка', e.message);
        }
    };

    // ── View file ──
    const openViewModal = async (item: any) => {
        try {
            const content = await FileSystem.readAsStringAsync(item.fullPath);
            setViewModal({ visible: true, content, name: item.name });
        } catch (e: any) {
            Alert.alert('Помилка читання', e.message);
        }
    };

    // ── Edit file ──
    const openEditModal = async (item: any) => {
        try {
            const content = await FileSystem.readAsStringAsync(item.fullPath);
            setEditModal({ visible: true, path: item.fullPath, name: item.name, content });
        } catch (e: any) {
            Alert.alert('Помилка', e.message);
        }
    };

    const handleSave = async () => {
        try {
            await FileSystem.writeAsStringAsync(editModal.path, editModal.content);
            setEditModal({ ...editModal, visible: false });
            loadDirectory(currentPath);
            Alert.alert('Збережено', `Файл "${editModal.name}" оновлено.`);
        } catch (e: any) {
            Alert.alert('Помилка збереження', e.message);
        }
    };

    // ── Delete ──
    const handleDelete = (item: any) => {
        Alert.alert(
            'Видалення',
            `Видалити "${item.name}"?`,
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await FileSystem.deleteAsync(item.fullPath, { idempotent: true });
                            loadDirectory(currentPath);
                        } catch (e: any) {
                            Alert.alert('Помилка', e.message);
                        }
                    },
                },
            ]
        );
    };

    // ── Info ──
    const handleInfo = async (item: any) => {
        try {
            const info = await FileSystem.getInfoAsync(item.fullPath, { size: true });
            setInfoModal({
                visible: true,
                info: {
                    name: item.name,
                    type: item.isDirectory ? 'Директорія' : getExtension(item.name),
                    size: item.isDirectory ? '—' : formatBytes(info.size ?? 0),
                    modified: formatDate(info.modificationTime ?? 0),
                },
            });
        } catch (e: any) {
            Alert.alert('Помилка', e.message);
        }
    };

    // ── UI ──
    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>📂 Файловий менеджер</Text>
            </View>

            {/* Storage stats — тільки на кореневому екрані */}
            {pathStack.length === 1 && <StorageStats stats={storageStats} />}

            {/* Path bar */}
            <View style={styles.pathBar}>
                {pathStack.length > 1 && (
                    <TouchableOpacity onPress={navigateUp} style={styles.backBtn}>
                        <Icon name="back" size={14} />
                        <Text style={styles.backText}> Назад</Text>
                    </TouchableOpacity>
                )}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text style={styles.pathText}>🏠 {relativePath}</Text>
                </ScrollView>
            </View>

            {/* Action bar */}
            <View style={styles.actionBar}>
                <TouchableOpacity style={styles.createBtn} onPress={() => openCreateModal('folder')}>
                    <Text style={styles.createBtnText}>＋ Папка</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.createBtn, styles.createFileBtnAccent]} onPress={() => openCreateModal('file')}>
                    <Text style={styles.createBtnText}>＋ Файл</Text>
                </TouchableOpacity>
            </View>

            {/* File list */}
            {loading ? (
                <ActivityIndicator style={{ marginTop: 40 }} color="#7C83FD" size="large" />
            ) : items.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>📭</Text>
                    <Text style={styles.emptyText}>Директорія порожня</Text>
                </View>
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
                            onEdit={openEditModal}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}

            {/* Modal: Create folder / file */}
            <AppModal
                visible={createModal.visible}
                title={createModal.type === 'folder' ? '📁 Нова папка' : '📄 Новий файл'}
                onClose={() => setCreateModal({ ...createModal, visible: false })}
            >
                <TextInput
                    style={styles.input}
                    placeholder={createModal.type === 'folder' ? 'Назва папки' : 'Назва файлу (без .txt)'}
                    placeholderTextColor="#888"
                    value={newName}
                    onChangeText={setNewName}
                />
                {createModal.type === 'file' && (
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder="Початковий вміст..."
                        placeholderTextColor="#888"
                        value={newContent}
                        onChangeText={setNewContent}
                        multiline
                        textAlignVertical="top"
                    />
                )}
                <TouchableOpacity style={styles.primaryBtn} onPress={handleCreate}>
                    <Text style={styles.primaryBtnText}>Створити</Text>
                </TouchableOpacity>
            </AppModal>

            {/* Modal: View file */}
            <AppModal
                visible={viewModal.visible}
                title={`📄 ${viewModal.name}`}
                onClose={() => setViewModal({ ...viewModal, visible: false })}
            >
                <ScrollView style={styles.fileContent}>
                    <Text style={styles.fileContentText}>
                        {viewModal.content || '(файл порожній)'}
                    </Text>
                </ScrollView>
            </AppModal>

            {/* Modal: Edit file */}
            <AppModal
                visible={editModal.visible}
                title={`✏️ ${editModal.name}`}
                onClose={() => setEditModal({ ...editModal, visible: false })}
            >
                <TextInput
                    style={[styles.input, styles.editArea]}
                    value={editModal.content}
                    onChangeText={(text) => setEditModal({ ...editModal, content: text })}
                    multiline
                    textAlignVertical="top"
                    placeholder="Введіть текст..."
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.primaryBtn} onPress={handleSave}>
                    <Icon name="save" size={16} />
                    <Text style={styles.primaryBtnText}>  Зберегти</Text>
                </TouchableOpacity>
            </AppModal>

            {/* Modal: File info */}
            <AppModal
                visible={infoModal.visible}
                title="ℹ️ Інформація"
                onClose={() => setInfoModal({ ...infoModal, visible: false })}
            >
                {infoModal.info && (
                    <View style={styles.infoTable}>
                        {([
                            ['Назва', infoModal.info.name],
                            ['Тип',   infoModal.info.type],
                            ['Розмір', infoModal.info.size],
                            ['Змінено', infoModal.info.modified],
                        ] as [string, string][]).map(([label, value]) => (
                            <View key={label} style={styles.infoRow}>
                                <Text style={styles.infoLabel}>{label}</Text>
                                <Text style={styles.infoValue}>{value}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </AppModal>

        </SafeAreaView>
    );
}