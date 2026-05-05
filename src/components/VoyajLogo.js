import {
  PlayfairDisplay_700Bold,
  useFonts,
} from "@expo-google-fonts/playfair-display";
import { Text, StyleSheet } from "react-native";

/**
 * Branded "Voyaj." wordmark in Playfair Display Bold.
 * Pass `color` prop for dark/light backgrounds. Falls back to system serif until font loads.
 */
export default function VoyajLogo({ style, color = "#111827" }) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  return (
    <Text
      style={[
        styles.logo,
        { color },
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
    marginBottom: 8,
  },
  playfair: {
    fontFamily: "PlayfairDisplay_700Bold",
  },
  fallback: {
    fontWeight: "700",
    fontStyle: "italic",
  },
});
