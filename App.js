/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


function App(){
  const isDarkMode = useColorScheme() === 'dark';
  const [isVisible, setIsVisible] = useState(false)


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  return (
    <SafeAreaView style={styles.container}>
     <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {isVisible ? <View style={{height:'100%', justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'}/>
        </View> : null}
      <WebView 
        source={{uri: 'https://gourmetvaerkstedet.dk/'}} 
        style= {{...styles.container, flex:isVisible ? 0 : 1}}
        useWebView2={true}
        onLoad={()=> {setIsVisible(false)}}
        onLoadStart={()=> {setIsVisible(true)}}
        pullToRefreshEnabled={true}/>
     </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container :{
    flex:1
  },
  
});

export default App;
