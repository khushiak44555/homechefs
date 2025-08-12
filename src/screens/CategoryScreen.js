import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const categories = [
    {
        key: 'burgers',
        name: 'Burgers',
        image: require('../../assets/images/category-burger.jpg'),
    },
    {
        key: 'pizza',
        name: 'Pizza',
        image: require('../../assets/images/category-pizza.jpg'),
    },
    {
        key: 'biryani',
        name: 'Biryani',
        image: require('../../assets/images/category-biryani.jpg'),
    },
    {
        key: 'shawarma',
        name: 'Shawarma',
        image: require('../../assets/images/category-shawarma.jpg'),
    },
    {
        key: 'south-indian',
        name: 'South Indian',
        image: require('../../assets/images/category-south-indian.jpg'),
    },
    {
        key: 'chinese',
        name: 'Chinese',
        image: require('../../assets/images/category-chinese.jpg'),
    },
    {
        key: 'momos',
        name: 'Momos',
        image: require('../../assets/images/category-momos.jpg'),
    },
    {
        key: 'drinks',
        name: 'Drinks',
        image: require('../../assets/images/category-drinks.jpg'),
    },
    {
        key: 'desserts',
        name: 'Desserts',
        image: require('../../assets/images/category-desserts.jpg'),
    },
];

const recommendedCombos = [
    {
        key: 'combo-1',
        name: 'Combo 1',
        rating: '4.8',
        reviews: '1.2k',
        oldPrice: '$7.00',
        price: '$5.00',
        discount: '10% off',
        image: require('../../assets/images/combo-1.jpg'),
    },
    {
        key: 'combo-2',
        name: 'Combo 2',
        rating: '4.8',
        reviews: '1.2k',
        oldPrice: '',
        price: '$8.00',
        discount: '',
        image: require('../../assets/images/combo-2.jpg'),
    },
    {
        key: 'combo-3',
        name: 'Combo 3',
        rating: '4.8',
        reviews: '1.2k',
        oldPrice: '$7.00',
        price: '$5.00',
        discount: '10% off',
        image: require('../../assets/images/combo-3.jpg'),
    },
];

const CategoryScreen = ({ navigation }) => {
    const goBack = () => {
        navigation.goBack();
    };

    const addToFavorites = (item) => {
        // Add to favorites logic
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Category</Text>
                <TouchableOpacity style={styles.menuButton}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Categories Grid */}
                <View style={styles.categoriesContainer}>
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category.key}
                            style={styles.categoryCard}
                            onPress={() => navigation.navigate('BurgerListScreen', { categoryName: category.name })}
                        >
                            <View style={styles.categoryImageContainer}>
                                <Image source={category.image} style={styles.categoryImage} />
                            </View>
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recommended Combos */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recommended Combos</Text>
                    <TouchableOpacity>
                        <Text style={styles.sectionAction}>See All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizontalScroll}
                >
                    {recommendedCombos.map(combo => (
                        <View key={combo.key} style={styles.comboCard}>
                            <Image source={combo.image} style={styles.comboImage} />
                            {combo.discount ? (
                                <View style={styles.discountTag}>
                                    <Text style={styles.discountText}>{combo.discount}</Text>
                                </View>
                            ) : null}
                            <TouchableOpacity
                                style={styles.favoriteBtn}
                                onPress={() => addToFavorites(combo)}
                            >
                                <MaterialCommunityIcons name="heart-outline" size={20} color={colors.primary} />
                            </TouchableOpacity>

                            <View style={styles.comboInfo}>
                                <Text style={styles.comboName}>{combo.name}</Text>
                                <View style={styles.ratingRow}>
                                    <MaterialIcons name="star" size={14} color={colors.primary} />
                                    <Text style={styles.rating}> {combo.rating}</Text>
                                    <Text style={styles.reviews}>({combo.reviews})</Text>
                                </View>
                                <View style={styles.priceRow}>
                                    {combo.oldPrice ? (
                                        <Text style={styles.oldPrice}>{combo.oldPrice}</Text>
                                    ) : null}
                                    <Text style={styles.price}>{combo.price}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
        marginRight: 32, // Balance the back button
    },
    menuButton: {
        padding: 4,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 18,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 25,
    },
    categoryImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#f8f8f8',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    categoryName: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        fontWeight: '600',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 18,
        marginTop: 30,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
    },
    sectionAction: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: 'bold',
    },
    horizontalScroll: {
        paddingLeft: 18,
        marginBottom: 20,
    },
    comboCard: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 18,
        marginRight: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    comboImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    discountTag: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    discountText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    favoriteBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 6,
    },
    comboInfo: {
        padding: 14,
    },
    comboName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 6,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    rating: {
        fontSize: 13,
        color: colors.primary,
        fontWeight: 'bold',
    },
    reviews: {
        fontSize: 12,
        color: '#888',
        marginLeft: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    oldPrice: {
        fontSize: 13,
        color: '#888',
        textDecorationLine: 'line-through',
        marginRight: 8,
    },
    price: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
    },
});

export default CategoryScreen;