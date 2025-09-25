import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { getUpdateSource, HotUpdater } from "@hot-updater/react-native";

function useOTAUpdates() {
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        await HotUpdater.runUpdateProcess({
          reloadOnForceUpdate: true,
          source: getUpdateSource(
            `${process.env.EXPO_PUBLIC_CLOUDFLARE_WORKER_URL}/api/check-update`,
            { updateStrategy: "appVersion" },
          ),
        });
      } catch (err) {
        console.error("Ota update failed", err);
      }
    };
    checkForUpdates();
  }, []);
}

export default function App() {
  useOTAUpdates();

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
