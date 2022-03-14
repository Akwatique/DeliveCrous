import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, ScrollView, Switch, TouchableOpacity} from 'react-native';
import { IconButton } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

let CHAMPIONS = [
  {
    imageUrl:
      'https://images.ricardocuisine.com/services/recipes/476.jpg',
    name: 'Burger',
    prix: '10€',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isSelected: true,
  },
  {
    imageUrl:
      'https://images.ricardocuisine.com/services/recipes/7553-portrait.jpg',
    name: 'Tacos',
    prix: '9€',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isSelected: true,
  },
  {
    imageUrl:
      'https://images.ricardocuisine.com/services/recipes/9147.jpg',
    name: 'Ramen',
    prix: '6€',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isSelected: true,
  },
  {
    imageUrl:
      'https://images.ricardocuisine.com/services/recipes/472345172531f59e4f3004.jpg',
    name: 'Pizza',
    prix: '8€',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isSelected: false,
  },
];

function HomeScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="cart" onPress={function () {
          setCurrentScreen('cart');
        }} />
      ),
      headerLeft: () => (
        <IconButton icon="arrow-left" onPress={function () {
          setCurrentScreen('menu');
        }} />
      ),
    });
  }, [navigation]);

  let [search, setSearch] = useState(``);
  let [currentScreen, setCurrentScreen] = useState('menu');
  let [currentDish, setCurrentDish] = useState();
  let [champions, setChampions] = useState(CHAMPIONS);

  let selectedChampions = champions.filter(function (champion) {
    return champion.isSelected;
  });

  let filteredChmapions = champions.filter(function (champion) {
    return champion.name
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });

  if (currentScreen == 'cart') {
    return (
      <ScrollView>
        <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', marginTop: 20, marginLeft: 20}}>Panier</Text>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey' }}>Vous avez [{selectedChampions.length}] éléments dans le Panier.</Text>
          </View>
          <View>
            {selectedChampions.length > 0 ? (
              selectedChampions.map(function (champion) {
                return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.cartItems}>{champion.name} / {champion.prix}</Text>
                        </View>;
              })
            ) : (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: 'grey' }}>
                Votre Panier est vide
              </Text>
              </View>
            )}
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginLeft: 20}}>Où veux tu être livrer ?</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20}}>En Salle de TD ?</Text>
          <View style={{ flex: 1 }}>
            <TextInput placeholder="Rue" style={styles.cartInput}/>
            <TextInput placeholder="Ville" style={styles.cartInput}/>
            <TextInput placeholder="Code Postal" style={styles.cartInput}/>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginTop: 50 }}>
            <Button color="#722C2C" title="Passer Commande" onPress={() => navigation.navigate('Final', { name: 'DeliveCrous' }) }/>
          </View>
        </View>
      </ScrollView>
    );
  } else if (currentScreen == 'dish_details') {
    return (
      <View>
        <Card
          imageUrl={currentDish.imageUrl}
          name={currentDish.name}
          prix={currentDish.prix}
          description={currentDish.description}
          isSelected={currentDish.isSelected}
          onSelect={function () {
            let newChampions = champions.map(function (c) {
              if (currentDish.name == c.name) {
                c.isSelected = !c.isSelected;
                return c;
              }
              return c;
            });

            setChampions(newChampions);
          }}
        />
      <View style={{height: '30%', width: '100%' }}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={{
            uri: 'https://images.ricardocuisine.com/services/recipes/476.jpg',
          }}
        />
      </View>
      <Text style={{ fontSize: 18, marginTop: 20, marginLeft: 20, marginRight: 20}}>Allergènes</Text>
      
      <Text style={{ fontSize: 13, marginTop: 10, marginLeft: 20, marginRight: 20}}>- Anhydride sulfureux et sulfites</Text>
      <Text style={{ fontSize: 13, marginTop: 10, marginLeft: 20, marginRight: 20}}>- Céleri</Text>
      <Text style={{ fontSize: 13, marginTop: 10, marginLeft: 20, marginRight: 20}}>- Gluten</Text>
      <Text style={{ fontSize: 13, marginTop: 10, marginLeft: 20, marginRight: 20}}>- Graine de sésame</Text>
      <Text style={{ fontSize: 13, marginTop: 10, marginLeft: 20, marginRight: 20}}>- Lait</Text>
      <Text style={{ fontSize: 13, marginTop: 10, marginLeft: 20, marginRight: 20}}>- Moutarde</Text>
      <Text style={{ fontSize: 13, marginTop: 10, marginLeft: 20, marginRight: 20}}>- Oeufs</Text>

      <Text style={{ fontSize: 18, marginTop: 20, marginLeft: 20, marginRight: 20}}>Détails</Text>
      <Text style={{ fontSize: 13, marginTop: 10, marginLeft: 20, marginRight: 20}}>
        Nos pains burgers* sont produits avec de la farine issue de la filière culture 
        raisonnée contrôlée (CRC). Pour vous, c’est la garantie de céréales 100% 
        françaises cultivées dans le respect de la biodiversité et certifiées par un 
        organisme indépendant.
      </Text>
    </View>
    );
  } 

  return (
    <View style={{ flex: 1}}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', marginTop: 20, marginLeft: 20 }}>La Carte</Text>
      <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {filteredChmapions.map(function (champion) {
          return (
            <Card
              onOpen={function () {
                setCurrentDish(champion);
                setCurrentScreen('dish_details');
              }}
              imageUrl={champion.imageUrl}
              name={champion.name}
              prix={champion.prix}
              description={champion.description}
              isSelected={champion.isSelected}
              onSelect={function () {
                let newChampions = champions.map(function (c) {
                  if (champion.name == c.name) {
                    c.isSelected = !c.isSelected;
                    return c;
                  }
                  return c;
                });
                setChampions(newChampions);
              }}
            />
          );
        })}
      </View>
      </View>
    </View>
  );
}

