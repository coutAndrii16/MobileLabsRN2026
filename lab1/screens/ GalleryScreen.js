import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const images = Array.from({ length: 20 }).map((_, i) => ({
    id: i.toString(),
    url: `https://picsum.photos/300/300?random=${i}`
}));

const screenWidth = Dimensions.get('window').width;
const itemSize = screenWidth / 2 - 15;

export default function GalleryScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.url }} style={styles.image} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    image: {
        width: itemSize,
        height: itemSize,
        margin: 5,
        borderRadius: 8
    }
});
