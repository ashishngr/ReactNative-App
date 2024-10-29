import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileDropdown = ({ options }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade animation
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    // Trigger fade-in/out animation on visibility change
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, // Duration of the fade animation
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const toggleDropdown = () => {
    // Calculate button's position and set dropdown position
    buttonRef.current.measure((fx, fy, width, height, px, py) => {
      setDropdownPosition({ top: py + (height + 4), left: px - 35 });
    });
    setIsVisible((prev) => !prev);
  };

  const handleOptionPress = (onPress) => {
    setIsVisible(false); // Close the modal when an option is pressed
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.dropdownContainer}>
    <TouchableOpacity
      ref={buttonRef}
      style={styles.profileButton}
      onPress={toggleDropdown}
    >
      <Ionicons name="person-circle-outline" size={24} color="white" />
      <Text style={styles.profileText}>Profile</Text>
      <Ionicons
        name={isVisible ? "chevron-up" : "chevron-down"}
        size={20}
        color="white"
        style={{ marginLeft: 5 }}
      />
    </TouchableOpacity>
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.modalContainer,
          {
            opacity: fadeAnim,
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          },
        ]}
      >
        {options.map((option, index) => (
          <View key={index}>
            <Pressable
              style={styles.dropdownItem}
              onPress={() => handleOptionPress(option.onPress)}
            >
              <Ionicons
                name={option.icon}
                size={18}
                color="#333333"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.dropdownText}>{option.label}</Text>
            </Pressable>
            {index < options.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        ))}
      </Animated.View>
    </Modal>
  </View>
  );
};


const styles = StyleSheet.create({
  dropdownContainer: {
    position: "relative",
    alignItems: "center",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#333333",
    borderRadius: 20,
    gap: 4
  },
  modalContainer: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 8,
    width: 160,
    zIndex: 10,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    color: "#333333",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  profileText : {
    color : "#ffffff"
  }
});

export default ProfileDropdown;
