import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { auth } from "../firebase"
import LogoutButton from "../component/LogoutButton";


export default function App() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const getCurrentDate = () => new Date().toLocaleString();

  const addOrEditItem = () => {
    if (editingId) {
      setItems(items.map(item =>
        item.id === editingId
          ? { ...item, text, updatedAt: getCurrentDate() }
          : item
      ));
      setEditingId(null);
    } else {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          text,
          completed: false, // new property
          createdAt: getCurrentDate(),
          updatedAt: getCurrentDate(),
        },
      ]);
    }
    setText("");
  };

  const toggleComplete = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };


  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setText(item.text);
    setEditingId(item.id);
  };

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Text style={styles.headerText}>Welcome, {auth.currentUser?.email}</Text>

      <LogoutButton />
      
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter a task..."
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <Button
        title={editingId ? "Update Task" : "Add Task"}
        onPress={addOrEditItem}
        color="#6200EE"
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemTextContainer}>
              <Text
                style={[
                  styles.itemText,
                  item.completed && { textDecorationLine: "line-through", color: "#999" },
                ]}
              >
                {item.text}
              </Text>
              <Text style={styles.timestamp}>Created: {item.createdAt}</Text>
              {item.updatedAt && item.updatedAt !== item.createdAt && (
                <Text style={styles.timestamp}>Updated: {item.updatedAt}</Text>
              )}
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.completeBtn}>
                <Text style={styles.complete}>
                  {item.completed ? "Undo" : "Complete"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editItem(item)} style={styles.editBtn}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteBtn}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />


    </View>

  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
    paddingTop: 60,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginTop:100,
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  actions: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  editBtn: {
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#E0E7FF",
    borderRadius: 6,
  },
  deleteBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#FEE2E2",
    borderRadius: 6,
  },
  edit: {
    color: "#4338CA",
    fontWeight: "600",
  },
  delete: {
    color: "#DC2626",
    fontWeight: "600",
  },
  completeBtn: {
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#D1FAE5",
    borderRadius: 6,
  },
  complete: {
    color: "#065F46",
    fontWeight: "600",
  }
});
