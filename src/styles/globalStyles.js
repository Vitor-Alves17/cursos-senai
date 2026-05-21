import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    headerTitle: {
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#FF6B00',
        textAlign: 'center',
        fontSize: 24,
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#FFF',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    chipRow: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 8,
        flexWrap: 'wrap',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 24,
        margin: 20,
        borderRadius: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        fontSize: 22,
    },
    modalSubtitle: {
        color: '#666',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 8,
        fontSize: 16,
    },
    infoRow: {
        gap: 12,
        marginBottom: 32,
    },
    bold: {
        fontWeight: 'bold',
        color: '#000',
    },
    buttonGroup: {
        marginTop: 10,
        gap: 12,
    },
    button: {
        borderRadius: 8,
        marginVertical: 4,
    },
    aboutContainer: {
        padding: 20,
    },
    schoolLogo: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    schoolTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FF6B00',
        marginBottom: 10,
    },
    schoolSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    contactInfo: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    contactText: {
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        backgroundColor: '#FFF',
        marginVertical: 8,
    },
});