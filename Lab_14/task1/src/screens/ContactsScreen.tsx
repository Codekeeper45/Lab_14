import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  StatusBar,
} from 'react-native';
import { generateContacts } from '../utils/mockData';
import { Contact } from '../types';

const ITEM_HEIGHT = 80;

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>(generateContacts(1000));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setContacts(generateContacts(1000));
      setRefreshing(false);
    }, 1500);
  }, []);

  const handlePress = (contact: Contact) => {
    Alert.alert('Contact Details', `${contact.firstName} ${contact.lastName}\n${contact.email}`);
  };

  const renderItem = useCallback(({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}> 
        <Text style={styles.avatarText}>
          {item.firstName[0]}{item.lastName.split(' ').pop()?.[0]}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.emailText}>{item.email}</Text>
      </View>
      <View style={styles.chevron}>
        <Text style={styles.chevronText}>›</Text>
      </View>
    </TouchableOpacity>
  ), []);

  const keyExtractor = useCallback((item: Contact) => item.id, []);

  const getItemLayout = useCallback((_data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  const renderSeparator = () => <View style={styles.separator} />;

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No contacts found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Contacts</Text>
        <Text style={styles.headerSubtitle}>{contacts.length} contacts available</Text>
      </View>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmpty}
        getItemLayout={getItemLayout}
        initialNumToRender={15}
        windowSize={5}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6C63FF']}
            tintColor="#6C63FF"
          />
        }
        contentContainerStyle={contacts.length === 0 ? { flex: 1 } : undefined}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: ITEM_HEIGHT,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  emailText: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  chevron: {
    marginLeft: 10,
  },
  chevronText: {
    fontSize: 24,
    color: '#CCCCCC',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 85,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
});
