// Layer.js
import React from 'react';
import Neuron from './Neuron';

const Layer = ({ index, neuronCount, handleNeuronChange, handleActivationChange }) => {
  return (
    <div className="layer">
      <label>
        <input className='input_neurons'
          type="number"
          value={neuronCount}
          onChange={(e) => handleNeuronChange(index, parseInt(e.target.value, 10))}
          min="1"
        />
      </label>

      {/* Show activation function input for all layers except the input layer */}
      {index > 0 && (
        <label>
          <select onChange={(e) => handleActivationChange(index, e.target.value)}>
            <option value="relu">ReLU</option>
            <option value="sigmoid">Sigmoid</option>
            <option value="tanh">Tanh</option>
            <option value="linear">Linear</option>
          </select>
        </label>
      )}

      {/* Render neurons */}
      {Array.from({ length: neuronCount }).map((_, neuronIndex) => (
        <Neuron key={neuronIndex} />
      ))}
    </div>
  );
};

export default Layer;