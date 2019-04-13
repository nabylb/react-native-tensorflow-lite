/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TFLiteImageRecognition} from 'react-native-tensorflow-lite';
import { RNCamera } from 'react-native-camera';

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super()
    this.state = {}

    try {
	    // Initialize Tensorflow Lite Image Recognizer
      this.classifier = new TFLiteImageRecognition({
        // model: "mobilenet_v1_1.0_224_quant.tflite",  // Your tflite model in assets folder.
        // labels: "labels_mobilenet_quant_v1_224.txt", // Your label file
        model: "detect.tflite",  // Your tflite model in assets folder.
        labels: "labelmap.txt", // Your label file
        isQuantized: false
      })

    } catch(err) {
      alert(err)
    }
  }

  componentWillMount() {
	  this.classifyImage("strawberries.jpg") // Your image path.
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

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
      
    );
  }
}

// <View style={styles.container}>
//         <View>
//           <Text style={styles.results}>
//             {this.state.name}
//           </Text>
//           <Text style={styles.results}>
//             {this.state.confidence}
//           </Text>
//           <Text style={styles.results}>
//             {this.state.inference}
//           </Text>
//         </View>
//       </View>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  // results: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
