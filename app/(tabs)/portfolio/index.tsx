import React, {useState,useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView,Modal, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useRouter,useNavigation } from 'expo-router';
import "../global"

export default function PortfolioScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState(null);
  const investments = global.portfolio
  const money = global.money
  const handleTradeClick = (investment) => {
    setSelectedInvestment(investment); // Store the clicked investment
    setModalVisible(true);             // Show the modal
  };
  const handleremove = () => {
    // Convert the input value to a number and add it to global.money
        global.portfolio = global.portfolio.filter(item => !(item.name === selectedInvestment?.name &&
            item.profit === selectedInvestment?.profit &&
            item.amount === selectedInvestment?.amount &&
            item.copying === selectedInvestment?.copying)
      );
    global.money = (global.money || 0) + parseFloat(selectedInvestment?.amount.slice(1));
    // Navigate to another page (replace 'anotherpage' with your actual page path)
    setModalVisible(false);
  };

  return (
  <View style={styles.container}>
    {/* Scrollable content */}
  <ScrollView style={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Portfolio</Text>
        <Icon name="anchor" type="font-awesome" color="white" style={styles.headerIcon} />
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

      {/* Wallet Balance */}
      <View style={styles.walletContainer}>
        <Text style={styles.walletBalance}>${money}</Text>
        <TouchableOpacity style={styles.topUpButton}
        onPress={() => router.push('/topup')}>
          <Text style={styles.topUpText}>+ top-up</Text>
        </TouchableOpacity>
      </View>
      {/* Active Investments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Investments</Text>
        {investments.map((investment, index) => (
          <View key={index} style={styles.investmentItem}>
            <View style={styles.investmentInfo}>
              <Text style={styles.investmentName}>{investment.name}</Text>
              <Text style={styles.copyingText}>Copying: {investment.copying}</Text>
            </View>
            <Text style={investment.profit.startsWith('-') ? styles.lossText : styles.profitText}>
              {investment.profit}
            </Text>
            <Text style={styles.investmentAmount}>{investment.amount}</Text>
            <TouchableOpacity style={styles.stopTradeButton} onPress={() => handleTradeClick(investment)}>
              <Text style={styles.stopTradeText}>Stop Trade</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
    <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to close the {selectedInvestment?.name} trade?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'red' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'green' }]}
                onPress={handleremove}
              >
                <Text style={styles.modalButtonText}>Confirm close trade</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
      contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 70, // Add extra space for footer
      },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
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
  chart: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  walletBalance: {
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
  },
  topUpButton: {
    backgroundColor: '#6c63ff',
    padding: 10,
    borderRadius: 5,
  },
  topUpText: {
    color: 'white',
    fontSize: 14,
  },
  investmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  investmentInfo: {
    flex: 1,
  },
  investmentName: {
    color: 'white',
    fontWeight: 'bold',
  },
  copyingText: {
    color: 'gray',
  },
  profitText: {
    color: 'green',
    fontWeight: 'bold',
  },
  lossText: {
    color: 'red',
    fontWeight: 'bold',
  },
  investmentAmount: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  stopTradeButton: {
    backgroundColor: '#6c63ff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  stopTradeText: {
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
