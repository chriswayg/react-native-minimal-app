import React from 'react';
import {Text, SafeAreaView} from 'react-native';

export default function App() {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 32, textAlign: 'center'}}>
        The price of freedom is eternal vigilance.
      </Text>
    </SafeAreaView>
  );
}
