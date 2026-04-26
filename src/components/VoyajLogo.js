import {
  PlayfairDisplay_700Bold,
  useFonts,
} from "@expo-google-fonts/playfair-display";
import { Text, StyleSheet } from "react-native";

/**
 * Branded "Voyaj." wordmark in Playfair Display Bold.
 * Falls back to a system serif until the font loads.
 */
export default function VoyajLogo({ style }) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  return (
    <Text
      style={[
        styles.logo,
        fontsLoaded ? styles.playfair : styles.fallback,
        style,
      ]}
    >
      Voyaj.
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 40,
    color: "#111827",
    marginBottom: 24,
  },
  playfair: {
    fontFamily: "PlayfairDisplay_700Bold",
  },
  fallback: {
    fontWeight: "700",
    fontStyle: "italic",
  },
});
