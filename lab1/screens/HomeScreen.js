import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const newsData = [
    {
        id: '1',
        title: 'Новина 1',
        date: '12.02.2026',
        desc: 'Короткий опис новини',
        img: 'https://picsum.photos/200/200?1'
    },
    {
        id: '2',
        title: 'Новина 2',
        date: '11.02.2026',
        desc: 'Ще один короткий опис',
        img: 'https://picsum.photos/200/200?2'
    },
];

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Новини</Text>

            <FlatList
                data={newsData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.img }} style={styles.image} />
                        <View style={styles.textBlock}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                            <Text style={styles.desc}>{item.desc}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    card: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        padding: 8
    },
    image: { width: 80, height: 80, borderRadius: 6 },
    textBlock: { marginLeft: 10, flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold' },
    date: { fontSize: 12, color: '#666' },
    desc: { fontSize: 13 }
});
