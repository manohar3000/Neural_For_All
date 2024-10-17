// Network.js
import React, { useEffect, useRef, useState } from 'react';
import Layer from './Layer';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

const sidebar = tfvis.visor();
sidebar.close()

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
  const [dataset, setDataset] = useState('Dummy Dataset');

  const networkRef = useRef();
  const svgRef = useRef();

   // Create and store the model in a ref to avoid re-initialization
   const modelRef = useRef(null);

   const surface1 = { name: 'Model Summary', tab: 'Model Inspection'};

   const surface = { name: 'Training Progress', tab: 'Training' };
 
   const createModel = () => {
    try {
      const newModel = tf.sequential();

      // Use default activation if the first layer's activation is empty
      const inputActivation = layers[1].activation || 'relu';

      // Add input layer
      newModel.add(
        tf.layers.dense({
          inputShape: [layers[0].neuronCount],
          units: layers[1].neuronCount,
          activation: inputActivation,
        })
      );

      // Add remaining hidden and output layers
      for (let i = 2; i < layers.length; i++) {
        const layerActivation = layers[i]?.activation || 'relu'; // Fallback to 'relu'
        newModel.add(
          tf.layers.dense({
            units: layers[i].neuronCount,
            activation: layerActivation,
          })
        );
      }

      newModel.compile({
        optimizer: tf.train.sgd(learningRate),
        loss: lossFunction,
        metrics: ['accuracy'],
      });

      for(let i=0; i < layers.length - 1; i++) {
        const surface0 = { name: `Layer Summary${i+1}`, tab: 'Model Inspection'};
        tfvis.show.layer(surface0, newModel.getLayer(undefined, i));
      }

      tfvis.show.modelSummary(surface1, newModel);

      modelRef.current = newModel;
      console.log('Model created successfully!');
    } catch (error) {
      console.error('Error creating model:', error);
    }
  };
 
   const handleTraining = async () => {
     if (!modelRef.current) {
       console.error('Model not initialized');
       return;
     }
 
     const data = tf.randomNormal([100, layers[0].neuronCount]);
     const labels = tf.randomUniform([100, layers[layerCount-1].neuronCount]);
 
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
    if (!sidebar.isOpen()) sidebar.open();
    if (!start) {
      e.target.innerText = 'Pause';
      createModel(); // Create the model when training starts
      handleTraining();
      e.target.innerText = 'Start';
    } else {
      e.target.innerText = 'Start';
      console.log('Training paused');
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
          <option value="Dummy Dataset">Dummy Dataset</option>
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