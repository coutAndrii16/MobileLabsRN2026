import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../components/CustomDrawer";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function RootLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerLeft: () => <DrawerToggleButton />
            }}
        >
            <Drawer.Screen name="(news)" options={{ title: "Новини" }} />
            <Drawer.Screen name="contacts" options={{ title: "Контакти" }} />
        </Drawer>
    );
}