function Card(props) {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={props.onOpen}>
      <Image
        style={styles.cardImage}
        source={{
          uri: props.imageUrl,
        }}
      />
      <View style={styles.cardDescription}>
        <Text style={[styles.cardText, { fontSize: 15 }]}>
          {props.name}
        </Text>
        <Text style={[styles.cardText, {color: 'red', fontWeight: 'bold', fontSize: 12 }]}>{props.prix}</Text>
        <Text style={styles.cardText}>{props.description}</Text>
      </View>
      </TouchableOpacity>
      <Switch
        style={{ alignSelf: 'center' }}
        value={props.isSelected}
        onValueChange={props.onSelect}
      />
    </View>
  );
}

function FinalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
          style={{height: '100%', width: '100%'}}
          source={require('./assets/FinalDeliveCrous.jpg')}
        />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            title: 'DeliveCrous',
            headerStyle: {
              backgroundColor: '#E0DCB4',
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Final"
          component={FinalScreen}
          options={({ route }) => ({ 
            title: route.params.name,
            headerStyle: {
              backgroundColor: '#E0DCB4',
            },
            headerTintColor: '#000',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  cardsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 8,
  },
  cardContainer: {
    margin: 6,
    width: '46%',
    height: '38%',
    borderRadius: 2,
    borderColor: '#000',
    backgroundColor: '#EEEDEA',
    borderWidth: 0.1,
    marginVertical: 10,
  },
  cardImage: {
    height: '65%',
    width: '100%',
    borderRadius: 2,
  },
  cardDescription: {
    padding: 4,
  },
  cardText: {
    marginTop: 4,
    fontSize: 12,
    color: 'black',
  },
  cartInput: {
    padding: 8,
    borderRadius: 4,
    borderColor: '#722C2C',
    backgroundColor: '#EEEDEA',
    borderWidth: 1,
    margin: 10,
    color: 'black',
  },
  cartItems: {
    flex: 1,
    backgroundColor: '#EEEDEA',
    borderRadius: 4,
    borderWidth: 1,
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
});