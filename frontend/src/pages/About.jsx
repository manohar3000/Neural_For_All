import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About NeuralNet Studio</h1>
      
      <p className="about-intro">
        <strong>NeuralNet Studio</strong> is a powerful and interactive tool designed for anyone who wants to dive into the world of deep learning, right from their browser. Whether you’re a seasoned AI enthusiast or just getting started, our platform offers a hands-on way to create, train, and visualize neural networks without the need for extensive hardware or complex setups.
      </p>
      
      <h2 className="about-heading">Why NeuralNet Studio?</h2>
      <p className="about-text">
        In the rapidly evolving field of artificial intelligence, understanding and experimenting with neural networks can be both exciting and challenging. <strong>NeuralNet Studio</strong> bridges the gap between theory and practice by providing an intuitive and engaging environment where you can:
      </p>
      <ul className="about-list">
        <li><strong>Build</strong> complex neural network architectures with just a few clicks.</li>
        <li><strong>Train</strong> your models in real-time using TensorFlow.js, with computations happening directly in your browser.</li>
        <li><strong>Visualize</strong> the learning process through dynamic graphs and live metrics.</li>
        <li><strong>Experiment</strong> with different datasets and network configurations to see how small changes can lead to big differences.</li>
      </ul>

      <h2 className="about-heading">Key Features</h2>
      <ul className="about-list">
        <li><strong>Interactive Model Builder:</strong> Create neural networks layer by layer, adding neurons and customizing activation functions with ease.</li>
        <li><strong>Real-Time Training Visualization:</strong> Watch your model learn and improve with real-time updates on loss, accuracy, and other key metrics.</li>
        <li><strong>No Installation Required:</strong> All computations are performed locally in your browser, so there’s no need for powerful GPUs or complicated setups.</li>
        <li><strong>Flexible and Accessible:</strong> Whether you're using a desktop or a mobile device, NeuralNet Studio is designed to provide a seamless experience.</li>
      </ul>

      <h2 className="about-heading">Our Vision</h2>
      <p className="about-text">
        We believe that understanding artificial intelligence should be accessible to everyone. Our goal is to provide a platform where users can learn, experiment, and innovate with deep learning models, regardless of their technical background. With <strong>NeuralNet Studio</strong>, we aim to inspire the next generation of AI researchers, developers, and enthusiasts by making deep learning more approachable and fun.
      </p>
      
      <h2 className="about-heading">Get Started</h2>
      <p className="about-text">
        Ready to create your first neural network? Head over to our <a href="/" className="about-link">Dashboard</a> and start building! Whether you're exploring the basics or pushing the limits of what's possible, <strong>NeuralNet Studio</strong> is your gateway to the exciting world of deep learning.
      </p>
      
      <p className="about-footer"><strong>Happy Training!</strong></p>
    </div>
  );
};

export default About;
