import { StyleSheet, Text, View } from "react-native";
import { AppButton, Screen, uiStyles } from "@/components/ui";
import type { Vendor } from "@/lib/data";

interface VendorDetailScreenProps {
  vendor: Vendor;
}

export function VendorDetailScreen({ vendor }: VendorDetailScreenProps) {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.category}>{vendor.category}</Text>
        <Text style={uiStyles.heading}>{vendor.name}</Text>
        <Text style={uiStyles.subheading}>{vendor.location}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.metricLabel}>Rating</Text>
        <Text style={styles.metricValue}>
          {vendor.rating} ({vendor.reviewCount} reviews)
        </Text>
        <Text style={styles.metricLabel}>Price Range</Text>
        <Text style={styles.metricValue}>{vendor.priceRange}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bodyText}>{vendor.longDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        {vendor.services.map((service) => (
          <Text key={service} style={styles.serviceItem}>
            • {service}
          </Text>
        ))}
      </View>

      <View style={styles.actions}>
        <AppButton
          label="Send Inquiry"
          onPress={() => {
            console.log("Send inquiry");
            // TODO: Implement send inquiry
          }}
        />
        <AppButton
          label="Request a Call"
          onPress={() => {
            console.log("Request a call");
            // TODO: Implement request a call
          }}
          variant="outline"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 4,
  },
  category: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4b5563",
    textTransform: "uppercase",
  },
  card: {
    marginTop: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4b5563",
    textTransform: "uppercase",
  },
  metricValue: {
    fontSize: 14,
    color: "#111827",
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },
  serviceItem: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
  },
  actions: {
    marginTop: 24,
    gap: 10,
  },
});
