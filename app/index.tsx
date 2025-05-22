import React from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

/**
 * Main component for the Home screen.
 * Displays navigation options to scan a barcode,
 * add a new product, and view the product list.
 */
const HomeScreen = () => {
  const router = useRouter(); // Hook to handle navigation between screens

  return (
    <View style={styles.container_background}>
      <View style={styles.container}>
        {/* Status bar with light text and dark background */}
        <StatusBar barStyle="light-content" backgroundColor="#1f2937" />

        {/* Main title */}
        <Text style={styles.title}>Sol y Luna</Text>

        {/* Subtitle description */}
        <Text style={styles.subtitle}>
          Tu asistente de precios de productos 📦
        </Text>

        {/* Button to navigate to the barcode scanner screen */}
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => router.push("/scanner")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Escanear codigo de barras 📷</Text>
        </TouchableOpacity>

        {/* Button to navigate to the add product screen */}
        <TouchableOpacity
          style={styles.addProductButton}
          onPress={() => router.push("/product/add")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Añadir producto ➕</Text>
        </TouchableOpacity>

        {/* Button to navigate to the product list screen */}
        <TouchableOpacity
          style={styles.listButton}
          onPress={() => router.push("/product/list")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>⮕ Lista de productos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * Styles for the components in the Home screen.
 */
const styles = StyleSheet.create({
  container_background: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  container: {
    width: "90%",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#302015",
    padding: 10,
    marginBottom: 12,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 17,
    color: "#3a281e",
    marginBottom: 20,
    padding: 10,
    textAlign: "center",
    fontFamily: "System",
  },
  scanButton: {
    backgroundColor: "#5468da",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 7,
    alignItems: "center",
  },
  addProductButton: {
    backgroundColor: "#10b981",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 40,
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 7,
    alignItems: "center",
  },
  listButton: {
    backgroundColor: "#2e355a",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 40,
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 7,
    alignItems: "center",
  },
  buttonText: {
    color: "#f9fafb",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
});

export default HomeScreen;
