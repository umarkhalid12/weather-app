import React, { useEffect, useState, createContext } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const TemperatureContext = createContext();

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true); 

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    try {
      const data = await AsyncStorage.getItem("lastWeatherData");
      if (data) {
        setWeatherData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading weather data:", error);
    }
  };

  const convertTemperature = (temp) => {
    return isCelsius ? temp : (temp * 9 / 5) + 32;
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require("../Assets/back.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {weatherData ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>{weatherData.city}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <View style={{ alignItems: "center", paddingLeft: 70 }}>
                  <Text style={styles.textt}>
                    {convertTemperature(weatherData.temperature).toFixed(1)}°
                  </Text>
                </View>
                <Switch
                  value={isCelsius}
                  onValueChange={() => setIsCelsius(!isCelsius)}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isCelsius ? "#f5dd4b" : "#f4f3f4"}
                  style={{ marginLeft: 20 }}
                />
              </View>
              <Text style={styles.textweather}>{weatherData.weather}</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text style={styles.text}>H: {weatherData.humidity}%</Text>
                <Text style={styles.text}>S: {weatherData.windSpeed} km/h</Text>
              </View>
              <View style={{ alignItems: 'flex-end', paddingTop: 121 }}>
                <Image style={styles.image} source={require('../Assets/homes.png')} />
              </View>
            </View>
          ) : (
            <Text style={styles.noData}>No recent weather data</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#fff",
  },
  textt: {
    fontSize: 85,
    color: "#fff",
    marginTop: 25,
    fontWeight: 'bold',
  },
  textweather: {
    fontSize: 25,
    marginTop: 10,
    color: "#fff",
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 17,
    color: "#fff",
    marginBottom: 5,
    fontWeight: 'bold',
  },
  noData: {
    fontSize: 18,
    color: "#7f8c8d",
  },
  image: {
    height: 300,
    width: 300,
  },
});

export default Home;