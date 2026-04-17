import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from './Icon';
import { formatBytes } from '../app/utils/formatBytes';
import { styles } from '../styles/globalStyles';

const StorageStats = ({ stats }) => {
    if (!stats) return <ActivityIndicator />;

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsHeader}>
                <Icon name="storage" size={16} />
                <Text style={styles.statsTitle}> Пам'ять</Text>
            </View>

            <Text>{formatBytes(stats.totalDiskCapacity)}</Text>
        </View>
    );
};

export default StorageStats;