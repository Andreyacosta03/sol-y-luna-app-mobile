import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase/config";

const ScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (!permission) {
    return <Text>Solicitando permiso para la cámara...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Sin acceso a la cámara</Text>
        <Text onPress={requestPermission} style={styles.link}>
          Dar permiso
        </Text>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }: { data: String }) => {
    if (scanned) return;
    setScanned(true);
    setLoading(true);

    try {
      const q = query(collection(db, "products"), where("barcode", "==", data));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        router.replace(`/product/${data}`);
      } else {
        Alert.alert(
          "Producto no encontrado",
          "¿Deseas agregar este producto manualmente?",
          [
            {
              text: "Cancelar",
              onPress: () => {
                setScanned(false);
                router.replace("/");
              },
            },
            {
              text: "Agregar",
              onPress: () => router.replace(`/product/add?barcode=${data}`),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      Alert.alert("Error", "No se pudo buscar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code39",
            "code128",
          ],
        }}
        onBarcodeScanned={handleBarCodeScanned}
      />
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Buscando producto...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
  },
  link: {
    color: "#3498db",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default ScannerScreen;
