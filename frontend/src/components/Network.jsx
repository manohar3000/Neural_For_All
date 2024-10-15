// Network.js
import React, { useEffect, useRef, useState } from 'react';
import Layer from './Layer';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

const sidebar = tfvis.visor();

const Network = () => {
  const [layerCount, setLayerCount] = useState(3); // Default to 3 layers
  const [layers, setLayers] = useState([
    { neuronCount: 3, activation: '' },
    { neuronCount: 5, activation: 'relu' },
    { neuronCount: 2, activation: 'sigmoid' },
  ]);

  const [start, setStart] = useState(false);
  const [epochs, setEpochs] = useState(10);
  const [batchSize, setBatchSize] = useState(32);
  const [learningRate, setLearningRate] = useState(0.001);
  const [lossFunction, setLossFunction] = useState('meanSquaredError');
  const [dataset, setDataset] = useState('MNIST');

  const networkRef = useRef();
  const svgRef = useRef();

   // Create and store the model in a ref to avoid re-initialization
   const modelRef = useRef(null);

   const surface = { name: 'Training Progress', tab: 'Training' };
 
   const createModel = () => {
     const newModel = tf.sequential({
       layers: [
         tf.layers.dense({ inputShape: [784], units: 32, activation: 'relu' }),
         tf.layers.dense({ units: 10, activation: 'softmax' }),
       ],
     });
 
     newModel.compile({
       optimizer: 'sgd',
       loss: 'categoricalCrossentropy',
       metrics: ['accuracy'],
     });
 
     modelRef.current = newModel; // Store the model in the ref
   };
 
   useEffect(() => {
     createModel(); // Create the model once when the component mounts
   }, []);
 
   const handleTraining = async () => {
     if (!modelRef.current) {
       console.error('Model not initialized');
       return;
     }
 
     const data = tf.randomNormal([100, 784]);
     const labels = tf.randomUniform([100, 10]);
 
     console.log('Training started...');
     setStart(true);
 
     await modelRef.current.fit(data, labels, {
       epochs,
       batchSize,
       callbacks: tfvis.show.fitCallbacks(surface, ['loss', 'acc']),
     });
 
     console.log('Training completed!');
     setStart(false);
   };
 
   const handleStartButtonClick = (e) => {
    if (!sidebar.isOpen()) {
      sidebar.open();}
     if (!start) {
       e.target.innerText = 'Pause';
       handleTraining();
     } else {
       e.target.innerText = 'Start';
       console.log('Training paused'); // Placeholder for pause logic
     }
     setStart(!start);
   };
 
  const handleVisualization = () => {
    if (!sidebar.isOpen()) {
      sidebar.open();
    } else {
      sidebar.toggle();
    }
  };

  // Update the number of layers
  const handleLayerCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setLayerCount(count);

    const newLayers = [...layers];
    if (count > layers.length) {
      // Add new layers with default values
      for (let i = layers.length; i < count; i++) {
        newLayers.push({ neuronCount: 3, activation: '' });
      }
    } else {
      // Trim the number of layers
      newLayers.length = count;
    }
    setLayers(newLayers);
  };

  // Handle neuron count change for each layer
  const handleNeuronChange = (layerIndex, neuronCount) => {
    const newLayers = [...layers];
    newLayers[layerIndex].neuronCount = neuronCount;
    setLayers(newLayers);
  };

  // Handle activation function change for each non-input layer
  const handleActivationChange = (layerIndex, activation) => {
    const newLayers = [...layers];
    newLayers[layerIndex].activation = activation;
    setLayers(newLayers);
  };

  // Function to draw connections between layers using SVG
  useEffect(() => {
    drawConnections();
    window.addEventListener('resize', drawConnections);
    return () => window.removeEventListener('resize', drawConnections);
  }, [layers]);

  const drawConnections = () => {
    const container = networkRef.current;
    const svg = svgRef.current;
    const layersElements = container.querySelectorAll('.layer');

    // Clear existing lines
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const containerRect = container.getBoundingClientRect();

    for (let i = 0; i < layersElements.length - 1; i++) {
      const currentLayer = layersElements[i].querySelectorAll('.neuron');
      const nextLayer = layersElements[i + 1].querySelectorAll('.neuron');

      currentLayer.forEach((startNeuron) => {
        const startRect = startNeuron.getBoundingClientRect();
        const startX = startRect.right - containerRect.left;
        const startY = startRect.top + startRect.height / 2 - containerRect.top;

        nextLayer.forEach((endNeuron) => {
          const endRect = endNeuron.getBoundingClientRect();
          const endX = endRect.left - containerRect.left;
          const endY = endRect.top + endRect.height / 2 - containerRect.top;

          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', startX);
          line.setAttribute('y1', startY);
          line.setAttribute('x2', endX);
          line.setAttribute('y2', endY);
          line.setAttribute('stroke', 'rgba(0,0,0,0.2)');
          line.setAttribute('stroke-width', '2');
          svg.appendChild(line);
        });
      });
    }
  };

  return (
    <div className="network-container">
      <button onClick={handleStartButtonClick} className='startBtn'>Start</button>
      <div className="controls">
        
        <label>Epochs:</label>
        <input type="number" value={epochs} className='hyperparam' onChange={(e) => setEpochs(parseInt(e.target.value))} min="1" />

        <label>Batch Size:</label>
        <input type="number" value={batchSize} className='hyperparam' onChange={(e) => setBatchSize(parseInt(e.target.value))} min="1" />

        <label>Learning Rate:</label>
        <input type="number" value={learningRate} className='hyperparam' step="0.0001" onChange={(e) => setLearningRate(parseFloat(e.target.value))} />

        <label>Loss Function:</label>
        <select value={lossFunction} onChange={(e) => setLossFunction(e.target.value)}>
          <option value="meanSquaredError">Mean Squared Error</option>
          <option value="categoricalCrossentropy">Categorical Crossentropy</option>
        </select>

        <label>Dataset:</label>
        <select value={dataset} onChange={(e) => setDataset(e.target.value)}>
          <option value="MNIST">MNIST</option>
        </select>

        </div>
        <hr />
        <label>
          Number of Layers:
          <input className='hyperparam' type="number" value={layerCount} onChange={handleLayerCountChange} min="1" />
        </label>
      

      <div className="network" ref={networkRef}>
        
        <svg className="connections-svg" ref={svgRef}></svg>

        {layers.map((layer, index) => (
          <Layer
            key={index}
            index={index}
            neuronCount={layer.neuronCount}
            handleNeuronChange={handleNeuronChange}
            handleActivationChange={handleActivationChange}
          />
        ))}
      </div>
        <button className='visualBtn' onClick={handleVisualization}>Visualize</button>
    </div>
  );
};

export default Network;