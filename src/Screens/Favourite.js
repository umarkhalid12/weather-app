import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";


const weatherImages = {
  Sunny: require("../Assets/sun.png"),
  Rainy: require("../Assets/rain.png"),
  Cloudy: require("../Assets/cloud.png"),
};

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Cities</Text>

      {favorites.length > 0 ? (
        <FlatList
          style={{ marginBottom: 70 }}
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardText}>
                  <Text style={styles.city}>{item.city}</Text>
                  <Text style={styles.weather}>{item.weather}</Text>
                  <Text style={styles.details}>Temperature: {item.temperature}°C</Text>
                  <Text style={styles.details}>Humidity: {item.humidity}%</Text>
                  <Text style={styles.details}>Wind Speed: {item.windSpeed} km/h</Text>
                </View>
                <Image
                  source={weatherImages[item.weather] || weatherImages["Sunny"]}
                  style={styles.weatherIcon}
                />
              </View>
            </Card>
          )}
        />
      ) : (
        <Text style={styles.noData}>No favorites added.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#22263a",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
    textAlign: "center",
  },
  card: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#5b6b8c",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginLeft: 15, 
  },
  cardText: {
    flex: 1,
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  weather: {
    fontSize: 16,
    color: "#d4d4d4",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "#e0e0e0",
  },
  noData: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Favourites;
