import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme, ActivityIndicator, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import { initDatabase } from './src/services/database';

const Tab = createBottomTabNavigator();

// Tema personalizado com as cores do SENAI
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FF6B00',
        accent: '#003366',
        background: '#f5f5f5',
    },
};

export default function App() {
    const [isDbReady, setIsDbReady] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        initializeApp();
    }, []);

    const initializeApp = async () => {
        try {
            console.log('Inicializando banco de dados...');
            await initDatabase();
            console.log('Banco de dados pronto!');
            setIsDbReady(true);
        } catch (err) {
            console.error('Erro ao inicializar banco:', err);
            setError(err.message);
        }
    };

    if (!isDbReady) {
        return (
            <PaperProvider theme={theme}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#FF6B00" />
                    <View style={{ marginTop: 20 }}>
                        {error ? (
                            <>
                                <Text style={{ color: 'red', textAlign: 'center', marginHorizontal: 20 }}>
                                    Erro ao inicializar: {error}
                                </Text>
                                <Button
                                    mode="contained"
                                    onPress={initializeApp}
                                    style={{ marginTop: 20 }}
                                    buttonColor="#FF6B00"
                                >
                                    Tentar Novamente
                                </Button>
                            </>
                        ) : (
                            <Text>Preparando banco de dados...</Text>
                        )}
                    </View>
                </View>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === 'Cursos') {
                                iconName = focused ? 'school' : 'school-outline';
                            } else if (route.name === 'Sobre') {
                                iconName = focused ? 'information-circle' : 'information-circle-outline';
                            }
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#FF6B00',
                        tabBarInactiveTintColor: 'gray',
                        headerStyle: {
                            backgroundColor: '#FF6B00',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    })}
                >
                    <Tab.Screen name="Cursos" component={HomeScreen} />
                    <Tab.Screen name="Sobre" component={AboutScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}