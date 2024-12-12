import React from 'react';

import { WebView } from "react-native-webview";


export const WebViewDemo = ({ navigation }) => {
  return (
    <WebView
      source={{ uri: "https://reactnative.dev/" }}
      style={{ marginTop: 20 }}
    />
  );
}


