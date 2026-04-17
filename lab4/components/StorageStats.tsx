import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from './Icon';
import { formatBytes } from '../app/utils/formatBytes';
import { styles } from '../styles/globalStyles';

const StorageStats = ({ stats }) => (
    <View style={styles.statsContainer}>
        <View style={styles.statsHeader}>
            <Icon name="storage" size={16} />
            <Text style={styles.statsTitle}>  Пам'ять пристрою</Text>
        </View>

        {stats ? (
            <>
                <View style={styles.statsRow}>
                    <Text style={styles.statsLabel}>Загальний обсяг:</Text>
                    <Text style={styles.statsValue}>
                        {formatBytes(stats.totalDiskCapacity)}
                    </Text>
                </View>

                <View style={styles.statsRow}>
                    <Text style={styles.statsLabel}>Вільно:</Text>
                    <Text style={[styles.statsValue, { color: '#4CAF50' }]}>
                        {formatBytes(stats.freeDiskSpace)}
                    </Text>
                </View>

                <View style={styles.statsRow}>
                    <Text style={styles.statsLabel}>Зайнято:</Text>
                    <Text style={[styles.statsValue, { color: '#FF6B6B' }]}>
                        {formatBytes(
                            (stats.totalDiskCapacity || 0) - (stats.freeDiskSpace || 0)
                        )}
                    </Text>
                </View>

                {/* Смуга завантаженості */}
                <View style={styles.barBg}>
                    <View
                        style={[
                            styles.barFill,
                            {
                                width: `${Math.min(
                                    100,
                                    stats.totalDiskCapacity
                                        ? (((stats.totalDiskCapacity - stats.freeDiskSpace) /
                                                stats.totalDiskCapacity) *
                                            100)
                                        : 0
                                )}%`,
                            },
                        ]}
                    />
                </View>
            </>
        ) : (
            <ActivityIndicator color="#7C83FD" />
        )}
    </View>
);

export default StorageStats;