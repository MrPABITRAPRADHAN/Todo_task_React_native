import React from "react";
import { Button } from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { router } from "expo-router";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login");
  };

  
  return <Button title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;
