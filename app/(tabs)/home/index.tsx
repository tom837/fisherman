import React, {useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useRouter, useNavigation } from 'expo-router';
import '../global' // Adjust path if needed

export default function HomeScreen( ) {
   // Adjust path if needed



  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({ headerShown: false,Animation:false });
  }, [navigation]);
  const router = useRouter();
  const politicians = global.followedpoliticians
  const poli = []
  for (let i = 0; i < 3; i++) {
    if (politicians[i]) {
      poli.push(global.peopleinvestments.find(investments => investments.name === politicians[i]?.name))
    }
  }
  const portfolio = global.portfolio
  const port = []
  for (let i = 0; i < 3; i++) {
    if (portfolio[i]) {
      port.push(portfolio[i])
    }
  }
   return (
    
    <View style={styles.container}>
      {/* Scrollable content */}
    <ScrollView style={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profilePic}
        />
        <View style={styles.headerText}>
          <Text style={styles.welcome}>Tibo Louis</Text>
          <Text style={styles.subText}>Welcome back</Text>
        </View>
        <View style={styles.headerIcons}>
          <Icon name="sync" type="material" color="white" style={styles.icon} />
          <Icon name="anchor" type="font-awesome" color="white" style={styles.icon} />
        </View>
      </View>

      {/* Investment Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Investment performance</Text>
        <View style={styles.chart}>
          {/* Placeholder for chart */}
          <Image
            source={require('../images/performence.jpeg')}
            style={{ width: '100%', height: 250 }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Active Trades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Trades</Text>
        <TouchableOpacity onPress={() => router.push('/portfolio')}>
        <Text style={styles.viewMore}>View More</Text>
        </TouchableOpacity>
        {port.map((item) => (
          <TradeItem key={item.name} name={item.name} politician={item.copying} profit={item.profit} amount={item.amount}
          onPress={() => router.push(`/portfolio`)} />
        ))}
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => router.push('/politicians')}>
        <Text style={styles.viewMore}>View More</Text>
        </TouchableOpacity>
      {poli.map((item) => (
        <NotificationItem
        key={item.investments[0].id}
        name={item.name}
        bank={item.investments[0].name}
        profit={item.investments[0].profit}
        time={"bought "+ item.investments[0].id + " minutes ago"}
        image={politicians[poli.indexOf(item)].image}
        onPress={() => router.push(`/politician/${politicians[poli.indexOf(item)]?.id}`)}
      />
      ))}
      </View>
    </ScrollView>
    <View style={styles.footer}>
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon name="home"  color='#007AFF' style={styles.icon} />
          <Text style={[styles.footerItem, { color: '#007AFF' }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate("Politicians")}>
        <Icon name="person" type="material" color='white' style={styles.icon} />
          <Text style={styles.footerItem}>Politicians</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Portfolio")}>
        <Icon name="briefcase" type="font-awesome"  color='white' style={styles.icon} />
          <Text style={styles.footerItem}>Portfolio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const TradeItem = ({ name, politician, profit, amount, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.notificationItem}>
  <View style={styles.tradeItem}>
    <Text style={styles.tradeName}>{name}</Text>
    <Text style={styles.tradePolitician}>Copying: {politician}</Text>
    <Text style={profit.startsWith('-') ? styles.tradeLoss : styles.tradeProfit}>{profit}</Text>
    <Text style={styles.tradeAmount}>{amount}</Text>
  </View>
  </TouchableOpacity>
);

const NotificationItem = ({ name, bank,image, profit, time, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.notificationItem}>
    <Image
      source={{ uri: image }}  // Replace with actual image URL
      style={styles.notificationImage}
    />
    <View style={styles.notificationText}>
      <Text style={styles.notificationName}>{name}</Text>
      <Text style={styles.notificationBank}>{bank}</Text>
      <Text style={styles.notificationTime}>{time}</Text>
    </View>
    <Text style={profit.startsWith('-') ? styles.notificationLoss : styles.notificationProfit}>
      {profit}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 10,
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
    paddingTop:35,
    marginVertical: 20,
    marginTop: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  welcome: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: 'gray',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 5,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tradeItem: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  tradeName: {
    color: 'white',
    fontWeight: 'bold',
  },
  tradePolitician: {
    color: 'gray',
  },
  tradeProfit: {
    color: 'green',
  },
  tradeLoss: {
    color: 'red',
  },
  tradeAmount: {
    color: 'white',
  },
  viewMore: {
    color: '#6c63ff',
    textAlign: 'right',
    marginTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  notificationText: {
    flex: 1,
    marginLeft: 10,
  },
  notificationName: {
    color: 'white',
  },
  notificationBank: {
    color: 'gray',
  },
  notificationTime: {
    color: 'gray',
    fontSize: 12,
  },
  notificationProfit: {
    color: 'green',
    fontWeight: 'bold',
  },
  notificationLoss: {
    color: 'red',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    marginBottom:10,
    borderTopColor: '#333',
  },
  footerItem: {
    color: 'white',
    fontSize: 16,
  },
});