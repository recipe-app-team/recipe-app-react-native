import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { getUser, updateUser, logoutUser } from "../utils/authStorage";

export default function ProfileScreen({ navigation }) {
    const [user, setUser] = useState(null);

    // Personal Info
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    // Password Change
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const u = await getUser();
        if (u) {
            setUser(u);
            setName(u.name || "");
            setUsername(u.username || "");
            setEmail(u.email);
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
        }
    };

    const handleSave = async () => {
        const cleanEmail = email.trim().toLowerCase();
        const cleanUsername = username.trim();

        if (!name.trim() || !cleanUsername || !cleanEmail) {
            Alert.alert("Error", "Name, username, and email are required");
            return;
        }

        // Check if user wants to change password
        const isChangingPassword = oldPassword || newPassword || confirmPassword;

        if (isChangingPassword) {
            if (!oldPassword || !newPassword || !confirmPassword) {
                Alert.alert("Error", "Please fill all password fields to change password");
                return;
            }

            if (newPassword !== confirmPassword) {
                Alert.alert("Error", "New passwords do not match");
                return;
            }

            if (newPassword.length < 6) {
                Alert.alert("Error", "Password must be at least 6 characters");
                return;
            }
        }

        setLoading(true);
        try {
            const userData = {
                name: name.trim(),
                username: cleanUsername,
                email: cleanEmail,
            };

            // Only include password if changing
            if (isChangingPassword) {
                userData.password = newPassword;
            }

            const updatedUser = await updateUser(
                user.email,
                userData,
                isChangingPassword ? oldPassword : null
            );

            setUser(updatedUser);

            // Clear password fields
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

            Alert.alert("Success", "Profile updated successfully!");
        } catch (err) {
            Alert.alert("Error", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                    await logoutUser();
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                },
            },
        ]);
    };

    if (!user) {
        return null;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.avatarLarge}>
                        <Text style={styles.avatarLargeText}>
                            {(username || email).charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.title}>My Profile</Text>
                    <Text style={styles.subtitle}>Manage your account information</Text>
                </View>

                {/* Personal Information Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionIcon}>👤</Text>
                        <Text style={styles.sectionTitle}>Personal Information</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            placeholder="Enter your full name"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            placeholder="Enter your username"
                            value={username}
                            autoCapitalize="none"
                            onChangeText={setUsername}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* Security Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionIcon}>🔒</Text>
                        <Text style={styles.sectionTitle}>Change Password</Text>
                    </View>

                    <Text style={styles.sectionDescription}>
                        Leave blank if you don't want to change your password
                    </Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Current Password</Text>
                        <TextInput
                            placeholder="Enter current password"
                            secureTextEntry
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>New Password</Text>
                        <TextInput
                            placeholder="Enter new password"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirm New Password</Text>
                        <TextInput
                            placeholder="Confirm new password"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity
                    onPress={handleSave}
                    disabled={loading}
                    style={[styles.saveButton, loading && styles.buttonDisabled]}
                >
                    <Text style={styles.saveButtonText}>
                        {loading ? "Saving..." : "💾 Save Changes"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>🚪 Logout</Text>
                </TouchableOpacity>

                <View style={styles.spacer} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fa",
    },
    content: {
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
        paddingTop: 10,
    },
    avatarLarge: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    avatarLargeText: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "700",
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#111",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        color: "#666",
        fontWeight: "400",
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    sectionIcon: {
        fontSize: 22,
        marginRight: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111",
    },
    sectionDescription: {
        fontSize: 13,
        color: "#888",
        marginBottom: 16,
        fontStyle: "italic",
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        backgroundColor: "#fafafa",
        color: "#111",
    },
    saveButton: {
        backgroundColor: "#111",
        padding: 18,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    logoutButton: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 12,
        borderWidth: 2,
        borderColor: "#d00",
    },
    logoutButtonText: {
        color: "#d00",
        fontSize: 17,
        fontWeight: "700",
    },
    spacer: {
        height: 20,
    },
});
