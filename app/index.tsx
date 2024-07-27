import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import axios from "axios";

const app = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [response, setResponse] = useState([]);

  const handleLogin = () => {
    console.log(`Logging in`);

    axios
      .post("http://localhost:4001/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setToken(response.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUsers = async () => {
    console.log(`Fetching users`);

    try {
      const response = await axios.get("http://localhost:4000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCafes = async () => {
    console.log(`Fetching cafes`);

    try {
      const response = await axios.get("http://localhost:4000/cafe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    console.log(`Fetching personal reviews`);

    try {
      const response = await axios.get(
        `http://localhost:4000/review/clz47e7ja00009rgc38zytlp9`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Email</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <Text>Password</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Button title="Login" onPress={handleLogin} />

      <Button title="Fetch Users" onPress={fetchUsers} />
      <Button title="Fetch Cafes" onPress={fetchCafes} />
      <Button title="Fetch Personal Reviews" onPress={fetchReviews} />
      <Text>{JSON.stringify(response)}</Text>
    </View>
  );
};

export default app;
