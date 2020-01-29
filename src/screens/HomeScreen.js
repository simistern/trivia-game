/**
 * @format
 * @flow
 */

import React from 'react';
import { View,StyleSheet, ImageBackground, Text } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';
import { Button } from 'react-native-paper';

const mapStateToProps = state => {   
    return state;
};

function mapDispatchToProps(dispatch) {
    return {
      dispatch,
      ...bindActionCreators(Actions, dispatch)
    }
  }

const HomeScreen = (props) => {
    const startGame = async () => {
        props.fetchQuestions()
        .then(res => {
            props.setQuestions(res)
            props.navigation.navigate('Quiz')
        })
    }
    return (
      <ImageBackground source={require('../../assets/Landing4.png')} style={{width: '100%', height: '100%'}}>                            
        <View style={homeStyle.container}> 
          <Text style={homeStyle.title}>Welcome to the Trivia Challenge! </Text>
          <Text style={homeStyle.paragraph}>You will be presented with 10 T/F Questions </Text>
          <Text style={homeStyle.subparagraph}>Can you score 100%? </Text>          
          <Button style={homeStyle.startbutton} mode="contained" onPress={() => startGame()}><Text>Begin</Text></Button>
        </View>
      </ImageBackground>
    )
}

const homeStyle = StyleSheet.create({
  container: {
    padding: 40,
    marginTop: '50%',
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  paragraph: {
    marginTop: 275,
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  subparagraph: {
    marginTop: 20,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  startbutton: {
    marginTop: 20,
    
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
  