import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
  } from "react-native";
  import * as React from "react";


  export default function Login({ navigation }) {

    return (
        <View style={styles.container}>

<Image
        style={styles.logo}
        source={require('../assets/pngegg.png')}
      />
          <Text>Identifiant</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder="Votre email"
            keyboardType="default"
          />
          <Text>Mot de passe</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder="Votre mot de passe"
            keyboardType="default"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Navbar")}>
            <Text style={styles.textbutton}>Se connecter</Text>
          </TouchableOpacity>
          </View>
    );
  }
  
  const styles = StyleSheet.create({
    logo: {
        height: 80,
        width: 300,
        margin: 50,
    
    },
    container: {
      flex: 1,
      backgroundColor: "#ffbb00",
      alignItems: "center",
      justifyContent: "center",
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
      backgroundColor: "#a92e34",
      paddingVertical: 8,
      paddingHorizontal: 24,
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