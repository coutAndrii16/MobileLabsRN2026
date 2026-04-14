import { View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
    const { title, description, image } = useLocalSearchParams();

    return (
        <View>
            <Image source={{ uri: image as string }} style={{ height: 200 }} />
            <Text>{title}</Text>
            <Text>{description}</Text>
        </View>
    );
}