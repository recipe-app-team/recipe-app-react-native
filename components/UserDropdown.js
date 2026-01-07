import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Pressable,
} from "react-native";
import { useState } from "react";

export default function UserDropdown({ user, onProfilePress, onLogoutPress }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    const displayName = user.username || user.name || user.email.split("@")[0];

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                style={styles.trigger}
            >
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {displayName.charAt(0).toUpperCase()}
                    </Text>
                </View>
                <Text style={styles.username}>{displayName}</Text>
                <Text style={styles.arrow}>{isOpen ? "▲" : "▼"}</Text>
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() => setIsOpen(false)}
                >
                    <View style={styles.dropdown}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setIsOpen(false);
                                onProfilePress();
                            }}
                        >
                            <Text style={styles.menuIcon}>👤</Text>
                            <Text style={styles.menuText}>My Profile</Text>
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setIsOpen(false);
                                onLogoutPress();
                            }}
                        >
                            <Text style={styles.menuIcon}>🚪</Text>
                            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        marginRight: 15,
    },
    trigger: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    avatarText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    username: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111",
        marginRight: 6,
    },
    arrow: {
        fontSize: 10,
        color: "#666",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingTop: 60,
        paddingRight: 15,
    },
    dropdown: {
        backgroundColor: "#fff",
        borderRadius: 12,
        minWidth: 180,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        overflow: "hidden",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    menuIcon: {
        fontSize: 18,
        marginRight: 12,
    },
    menuText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#111",
    },
    logoutText: {
        color: "#d00",
    },
    divider: {
        height: 1,
        backgroundColor: "#e0e0e0",
    },
});
