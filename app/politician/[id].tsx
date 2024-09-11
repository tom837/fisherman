import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRouter, useGlobalSearchParams,useNavigation  } from 'expo-router';
import '../(tabs)/global'

export default function PoliticianDetailScreen() {
    const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
    const router = useRouter();
    const { id } = useGlobalSearchParams();

  const politicians= global.politicians;
  const politician = politicians.find(p => p.id === id);
  let [isFollowed, setidfollowed] = useState(false);
  useEffect(() => {
    if (politician && politician.followe === "true") {
      setidfollowed(true);
    }
  }, [politician]);
  const tmp = global.peopleinvestments.find(investments => investments.name === politician?.name);
  const investments = tmp?.investments
  const handlefollow = () => {
    if (isFollowed){
        const { followe, ...politicianWithoutFollowe } = politician;
        global.politicians=global.politicians.filter(pol => pol.id !== politician.id)
        global.politicians.push({ name: politician.name, profit: politician.profit, image: politician.image,followe:'false', id:politician.id },)
        global.followedpoliticians=global.followedpoliticians.filter(pol => pol.id !== politician.id)
        global.discoverpoliticians.push(politicianWithoutFollowe)
        setidfollowed(false)
    }else{
        const { followe, ...politicianWithoutFollowe } = politician;
        global.politicians=global.politicians.filter(pol => pol.id !== politician.id)
        global.politicians.push({ name: politician.name, profit: politician.profit, image: politician.image,followe:'true', id:politician.id },)
        global.discoverpoliticians=global.discoverpoliticians.filter(pol => pol.id !== politician.id)
        global.followedpoliticians.push(politicianWithoutFollowe)
        setidfollowed(true)
    }

  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" type="material" color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlefollow}>
            <MaterialIcons name="notifications" size={24} color={isFollowed ? "blue" : "white"}/>
        </TouchableOpacity>
      </View>

      {/* Politician Info */}
      <View style={styles.profileContainer}>
        <Image
          source={{  uri: politician?.image }} // Placeholder image (replace with actual image URL)
          style={styles.politicianImage}
        />
        <Text style={styles.politicianName}>{politician?.name}</Text>
        <Text style={styles.politicianProfit}>Total Profit: {politician?.profit}</Text>
      </View>

      {/* Investments */}
      <ScrollView style={styles.investmentSection}>
        <Text style={styles.sectionTitle}>{politician?.name}'s Investments</Text>
        {investments?.map((investment) => (
          <View key={investment.id} style={styles.investmentItem}>
            <View>
              <Text style={investment.profit.startsWith('-') ? styles.lossText : styles.profitText}>
                {investment.profit}
              </Text>
              <Text style={styles.investmentName}>{investment.name}</Text>
              <Text style={styles.investmentAmount}>Investment: {investment.amount}</Text>
            </View>
            <TouchableOpacity style={styles.copyTradeButton}
            onPress={() => router.push(`/copy/${investment.name}/${politician.name }`)}>
              <Text style={styles.copyTradeText}>Copy Trade</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}

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
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginTop:20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  politicianImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  politicianName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  politicianTitle: {
    color: 'gray',
    marginBottom: 5,
  },
  politicianProfit: {
    color: 'green',
    fontSize: 18,
  },
  investmentSection: {
    marginVertical: 0,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  investmentItem: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  investmentName: {
    color: 'white',
    fontWeight: 'bold',
  },
  investmentAmount: {
    color: 'gray',
    marginBottom: 5,
  },
  profitText: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lossText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  copyTradeButton: {
    backgroundColor: '#6c63ff',
    padding: 10,
    borderRadius: 5,
  },
  copyTradeText: {
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
