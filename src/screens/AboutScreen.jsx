import React, { useState } from 'react';
import { ScrollView, View, Linking, Alert } from 'react-native';
import { Text, Card, TextInput, Button, Divider, Title, Paragraph } from 'react-native-paper';
import { globalStyles } from '../styles/globalStyles';

export default function AboutScreen() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSendMessage = () => {
        if (!formData.name || !formData.email || !formData.message) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        const mailtoLink = `mailto:contato@senai.com.br?subject=Contato de ${formData.name}&body=Nome: ${formData.name}%0AEmail: ${formData.email}%0A%0AMensagem:%0A${formData.message}`;

        Linking.openURL(mailtoLink);

        Alert.alert('Sucesso', 'Seu e-mail será aberto para envio da mensagem');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <ScrollView style={globalStyles.container}>
            <Card style={globalStyles.card}>
                <Card.Content>
                    <Title style={globalStyles.schoolTitle}>SENAI Suíço-Brasileira</Title>
                    <Paragraph style={globalStyles.schoolSubtitle}>
                        Inovação e Excelência em Educação Profissional
                    </Paragraph>

                    <Divider style={{ marginVertical: 15 }} />

                    <Text style={globalStyles.sectionTitle}>📌 Sobre Nós</Text>
                    <Paragraph style={{ marginBottom: 15 }}>
                        O SENAI Suíço-Brasileira é referência em formação profissional,
                        unindo a qualidade da educação brasileira com a inovação e
                        precisão suíça. Oferecemos cursos de tecnologia, design e
                        gestão para formar os profissionais do futuro.
                    </Paragraph>

                    <Text style={globalStyles.sectionTitle}>🎯 Nossa Missão</Text>
                    <Paragraph style={{ marginBottom: 15 }}>
                        Formar profissionais altamente qualificados, preparados para os
                        desafios do mercado de trabalho, com foco em inovação,
                        tecnologia e desenvolvimento sustentável.
                    </Paragraph>

                    <Text style={globalStyles.sectionTitle}>📍 Endereço</Text>
                    <Card style={globalStyles.contactInfo}>
                        <Text style={globalStyles.contactText}>🏢 Rua da Tecnologia, 1000</Text>
                        <Text style={globalStyles.contactText}>🏙️ São Paulo - SP, 01000-000</Text>
                        <Text style={globalStyles.contactText}>📞 (11) 99999-9999</Text>
                        <Text style={globalStyles.contactText}>✉️ contato@senai.com.br</Text>
                    </Card>

                    <Text style={globalStyles.sectionTitle}>📱 Redes Sociais</Text>
                    <Card style={globalStyles.contactInfo}>
                        <Text style={globalStyles.contactText}>📘 @senai.suicobrasileira</Text>
                        <Text style={globalStyles.contactText}>📸 @senai_suico</Text>
                        <Text style={globalStyles.contactText}>💼 linkedin.com/senai-suico-brasileira</Text>
                    </Card>

                    <Text style={globalStyles.sectionTitle}>✉️ Fale Conosco</Text>
                    <TextInput
                        label="Seu Nome"
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                        mode="outlined"
                        style={globalStyles.input}
                    />
                    <TextInput
                        label="Seu E-mail"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        mode="outlined"
                        keyboardType="email-address"
                        style={globalStyles.input}
                    />
                    <TextInput
                        label="Mensagem"
                        value={formData.message}
                        onChangeText={(text) => setFormData({ ...formData, message: text })}
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        style={globalStyles.input}
                    />
                    <Button
                        mode="contained"
                        onPress={handleSendMessage}
                        buttonColor="#FF6B00"
                        style={{ marginTop: 10, marginBottom: 30 }}
                    >
                        Enviar Mensagem
                    </Button>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}