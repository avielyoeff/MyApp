import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { jsdom } from 'jsdom-jscore-rn';
// import { read } from 'readability-js';
var { Readability } = require('@mozilla/readability');

// const { Readability } = require('@mozilla/readability');
// var read = require('readability-js');
function Details(): JSX.Element {
  const { params } = useRoute();
  const { item } = params;

  // read(item.url, function (err, article, meta) {
  //   // Main Article
  //   console.log(article.content.text());

  //   // Title
  //   console.log(article.title);

  //   // Article HTML Source Code
  //   console.log(article.content.html());
  // });
  axios.get(item.url).then(function (r1) {
    // console.log('🚀 ~ file: details.tsx ~ line 18 ~ dom', r1.data);
    let dom = jsdom(r1.data);
    console.log('🚀 ~ file: details.tsx ~ line 20 ~ dom', dom);
    const article = new Readability(dom.window.document).parse();
    console.log('🚀 ~ file: details.tsx ~ line 21 ~ article', article);
  });

  //console.log('🚀 ~ file: details.tsx ~ line 18 ~ dom', dom);
  // console.log('🚀 ~ file: details.tsx ~ line 23 ~ dom', dom);
  // read(firstResult.url, function (err, article, meta) {
  //   // Main Article
  //   console.log(article.content.text());

  //   // Title
  //   console.log(article.title);

  //   // Article HTML Source Code
  //   console.log(article.content.html());
  // });
  // now pass the DOM document into readability to parse
  // let article = new readability(dom.window.document).parse();

  // Done! The article content is in the textContent property
  // console.log(article.textContent);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginVertical: 7,
        backgroundColor: '#f8fafcff',
        borderRadius: 10,
      }}>
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
      <Text style={{ fontSize: 11 }}>{item.publishedAt}</Text>
      <Text style={{ fontSize: 11, fontWeight: 'bold' }}>
        {item.author && item.author.length > 0 && `author: ${item.author}`}
      </Text>
      <View style={{ marginBottom: 10 }}>
        <Image
          style={{ width: '100%', height: 300 }}
          source={{ uri: item.urlToImage }}
        />
      </View>
      <Text>
        <Text style={{ fontWeight: 'bold' }}>Description: </Text>
        {item.description}
      </Text>
      <Text>{item.content}</Text>
    </View>
  );
}

export default Details;
