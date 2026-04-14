import { SectionList, Text, View } from "react-native";
import { Colors } from "../constants/theme";

const contacts = [
    { title: "A", data: ["Andrii", "Anton"] },
    { title: "B", data: ["Bogdan", "Boris"] },
];

export default function ContactsScreen() {
    return (
        <SectionList
            sections={contacts}
            keyExtractor={(item, index) => item + index}

            renderItem={({ item }) =>   <Text style={{ padding: 10, color: Colors.text }}>{item}</Text>
            }
            renderSectionHeader={({ section }) => (
                <Text style={{
                    backgroundColor: Colors.secondary,
                    padding: 8,
                    fontWeight: "bold"
                }}>
                    {section.title}
                </Text>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        />
    );
}