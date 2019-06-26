import React from 'react';
import { StyleSheet } from 'react-native';

import { GLView } from 'expo-gl';
// import React from 'react';
import Expo2DContext from 'expo-2d-context';
// import { getAssetInfoAsync } from 'expo-media-library';

import myImage from '../assets/images/icon.png'

// Evan Bacon's Expo Graphics snack: 
// https://snack.expo.io/@bacon/expo-graphics-ar-remote-image-example
import AssetUtils from 'expo-asset-utils';

export default class DemoScreen extends React.Component {
    render() {
        return (
          <GLView
            style={{ flex: 1 }}
            onContextCreate={this._onGLContextCreate}
          />
        );
    }
    getAsset = (name) => {
      return new Promise((resolve, reject) => {
        let img = document.createElement("IMG")
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = name
      })
    }
    drawLine = (gl) => {
      const ctx = this.ctx
      ctx.beginPath();
      ctx.moveTo(0,-10);
      ctx.lineTo(180,-10);
      ctx.lineWidth = 1
      ctx.strokeStyle = "gray";
      ctx.stroke();
    }
    _onGLContextCreate = async (gl) => {
        var ctx = new Expo2DContext(gl);
        this.ctx = ctx

        ctx.translate(50,200)
        ctx.scale(4,4)
        ctx.fillStyle = "grey";
        ctx.fillRect(20, 40, 100, 100);
        ctx.fillStyle = "white";
        ctx.fillRect(30, 100, 20, 30);
        ctx.fillRect(60, 100, 20, 30);
        ctx.fillRect(90, 100, 20, 30);

        ctx.beginPath();
        ctx.arc(50,70,18,0,2*Math.PI);
        ctx.arc(90,70,18,0,2*Math.PI);
        ctx.fill();
        ctx.fillStyle = "grey";

        ctx.beginPath();
        ctx.arc(50,70,8,0,2*Math.PI);
        ctx.arc(90,70,8,0,2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.flush();

        ctx.beginPath();
        ctx.moveTo(70,40);
        ctx.lineTo(70,30);
        ctx.arc(70,20,10,0.5*Math.PI,2.5*Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(180,0);
        ctx.stroke();

        this.drawLine(gl)

        // Text
        await ctx.initializeText();
        ctx.fillStyle = "blue";
        ctx.font = "italic 72pt sans-serif";
        ctx.fillText("Hey Galaxy", 10, 900);
        // ctx.flush();

        // TODO: Image Demo

        const img_string = '../assets/images/icon.png'
        // const image = require(img_string)
        // const download = await Asset.fromModule(myImage).downloadAsync()

        // Evan Bacon: https://snack.expo.io/@bacon/expo-graphics-ar-remote-image-example
        const imageUri = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ben_Affleck_by_Gage_Skidmore_3.jpg/440px-Ben_Affleck_by_Gage_Skidmore_3.jpg"
        const uri = await AssetUtils.uriAsync(imageUri)

        // const asset = await this.getAsset('./assets/images/icon.png') // can't find variable document (because it's an HTML test example)
        const asset = {
          height: 10,
          width: 10,
          data: uri
          // data: download,
          // localUri: '../assets/images/icon.png'  // TypeError
          // uri: 'http://i.imgur.com/k73egsW.png' // bad asset
          // localUri: 'http://i.imgur.com/k73egsW.png' // TypeError
        }

        // ctx.drawImage(asset, 20, 20)  // getting closer; unhandled Promise Rejection

        // 2D Context drawImage example works
        // https://github.com/expo/expo-2d-context/blob/master/test/lib/expo/index.js#L454
        var ctx2 = new Expo2DContext(gl, {renderWithOffscreenBuffer: true});
        ctx2.fillStyle = '#0f0'; // green
        ctx2.fillRect(10, 10, 100, 50);
        ctx2.flush()
        ctx.fillStyle = '#f00'; // white (no effect?)
        ctx.drawImage(ctx2, 0, 0);

        ctx.flush(); // render the buffered GL calls
    }
}

DemoScreen.navigationOptions = {
  title: 'Icon Board Demo',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
