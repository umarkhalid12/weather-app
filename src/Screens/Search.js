import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ImageBackground, Alert, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Card, Searchbar, Button } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";


const API_BASE_URL = "http://192.168.10.6:3001/weather";

const Search = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadRecentSearches();
    loadFavorites();
  }, []);

  // Load recent searches from AsyncStorage
  const loadRecentSearches = async () => {
    try {
      const savedSearches = await AsyncStorage.getItem("recentSearches");
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error("Error loading searches:", error);
    }
  };

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  // Toggle favorite cities
  const toggleFavorite = async (item) => {
    setFavorites((prevFavorites) => {
      const isFav = prevFavorites.some((fav) => fav.city === item.city);
      let updatedFavorites;

      if (isFav) {
        updatedFavorites = prevFavorites.filter((fav) => fav.city !== item.city);
      } else {
        updatedFavorites = [...prevFavorites, item];
      }

      // Save to AsyncStorage
      AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  // Search weather data
  const searchWeather = async () => {
    if (!city.trim()) {
      Alert.alert("Error", "Please enter a city name");
      return;
    }
  
    try {
      const url = `${API_BASE_URL}?city=${encodeURIComponent(city)}`;
      console.log("Fetching from:", url);
  
      const response = await axios.get(url);
      console.log("Response Data:", response.data);
  
      if (response.data.length > 0) {
        const weatherData = response.data[0];
        setWeather(weatherData);
  
        // Update recent searches
        const updatedSearches = [city, ...recentSearches.filter((item) => item !== city)].slice(0, 5);
        setRecentSearches(updatedSearches);
  
        await AsyncStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
        await AsyncStorage.setItem("lastWeatherData", JSON.stringify(weatherData)); // Save full weather data ✅
      } else {
        Alert.alert("Not Found", "City not found");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error fetching data", error.message || "Something went wrong.");
    }
  };
  

  return (
    <View style={{backgroundColor:'#39406b', flex:1, alignItems:'center'}}>
      <View style={styles.container}>
        
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search City"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={searchWeather}
            style={styles.searchBar}
          />
        </View>

        {/* Weather Details */}
        {weather && (
          <TouchableOpacity onPress={() => toggleFavorite(weather)}>
          
            <Card style={styles.card}>
              <Card.Title
                title={weather.city}
                subtitle={weather.weather}
                titleStyle={{ fontSize: 22, fontWeight: "bold" }}  
                subtitleStyle={{ fontSize: 18, fontWeight:'700' }}
                left={()=> 
                  <Image source={{uri: weather.picture.thumbnail}} style={{height: 70, width:70, marginLeft: -20}}/>
              }
                right={() =>
                  favorites.some((fav) => fav.city === weather.city) ? (
                    <AntDesign name="star" size={26} color="#ff7675" style={{ marginRight: 12, marginTop: -20 }} />
                  ) : null
                }
              />
              <Card.Content>
                <Text style={{ fontSize: 18 }}>Temperature: {weather.temperature}°C</Text>
                <Text style={{ fontSize: 16 }}>Humidity: {weather.humidity}%</Text>
                <Text style={{ fontSize: 16 }}>Wind Speed: {weather.windSpeed} km/h</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}

        {/* Recent Searches */}
        <Text style={styles.recentSearchesTitle}>Recent Searches:</Text>
        <FlatList style={{flexDirection: "row"}}
          data={recentSearches}
          renderItem={({ item }) => (
            <Card style={{ marginTop: 10, backgroundColor:'white'}}>
            <Text style={[styles.recentSearchItem, {fontSize: 15, fontWeight:'bold'}]} onPress={() => setCity(item)}>
              {item}
            </Text>
            </Card>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      </View>
  );
};

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
  
    width: "90%",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  searchContainer: {
    width: "100%",
  },
  searchBar: {
    marginBottom: 20,
    backgroundColor: 'white'
  },
  recentSearchesTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  recentSearchItem: {
    fontSize: 14,
    color: "#39406b",
    margin: 5,
  
  },
  card: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#f5f5f5",
    elevation: 5,
  },
  weatherImage: {
    width: 150,  // Adjust width
    height: 150, // Adjust height
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 10, // Optional: for rounded corners
  },
});

export default Search;
