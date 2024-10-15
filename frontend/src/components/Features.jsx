const features = [
  { 
    icon: '📐', 
    title: 'Create Models', 
    description: 'Simple UI to design your neural network architecture.' 
  },
  { 
    icon: '📊', 
    title: 'Train Models', 
    description: 'Interactive tools to monitor training progress in real-time.' 
  },
  { 
    icon: '⚙️', 
    title: 'Fine-Tune Models', 
    description: 'User-friendly sliders and options for hyperparameter tuning.' 
  },
];

function Features() {
  return (
    <section id="features" className="features">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Features;
