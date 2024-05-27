/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { PERMISSIONS, RESULTS, check, request,  } from 'react-native-permissions';
import WebView from 'react-native-webview';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


function App(){
  const isDarkMode = useColorScheme() === 'dark';
  const [isVisible, setIsVisible] = useState(true)
  const [permission, setPermission] = useState(true)

  useEffect(()=>{
    if(Platform.OS == 'ios'){
      checkPermission()
      AppState.addEventListener('change', checkPermission)
    }else{
      setPermission(true)
    }
    
  }, [])
  

  const checkPermission = ()=>{
    check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
    .then(async (result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          setPermission(false)
          console.log('PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY: This feature is not available (on this device / in this context)');
          break;
        case RESULTS.DENIED:
          setPermission(false)
          request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
          .then( (result) => {
            console.log('result', result)
        })
          console.log('PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY: The permission has not been requested / is denied but requestable');
          break;
        case RESULTS.LIMITED:
          setPermission(true)
          console.log('PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY: The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          setPermission(true)
          console.log('PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY: The permission is granted');
          break;
        case RESULTS.BLOCKED:
          setPermission(false)
          console.log('PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY: The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch((error) => {
      console.log('PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY', error)
    });
  }
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  return (
    <SafeAreaView style={styles.container}>
     <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <>{isVisible ? <View style={{height:'100%', justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'}/>
        </View> : null}
      <WebView 
        source={{uri: 'https://gourmetvaerkstedet.dk/app/'}} 
        style= {{...styles.container, flex:isVisible  ? 0 : 1, marginBottom: permission? 0 : '-40%'}}
        useWebView2={true}
        onLoad={()=> {setIsVisible(false)}}
        thirdPartyCookiesEnabled={false}
        sharedCookiesEnabled={false}
        pullToRefreshEnabled={true}
        /></> 
     </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container :{
    flex:1
  },
  permissionView:{
    justifyContent:'center', 
    alignItems:'center', 
    flex:1, 
    paddingHorizontal:20
  },
  permissionText:{
    textAlign:'center',
  },
  button:{
    backgroundColor:'black',
    paddingHorizontal:30,
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:20
  },
  buttonText:{
    color:'white'
  },
  buttonReload:{
    backgroundColor:'black',
    width:150,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:20
  },
  reload:{
    width:35,
    height:35,
    tintColor:'white'
  }
});

export default App;
