import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Infos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infos</Text>
      <Text style={styles.content}>Cette application pour Smartphone a été créé dans le cadre pédagogique de la formation au bocal Academy. L'objectif est de mettre à disposition de l'utilisateur les fonctions de recherche de site internet archivés sur le site WayBackMachine.
      Elle contient un outil de recherche par nom de site et date.  </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 22,
        fontSize: 18,
        textAlign:'justify',
        lineHeight: 26,
        
    },
    title: {
        fontSize: 30,
        // color: "white",
        // backgroundColor: "#76009d",
        paddingHorizontal: 80,
        paddingVertical: 10, 
        borderRadius: 16,
        margin: 56,
        fontWeight: "bold",
    },

  container: {
    flex: 1,
    backgroundColor: "#ffbb00",
    alignItems: "center",
    justifyContent: "flex-start",
  },

});

// import { SimpleLineIcons } from '@expo/vector-icons';
// <SimpleLineIcons name="home" size={24} color="black" />
// <SimpleLineIcons name="settings" size={24} color="black" />
// <SimpleLineIcons name="user" size={24} color="black" />

{
  /* <NavigationContainer>
<Tab.Navigator>
<Tab.Screen name="Home" component={Home} />
<Tab.Screen name="Settings" component={Settings} />
</Tab.Navigator>
</NavigationContainer> */
}
