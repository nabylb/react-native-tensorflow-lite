/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {TFLiteImageRecognition} from 'react-native-tensorflow-lite';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super()
    this.state = {}

    try {
	// Initialize Tensorflow Lite Image Recognizer
        this.classifier = new TFLiteImageRecognition({
        model: "mymodel.tflite",  // Your tflite model in assets folder.
        labels: "label.txt" // Your label file
      })

    } catch(err) {
      alert(err)
    }
  }

  componentWillMount() {
	this.classifyImage("apple.jpg") // Your image path.
  }
  
  async classifyImage(imagePath) {
	try {
      const results = await this.classifier.recognize({
        image: imagePath, // Your image path.
        inputShape: 224, // the input shape of your model. If none given, it will be default to 224.
      })

      const resultObj = {
	name: "Name: " + results[0].name,  
	confidence: "Confidence: " + results[0].confidence, 
	inference: "Inference: " + results[0].inference + "ms"
      };
      this.setState(resultObj)
		
    } catch(err) {
      alert(err)
    }   
  }
  
  componentWillUnmount() {
    this.classifier.close() // Must close the classifier when destroying or unmounting component to release object.
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.results}>
            {this.state.name}
          </Text>
          <Text style={styles.results}>
            {this.state.confidence}
          </Text>
          <Text style={styles.results}>
            {this.state.inference}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  results: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
