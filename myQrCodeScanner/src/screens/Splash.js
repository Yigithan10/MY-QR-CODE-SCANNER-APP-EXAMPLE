import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native';

const Splash = () => {

    const navigation = useNavigation();


    const myAnimation = () => {
        return (
            <Lottie
                source={require('../../Scanner.json')}
                autoPlay
                loop={false}
                speed={1}
                onAnimationFinish={() => {
                    navigation.navigate("MyCamera");
                }}
            />
        );
    };

    return (
        <View style={styles.background}>
            {myAnimation()}
        </View>
    )
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },
})



export default Splash;