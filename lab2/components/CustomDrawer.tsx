import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";

export default function CustomDrawer(props: any) {
    return (
        <DrawerContentScrollView {...props}>

            <View style={styles.header}>
                <Image
                    source={{ uri: "https://i.pravatar.cc/150" }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Андрій Майданович</Text>
                <Text style={styles.group}>ІПЗ-24-2</Text>
            </View>

            <DrawerItem
                label="Новини"
                labelStyle={styles.label}
                onPress={() => props.navigation.navigate("(news)")}
            />
            <DrawerItem
                label="Контакти"
                labelStyle={styles.label}
                onPress={() => props.navigation.navigate("contacts")}
            />

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.primary,
        padding: 20,
        alignItems: "center",
        marginBottom: 10
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#fff"
    },
    name: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    group: {
        color: "#fff",
        opacity: 0.8
    },
    label: {
        color: Colors.text,
        fontSize: 16
    }
});