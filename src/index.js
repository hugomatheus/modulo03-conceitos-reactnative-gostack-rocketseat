import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((response) => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post("/projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Hugo",
    });
    setProjects([...projects, response.data]);
  }

  return (
    <>
      <StatusBar backgroundColor="#7159c1" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        ></FlatList>
        <TouchableOpacity
          TouchableOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  project: {
    color: "#fff",
    fontSize: 22,
  },
  button: {
    margin: 20,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default App;
