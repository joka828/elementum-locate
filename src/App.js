import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import arrow from './images/arrow2.png';
import map1 from './images/map1.png';
import map0 from './images/map0.png';

import html2canvas from 'html2canvas';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.drawFloor = (floor = 0, element) => {
      this.canvas = element;
      if (this.canvas) {
        const foo = this.canvas;
        var context = this.canvas.getContext('2d');

        var image2 = new Image();
        image2.onload=function() {
          context.drawImage(image2,0,0, foo.width, foo.height);
        };
        image2.src = floor > 0 ? map1 : map0 ;

      }
    };

    this.setCanvas = element => {
      this.canvasElement = element;
      this.drawFloor(0, element);
    };
    this.setArrow = (x, y) => {
      var context = this.canvas.getContext('2d');
      const foo = this.canvas;
      var image = new Image();
        image.onload= () => {
          context.drawImage(
            image,
            x - document.querySelector('canvas').getBoundingClientRect().x - 50,
            y - document.querySelector('canvas').getBoundingClientRect().y - 25,
            50,
            50);
        };
      image.src = arrow;
    };
    this.onFloorChange = (event) => {
      console.log(event.target.value);
      this.drawFloor(event.target.value, this.canvasElement);
      this.setState({
        floorValue: event.target.value
      });
    }
    this.saveScreenShot = () => {
      this.setState({
        showInstructions: true
      });
      // console.log(this.canvasElement.toDataURL());
      // const foo = document.createElement('img');
      // foo.id = 'bar';
      // foo.src = this.canvasElement.toDataURL();
      // document.body.appendChild(foo);
      // setTimeout(() => {
      //   var r = document.createRange();
      //   r.setStartBefore(foo);
      //   r.setEndAfter(foo);
      //   r.selectNode(foo);
      //   var sel = window.getSelection();
      //   sel.addRange(r);
      //   document.execCommand('copy');
      // }, 500);
      // html2canvas(document.querySelector("#asd")).then(canvas => {
      //   console.log('mig', canvas);
      //   document.body.appendChild(canvas)
      // })
    };
    this.saveScreenShot2 = (id) => {
      const foo = document.createElement('img');
      foo.id = 'bar';
      foo.src = this.canvasElement.toDataURL();
      document.body.appendChild(foo);
      foo.onload= () => {
        var element = document.getElementById('bar');
        var text = document.createElement("textarea");

        document.oncopy = function(e) {
          e.clipboardData.setData("image/jpeg", text.value);
          console.log('e.clipboardData', e.clipboardData);
          console.log(e.clipboardData.getData("image/jpeg"));
        }

        fetch(element.src.replace(/^(http:|https:)/, window.location.protocol))
          .then(function(response) {
            return response.blob()
          })
          .then(function(blob) {
            var reader = new FileReader();
            reader.onload = function() {
              document.body.appendChild(text);
              text.value = reader.result;
              text.select();
              // alert("Press CTRL+C to copy image to clipboard");
              document.execCommand('copy');
            }
            reader.readAsDataURL(blob)
          });
      };
    }
  }
  componentWillUpdate() {

  }
  render() {
    const setArrow = (event) => {
      this.setArrow(event.pageX, event.pageY);
    }
    return (
      <div className="App" id="asd">
        <header className="App-header">
          1 - Where is it?
          <select onChange={this.onFloorChange} value={this.state.floorValue}>
            <option value="0">Fist floor</option>
            <option value="1">Second floor</option>
          </select>
          <br />
          2 - Click on the map!
          <canvas id="daro" ref={this.setCanvas} style={{}} onClick={setArrow} />
          <br />
          <div onClick={this.saveScreenShot}>
            <b style={{cursor: 'pointer'}}>3 - click here!</b>
          </div>
          {this.state.showInstructions ? (
            <ol style={{ fontStyle: 'italic' }}>
              <li>Right click in the image</li>
              <li>Click "Copy Image"</li>
              <li>Paste in Slack</li>
              <li>Have fun!</li>
            </ol>
          ) : null}

        </header>
      </div>
    );
  }
}

export default App;
