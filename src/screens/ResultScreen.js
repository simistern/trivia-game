/**
 * @format
 * @flow
 */

import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { Container, Answers, AnswerRow, PlayAgainRow } from '../styles/Components';

const correctIcon = <Icon style={{marginLeft: -5}} name="check" size={30} color='#42f557' />;
const incorrectIcon = <Icon style={{marginRight: 0}} name="times" size={30} color='#ff5254' />;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const mapStateToProps = state => {
    return state;
};

function mapDispatchToProps(dispatch) {
    return {
      dispatch,
      ...bindActionCreators(Actions, dispatch)
    }
}

const ResultScreen = (props) => {
    let total = 0;
    props.answeredQuestions.map((element, i) => {
        props.questions[i].correct_answer === element.answer ? ++total : 0
    });
    let percent = total / props.questions.length;

    const newGame = () => {
      props.resetGame();
      props.navigation.navigate('Home')
    }

    return (
      <ImageBackground source={require('../../assets/moonbg.png')} style={{width: '100%', height: '100%'}}>
        <Text style={resultStyle.header}> Congrats! Your results: </Text>
        <PlayAgainRow>
            <Text style={resultStyle.percent}>{percent * 100}%</Text>
            <Button style={resultStyle.playAgainButton} theme={{ colors: {primary: '#ff9900', text: '#FFFFFF'} }}  onPress={()=> newGame()} mode="contained">New Game</Button>
        </PlayAgainRow>
        <ScrollView>
        <Container>
          {props.answeredQuestions.map((element, index) => {
              return <AnswerRow>
                {props.questions[index].correct_answer === element.answer ? correctIcon : incorrectIcon  }
                <Answers>
                  {index + +1}: {props.questions[index].correct_answer} - {entities.decode(props.questions[index].question)}
                </Answers>
              </AnswerRow>
          })}
        </Container>
        </ScrollView>
      </ImageBackground>
    )    
}

const resultStyle = StyleSheet.create({
  header: {
    fontSize: 30,
    color: 'white',
    marginTop: 110,
    textAlign: 'center'
  },
  playAgainButton: {
    paddingTop: 10, 
    marginLeft: 30,
  },
  percent: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  words: {
    fontSize: 1,
    marginTop: 14, marginLeft: 'auto', marginRight: 'auto'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);
  