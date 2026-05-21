import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ScrollView, TouchableOpacity, Linking, Alert, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, Modal, Portal, Provider, Text, Chip, ActivityIndicator, IconButton } from 'react-native-paper';
import { getCourses } from '../services/database';
import { globalStyles } from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const loadCourses = useCallback(async () => {
        try {
            console.log('Carregando cursos...');
            const data = await getCourses();
            console.log('Cursos carregados:', data.length);
            setCourses(data);
        } catch (error) {
            console.error('Erro ao carregar cursos:', error);
            Alert.alert('Erro', 'Não foi possível carregar os cursos');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadCourses();
    }, [loadCourses]);

    const showModal = (course) => {
        setSelectedCourse(course);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
        setSelectedCourse(null);
    };

    const handleEnrollment = (courseTitle) => {
        Alert.alert(
            "Matrícula",
            `Você iniciou a matrícula em ${courseTitle}. Em breve entraremos em contato.`,
            [
                { text: "OK", onPress: () => console.log("Matrícula iniciada") }
            ]
        );
    };

    const handleContact = () => {
        Linking.openURL('mailto:contato@senai.com.br?subject=Informações sobre Curso SENAI');
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = '⭐'.repeat(fullStars);
        return `${stars} (${rating.toFixed(1)})`;
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} size="large" color="#FF6B00" />
                <Text style={{ marginTop: 20 }}>Carregando cursos...</Text>
            </View>
        );
    }

    if (courses.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <IconButton icon="alert-circle" size={60} iconColor="#FF6B00" />
                <Text style={{ fontSize: 18, textAlign: 'center', marginHorizontal: 20 }}>
                    Nenhum curso encontrado. Verifique a conexão e tente novamente.
                </Text>
                <Button mode="contained" onPress={loadCourses} style={{ marginTop: 20 }} buttonColor="#FF6B00">
                    Recarregar
                </Button>
            </View>
        );
    }

    return (
        <Provider>
            <ScrollView
                style={globalStyles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FF6B00']} />
                }
            >
                <Text style={globalStyles.headerTitle}>📚 Catálogo de Cursos SENAI</Text>

                <FlatList
                    data={courses}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => showModal(item)} activeOpacity={0.7}>
                            <Card style={globalStyles.card}>
                                <Card.Content>
                                    <Title>{item.title}</Title>
                                    <Paragraph>{item.subtitle}</Paragraph>
                                    <View style={globalStyles.chipRow}>
                                        <Chip icon="school" mode="outlined">{item.level}</Chip>
                                        <Chip icon="clock-outline" mode="outlined">{item.duration}</Chip>
                                        <Chip icon="star" mode="outlined">{item.rating} ★</Chip>
                                    </View>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                />

                {/* Modal de Detalhes do Curso */}
                <Portal>
                    <Modal
                        visible={modalVisible}
                        onDismiss={hideModal}
                        contentContainerStyle={globalStyles.modalContainer}
                    >
                        {selectedCourse && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <IconButton
                                    icon="close"
                                    size={24}
                                    onPress={hideModal}
                                    style={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}
                                />

                                <Text style={globalStyles.modalTitle}>{selectedCourse.title}</Text>
                                <Text style={globalStyles.modalSubtitle}>{selectedCourse.subtitle}</Text>

                                <View style={globalStyles.infoRow}>
                                    <Text style={{ fontSize: 16 }}>
                                        <Text style={globalStyles.bold}>🎯 Nível:</Text> {selectedCourse.level}
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        <Text style={globalStyles.bold}>⏱️ Duração:</Text> {selectedCourse.duration}
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        <Text style={globalStyles.bold}>👨‍🏫 Professor(a):</Text> {selectedCourse.professor}
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        <Text style={globalStyles.bold}>📂 Área:</Text> {selectedCourse.area.toUpperCase()}
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        <Text style={globalStyles.bold}>⭐ Classificação:</Text> {renderStars(selectedCourse.rating)}
                                    </Text>
                                </View>

                                <View style={globalStyles.buttonGroup}>
                                    <Button
                                        mode="contained"
                                        onPress={() => handleEnrollment(selectedCourse.title)}
                                        icon="account-plus"
                                        buttonColor="#FF6B00"
                                        style={globalStyles.button}
                                    >
                                        Realizar Matrícula
                                    </Button>
                                    <Button
                                        mode="outlined"
                                        onPress={handleContact}
                                        icon="whatsapp"
                                        textColor="#FF6B00"
                                        style={globalStyles.button}
                                    >
                                        Contato com a Escola
                                    </Button>
                                </View>
                            </ScrollView>
                        )}
                    </Modal>
                </Portal>
            </ScrollView>
        </Provider>
    );
}