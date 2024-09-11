import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import { useRouter,useNavigation } from 'expo-router';
import '../global';

export default function CopyTradeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('200');
  
  const handleTopUp = () => {
    // Convert the input value to a number and add it to global.money
    global.money = (global.money || 0) + parseFloat(amount);

    // Navigate to another page (replace 'anotherpage' with your actual page path)
    setModalVisible(false);
    router.push('/portfolio');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/portfolio')}>
            <Icon name="arrow-back" type="material" color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Top-up</Text>
        </View>

        {/* Wallet Balance */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Wallet Balance</Text>
          <Text style={styles.balanceAmount}>${global.money}</Text>
        </View>
        {/* Top-up Section */}
        <View style={styles.topUpContainer}>
          <Text style={styles.topUpLabel}>Top-up with credit card: *** 9878</Text>
          <TextInput
            placeholder="200"
            placeholderTextColor="white"
            keyboardType="numeric"
            style={styles.input}
            value={amount} // Bind input value to state
            onChangeText={setAmount} // Update state on input change
          />
          <TouchableOpacity style={styles.topUpButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.topUpButtonText}>Top Up</Text>
          </TouchableOpacity>
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Performance</Text>
          <Image
            source={require('../images/performence.jpeg')}
            style={{ width: '100%', height: 250 }}
            resizeMode="contain"
          />
        </View>

        

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
              <Text style={styles.modalText}>Are you sure you want to to-up your account?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'red' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'green' }]}
                  onPress={handleTopUp}
                >
                  <Text style={styles.modalButtonText}>Confirm top-up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  balanceContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  balanceLabel: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 5,
  },
  balanceAmount: {
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  chartLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartImage: {
    width: '100%',
    height: 150,
  },
  topUpContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom:20,
  },
  topUpLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#444',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  topUpButton: {
    backgroundColor: '#6c63ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  topUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1e1e1e',
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
