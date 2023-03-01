import { ActivityIndicator } from 'react-native';
import { WebView, View } from 'react-native-webview';
import * as React from 'react';

import {
    StyleSheet,
  } from "react-native";
  
  export default function Preview({route, navigation}) {
    const { sitePreview } = route.params;
    console.log("SITEPREVIEW:", sitePreview);

//    function displaySpinner() {
//         return (
//           <View>
//        <ActivityIndicator size="large" color="#76009d" />
//           </View>
//         );
//       }

    
    return (
       <WebView
       startInLoadingState={true}
      style={styles.container}
    //   source={{ uri: 'https://expo.dev' }}
      source={{ uri: sitePreview }}
    />
    );

}

 //
 // Styles
 //

 
  const styles = StyleSheet.create({
      content: {
          paddingHorizontal: 22,
          fontSize: 18,
          textAlign:'justify',
          lineHeight: 26,
          
      },
      title: {
          fontSize: 46,
          color: "white",
          backgroundColor: "#76009d",
          paddingHorizontal: 80,
          paddingVertical: 10, 
          borderRadius: 16,
          margin: 56,
      },
  
    container: {
      flex: 1,
      backgroundColor: "#ffbb00",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    input: {
      borderRadius: 16,
      backgroundColor: "#fff",
      width: 250,
      height: 50,
      margin: 20,
      padding: 10,
      fontSize: 16,
    },
    button: {
      backgroundColor: "blue",
      width: 140,
      height: 36,
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 16,
      margin: 36,
    },
    textbutton: {
      color: "white",
      alignSelf: "center",
      fontSize: 16,
    },
  });
  

  