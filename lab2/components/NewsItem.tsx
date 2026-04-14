import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";

export default function NewsItem({ item, onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        padding: 12,
        borderRadius: 12,
        marginHorizontal: 10,
        elevation: 3
    },
    image: {
        height: 140,
        borderRadius: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 6,
        color: Colors.text
    },
    desc: {
        color: Colors.gray,
        marginTop: 2
    }
});