import React, { Component } from 'react';
import { treeData } from './mockData';
// import { Tree, treeUtil } from 'react-d3-tree';
import { Tree } from '../react-d3-tree/lib/react-d3-tree';
import './App.css';
// import reactTree from './directory-trees/react-tree'
// import scTree from './directory-trees/sc-tree'

const shapes = {
  circle: {
    shape: 'circle',
    shapeProps: {
      r: 10
    }
  },
  ellipse: {
    shape: 'ellipse',
    shapeProps: {
      rx: 10,
      ry: 20
    }
  },
  rect: {
    shape: 'rect',
    shapeProps: {
      width: 140,
      height: 20,
      y: -10,
      x: -10
    }
  },
  none: {
    shape: 'none'
  }
};

class App extends Component {
  constructor() {
    super();

    this.addedNodesCount = 0;

    this.state = {
      data: treeData,
      nodeSvgShape: {
        shape: 'circle',
        shapeProps: {
          r: 10
        }
      },
      circleRadius: undefined,
      orientation: 'horizontal',
      translateX: 100,
      translateY: 300,
      collapsible: true,
      initialDepth: 0,
      depthFactor: 200,
      zoomable: true,
      zoom: 1,
      scaleExtent: { min: 0.1, max: 1 },
      separation: { siblings: 1, nonSiblings: -1 },
      nodeSize: { x: 140, y: 140 },
      transitionDuration: 500,
      styles: {
        nodes: {
          node: {
            circle: {
              fill: '#c6efff',
              stroke: '#59d1ff'
            }
          },
          leafNode: {
            circle: {
              fill: '#ffffff',
              stroke: '#59d1ff'
            }
          }
        }
      }
    };

    this.setTreeData = this.setTreeData.bind(this);
    this.setOrientation = this.setOrientation.bind(this);
    this.setPathFunc = this.setPathFunc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFloatChange = this.handleFloatChange.bind(this);
    this.handleShapeChange = this.handleShapeChange.bind(this);
    this.toggleCollapsible = this.toggleCollapsible.bind(this);
    this.toggleZoomable = this.toggleZoomable.bind(this);
    this.setScaleExtent = this.setScaleExtent.bind(this);
    this.setSeparation = this.setSeparation.bind(this);
    this.setNodeSize = this.setNodeSize.bind(this);
  }

  setTreeData(data) {
    this.setState({ data });
  }

  setOrientation(orientation) {
    this.setState({ orientation });
  }

  setPathFunc(pathFunc) {
    this.setState({ pathFunc });
  }

  handleChange(evt) {
    const target = evt.target;
    const value = parseInt(target.value, 10);
    if (!isNaN(value)) {
      this.setState({
        [target.name]: value
      });
    }
  }

  handleFloatChange(evt) {
    const target = evt.target;
    const value = parseFloat(target.value);
    if (!isNaN(value)) {
      this.setState({
        [target.name]: value
      });
    }
  }

  handleShapeChange(evt) {
    const targetShape = evt.target.value;
    if (targetShape === 'rect') {
      this.setState({
        nodeSvgShape: shapes[targetShape],
        textLayout: {
          textAnchor: 'start',
          x: 0,
          y: 0
        }
      });
    } else {
      this.setState({ nodeSvgShape: shapes[targetShape] });
    }
  }

  toggleCollapsible() {
    this.setState(prevState => ({ collapsible: !prevState.collapsible }));
  }

  toggleZoomable() {
    this.setState(prevState => ({ zoomable: !prevState.zoomable }));
  }

  setScaleExtent(scaleExtent) {
    this.setState({ scaleExtent });
  }

  setSeparation(separation) {
    if (!isNaN(separation.siblings) && !isNaN(separation.nonSiblings)) {
      this.setState({ separation });
    }
  }

  setNodeSize(nodeSize) {
    if (!isNaN(nodeSize.x) && !isNaN(nodeSize.y)) {
      this.setState({ nodeSize });
    }
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translateX: dimensions.width / 3,
      translateY: dimensions.height / 2
    });
  }

  render() {
    return (
      <div className="App">
        <div className="demo-container">
          <div className="column-right">
            <p className="title">TREE DIAGRAM AI</p>
            <div ref={tc => (this.treeContainer = tc)} className="tree-container">
              <Tree
                data={this.state.data}
                nodeSvgShape={this.state.nodeSvgShape}
                circleRadius={this.state.circleRadius}
                onClick={this.state.onClick}
                orientation={this.state.orientation}
                translate={{ x: this.state.translateX, y: this.state.translateY }}
                pathFunc={this.state.pathFunc}
                collapsible={this.state.collapsible}
                initialDepth={this.state.initialDepth}
                zoomable={this.state.zoomable}
                zoom={this.state.zoom}
                scaleExtent={this.state.scaleExtent}
                nodeSize={this.state.nodeSize}
                separation={this.state.separation}
                transitionDuration={this.state.transitionDuration}
                depthFactor={this.state.depthFactor}
                textLayout={this.state.textLayout}
                styles={this.state.styles}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
