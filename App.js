import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [ingredient, setIngredient] = useState('');
  const [meals, setMeals] = useState([]);

  const getMeals = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(response => response.json())
    .then(data => setMeals(data.meals))
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
          <View>
            <Text style={styles.h1}>{item.strMeal}</Text>
            <Image style={styles.image} source={{ uri: `${item.strMealThumb}` }} />
          </View>
        }
        data={meals}
       />
      <TextInput style={styles.input} placeholder='Write ingredient' onChangeText={ text => setIngredient(text) } 
        value={ingredient} />
      <View style={styles.button}>
        <Button title='Find' onPress={getMeals} />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  h1: {
    fontSize:16,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  input: {
    width: 150,
    borderColor: 'grey',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 15,
  },
  button: {
    width: 50,
    paddingTop: 15,
    paddingBottom: 15,
  }
});
