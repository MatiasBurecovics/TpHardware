import { StyleSheet,  View, Button} from 'react-native';
import React from 'react';

function Home({navigation}){
    return(
        <View style={style.container}>
            <Button 
                title="WeatherComponent"
                onPress={(e)=> {navigation.navigate('WeatherComponent')}}
            />
            <Button 
                title="NroEmergencia"
                onPress={(e)=> {navigation.navigate('NroEmergencia')}}
            />
            <Button 
                title="AboutScan"
                onPress={(e)=> {navigation.navigate('AboutScan')}}
            />
            <Button 
                title="BackgroundImage"
                onPress={(e)=> {navigation.navigate('BackgroundImage')}}
            />
        </View>
    )
}

export default Home;

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white"
    }
})