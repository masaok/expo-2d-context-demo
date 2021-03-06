import React from 'react';
import { StyleSheet } from 'react-native';

import { GLView } from 'expo-gl';
// import React from 'react';
import Expo2DContext from 'expo-2d-context';

export default class DemoScreen extends React.Component {
    render() {
        return (
          <GLView
            style={{ flex: 1 }}
            onContextCreate={this._onGLContextCreate}
          />
        );
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
    _onGLContextCreate = (gl) => {
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
        ctx.flush(); // render the buffered GL calls
    }
}

DemoScreen.navigationOptions = {
  title: 'Expo 2D Context Demo',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
