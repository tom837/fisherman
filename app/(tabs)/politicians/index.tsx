import React,{ useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { useRouter,useNavigation } from 'expo-router';
import '../global'

export default function PoliticiansScreen() {
    
    const navigation = useNavigation();
    const [filteredPoliticians, setFilteredPoliticians] = useState(global.politicians);
    const [searchQuery, setSearchQuery] = useState('');
    
    const router = useRouter(); 
    const handleSearch = (text) => {
      setSearchQuery(text);
  
      if (text.trim() === '') {
        setFilteredPoliticians(global.politicians); // Reset to all politicians if query is empty
        return;
      }
  
      // Filter politicians based on how closely the name matches the query
      const filteredList = global.politicians
        .filter((politician) => politician.name.toLowerCase().includes(text.toLowerCase()))
        .slice(0, 5); // Limit to top 5 matches
  
      setFilteredPoliticians(filteredList);
    };

  return (
    <View style={styles.container}>
      {/* Scrollable content */}
    <ScrollView style={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Politicians</Text>
        <Icon name="anchor" type="font-awesome" color="white" style={styles.headerIcon} />
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for politicians"
            placeholderTextColor="gray"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch} // Update the search query as the user types
          />
          <Icon name="search" type="font-awesome" color="white" />
        </View>
        {filteredPoliticians.length < 12 ? (
    <>
      {/* Top 5 Matches Section */}
      <Text style={styles.sectionTitle}>Top 5 Matches:</Text>
      {filteredPoliticians.map((politician, index) => (
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
    </>
  ) : (
    <>
      {/* Following Section if there are no filtered politicians */}
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
    </>
  )}

    </ScrollView>
    <View style={styles.footer}>
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon name="home"  color='white' style={styles.icon} />
          <Text style={styles.footerItem}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate("Politicians")}>
        <Icon name="person" type="material" color='#007AFF' style={styles.icon} />
          <Text style={[styles.footerItem, { color: '#007AFF' }]}>Politicians</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Portfolio")}>
        <Icon name="briefcase" type="font-awesome"  color='white' style={styles.icon} />
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
