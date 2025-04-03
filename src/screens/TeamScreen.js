import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph, Divider, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function TeamScreen() {
  const teamMembers = [
    {
      name: "Bianca Vitoria",
      role: "Desenvolvedora",
      education: "Análise e Desenvolvimento de Sistemas - FIAP",
      image: require("../../assets/images/bianca.png"),
      github: "https://github.com/biancavitoria15",
      linkedin: "https://www.linkedin.com/in/bianca-vitoria-a8b038193/",
    },
    {
      name: "Guilherme Camargo",
      role: "Desenvolvedor",
      education: "Análise e Desenvolvimento de Sistemas - FIAP",
      image: require("../../assets/images/guilherme.png"),
      github: "https://github.com/camargoogui",
      linkedin: "https://www.linkedin.com/in/guilherme-paes-camargo-903aa0323/",
    },
    {
      name: "Icaro Albuquerque",
      role: "Desenvolvedor",
      education: "Análise e Desenvolvimento de Sistemas - FIAP",
      image: require("../../assets/images/icaro.png"),
      github: "https://github.com/icaroalb1",
      linkedin: "https://www.linkedin.com/in/%C3%ADcaro-albuquerque-314754209/",
    },
  ];

  const openURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#6B4EFF" />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Title style={styles.headerTitle}>Nossa Equipe</Title>
          <Paragraph style={styles.headerSubtitle}>
            Conheça os desenvolvedores por trás do ADOTA PET
          </Paragraph>
        </View>

        <View style={styles.teamSection}>
          {teamMembers.map((member, index) => (
            <Card key={index} style={styles.memberCard}>
              <Card.Content>
                <View style={styles.memberHeader}>
                  <View style={styles.imageContainer}>
                    <Image source={member.image} style={styles.memberImage} />
                  </View>
                  <View style={styles.memberInfo}>
                    <Title style={styles.memberName}>{member.name}</Title>
                    <Paragraph style={styles.memberRole}>
                      {member.role}
                    </Paragraph>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.educationContainer}>
                  <MaterialCommunityIcons
                    name="school"
                    size={20}
                    color="#6B4EFF"
                  />
                  <Paragraph style={styles.educationText}>
                    {member.education}
                  </Paragraph>
                </View>
                <View style={styles.socialButtonsContainer}>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => openURL(member.github)}
                  >
                    <MaterialCommunityIcons
                      name="github"
                      size={24}
                      color="#333"
                    />
                    <Paragraph style={styles.socialButtonText}>
                      GitHub
                    </Paragraph>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => openURL(member.linkedin)}
                  >
                    <MaterialCommunityIcons
                      name="linkedin"
                      size={24}
                      color="#0077B5"
                    />
                    <Paragraph style={styles.socialButtonText}>
                      LinkedIn
                    </Paragraph>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        <View style={styles.footer}>
          <Paragraph style={styles.footerText}>
            Desenvolvido com ❤️ pelos alunos da FIAP
          </Paragraph>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6B4EFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  teamSection: {
    padding: 20,
  },
  memberCard: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
  },
  memberHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#6B4EFF",
  },
  memberImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 20,
    color: "#333",
  },
  memberRole: {
    fontSize: 14,
    color: "#6B4EFF",
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 10,
  },
  educationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  educationText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 8,
    width: "45%",
    justifyContent: "center",
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
});
