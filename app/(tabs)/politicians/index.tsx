import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { useRouter,useNavigation } from 'expo-router';
import '../global'
import { useEffect } from 'react';

export default function PoliticiansScreen() {
    
    const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

    
    const router = useRouter(); 

  return (
    <View style={styles.container}>
      {/* Scrollable content */}
    <ScrollView style={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Politicians</Text>
        <Icon name="anchor" type="font-awesome" color="white" style={styles.headerIcon} />
      </View>
      <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for politicians"
            placeholderTextColor="gray"
            style={styles.searchInput}
          />
          <Icon name="search" type="font-awesome" color="white" />
        </View>
      {/* Following Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Following:</Text>
        {global.followedpoliticians.map((politician, index) => (
          <TouchableOpacity
            key={index}
            style={styles.politicianItem}
            onPress={() => router.push(`/politician/${politician.id}`)}
          >
            <Image source={{ uri: politician.image }} style={styles.politicianImage} />
            <View style={styles.politicianInfo}>
              <Text style={styles.politicianName}>{politician.name}</Text>
              <Text style={styles.politicianProfit}>Profit: {politician.profit}</Text>
            </View>
            <Icon name="chevron-right" type="font-awesome" color="white" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Discover Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discover:</Text>
        {global.discoverpoliticians.map((politician, index) => (
          <TouchableOpacity
            key={index}
            style={styles.politicianItem}
            onPress={() => router.push(`/politician/${politician.id}`)}
          >
            <Image source={{ uri: politician.image }} style={styles.politicianImage} />
            <View style={styles.politicianInfo}>
              <Text style={styles.politicianName}>{politician.name}</Text>
              <Text style={styles.politicianProfit}>Profit: {politician.profit}</Text>
            </View>
            <Icon name="chevron-right" type="font-awesome" color="white" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    <View style={styles.footer}>
    <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.footerItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/politicians')}>
        <Text style={styles.footerItem}>Politicians</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/portfolio')}>
        <Text style={styles.footerItem}>Portfolio</Text>
      </TouchableOpacity>
    {/* Add other navigation options here */}
    </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 70, // Add extra space for footer
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:20,
    marginBottom: 20,
    marginTop:20,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  headerIcon: {
    marginRight: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  politicianItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  politicianImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  politicianInfo: {
    flex: 1,
    marginLeft: 10,
  },
  politicianName: {
    color: 'white',
    fontWeight: 'bold',
  },
  politicianProfit: {
    color: 'gray',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  footerItem: {
    color: 'white',
    fontSize: 16,
  },
});
