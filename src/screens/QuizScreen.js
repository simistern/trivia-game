/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { View,StyleSheet, Text, ImageBackground } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';
import { Button } from 'react-native-paper';
import runTiming from '../util/animations';
import Animated from 'react-native-reanimated';
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const {
  Clock,
} = Animated;


const mapStateToProps = state => {   
    return state;
};

function mapDispatchToProps(dispatch) {
    return {
      dispatch,
      ...bindActionCreators(Actions, dispatch)
    }
}

const QuizScreen = (props) => {
    let [currentQuestion, changeCurrentQuestion] = useState(0);    
    clock = new Clock();
    fadeOpacity = runTiming(this.clock, 0, 1);
    const answerQuestion = (answer) => {
        let fullAnswer = { currentQuestion, answer}
        props.saveAnswer(fullAnswer);
        (currentQuestion === 9) ?
          props.navigation.navigate('Result')
        : changeCurrentQuestion(++currentQuestion) 
    }
    if(props.questions.length < 1 || props.currentQuestion < 0){
      return <View><Text style={{marginTop: 120, fontSize: 25}}>No Questions</Text></View>
    }
    return (
      <ImageBackground source={require('../../assets/sunbg.png')} style={{width: '100%', height: '100%'}}>                    
        <Text style={quizStyle.category}>{props.questions[currentQuestion].category.replace('Entertainment: ', '').replace('Science: ', '')} </Text>
        <Animated.View  style={{opacity: this.fadeOpacity}}>
          <Text style={quizStyle.question}>{entities.decode(props.questions[currentQuestion].question)} </Text>
        </Animated.View>
        <Text style={quizStyle.total}>{currentQuestion + +1} / {props.questions.length}</Text>
        <View style={quizStyle.buttoncontainer}>          
          <Button mode="contained" style={quizStyle.buttons} onPress={() => answerQuestion('True')}><Text style={{fontWeight: '700'}}>True</Text></Button>
          <Button mode="contained" style={quizStyle.buttons} onPress={() => answerQuestion('False')}><Text style={{fontWeight: '700'}}>False</Text></Button>
        </View>
      </ImageBackground>
    )    
}

const quizStyle = StyleSheet.create({
  category: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    marginTop: 84, marginLeft: 'auto', marginRight: 'auto'
  },
  total: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    marginRight: 'auto', 
    marginLeft: 'auto',   
    textAlign: 'center',
    position: 'absolute',
    color: '#8652ff',
    top: 420,
    left: 0,    
    right: 0
  },
  buttons: {
    width: '40%',
    margin: 20
  },
  buttoncontainer: {
    position: 'absolute',
    top: 600,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  question: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    width: '80%',
    fontWeight: '700',
    marginTop: 30, marginLeft: 'auto', marginRight: 'auto'
  },
  activeTitle: {
    color: 'red',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);
  