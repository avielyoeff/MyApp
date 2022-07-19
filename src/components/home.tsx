import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Pressable,
  Image,
  TextInput,
} from 'react-native';

import { truncateString } from '../utils/logic';

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];
function Home(): JSX.Element {
  const { navigate } = useNavigation();
  const [category, setCategory] = useState('');
  const [searchKeyword, setSearch] = useState('');

  const { isLoading, error, data } = useQuery(
    ['HEADLINES_LIST', category],
    () =>
      axios
        .get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: '8da119f4ec554c1e8fa6bff2fc73ab9c',
            category,
            q: searchKeyword,
          },
        })
        .then((res) => res.data.articles),
  );

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigate('Details', { item })}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 30,
          marginHorizontal: 20,
          marginVertical: 7,
          backgroundColor: '#f8fafcff',
          borderRadius: 10,
        }}>
        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ fontSize: 11 }}>{item.publishedAt}</Text>
        <View style={{ marginBottom: 10 }}>
          <Image
            style={{ width: '100%', height: 300 }}
            source={{ uri: item.urlToImage }}
          />
        </View>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Description: </Text>
          {item.description && truncateString(item.description, 80)}
        </Text>
      </Pressable>
    );
  };

  return (
    <View>
      <View
        style={{
          margin: 10,
          width: '70%',
          alignSelf: 'flex-end',
          backgroundColor: '#f8fafcff',
          borderRadius: 10,
        }}>
        <TextInput
          placeholder="Search"
          style={{ borderBottomWidth: 1 }}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row-reverse',
          flexWrap: 'wrap',
        }}>
        {categories.map((categoryName) => {
          return (
            <Pressable
              key={categoryName}
              onPress={() => setCategory(categoryName)}
              style={{
                margin: 10,
                padding: 10,
                backgroundColor: '#f8fafcff',
                borderRadius: 30,
              }}>
              <Text>{categoryName}</Text>
            </Pressable>
          );
        })}
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, i) => item.title}
      />
    </View>
  );
}

export default Home;
