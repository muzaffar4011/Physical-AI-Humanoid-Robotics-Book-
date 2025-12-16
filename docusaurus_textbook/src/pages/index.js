import React from 'react';
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="Complete curriculum for mastering robotics, AI systems, and humanoid development."
    >
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Build the Future of<br/>
            <span className={styles.highlight}>Intelligent Robotics</span>
          </h1>
          <p className={styles.subtitle}>
            A comprehensive textbook covering ROS2, AI systems, VLA architectures, 
            digital twins, and humanoid design — everything you need to master physical AI.
          </p>
          <div className={styles.buttons}>
            <Link to="/docs/introduction/intro" className={styles.btnPrimary}>
              Get Started
            </Link>
            <Link to="/docs/ros2-foundations/module-1-ros2" className={styles.btnSecondary}>
              Explore Modules
            </Link>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className={styles.modules}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Learning Path</h2>
          <div className={styles.grid}>
            {modules.map((module, i) => (
              <Link key={i} to={module.link} className={styles.card}>
                <div className={styles.cardNumber}>{i + 1}</div>
                <h3>{module.title}</h3>
                <p>{module.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <h3>Practical & Hands-On</h3>
              <p>Real-world examples, code snippets, and simulations in every module.</p>
            </div>
            <div className={styles.feature}>
              <h3>Industry-Aligned</h3>
              <p>Technologies used by Tesla, Figure AI, and leading robotics companies.</p>
            </div>
            <div className={styles.feature}>
              <h3>Beginner Friendly</h3>
              <p>Start from basics and progress to advanced humanoid systems.</p>
            </div>
            <div className={styles.feature}>
              <h3>AI-Native</h3>
              <p>Built around modern AI workflows including LLMs and VLA systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Start Your Robotics Journey</h2>
          <p>Master the technologies powering the next generation of intelligent robots.</p>
          <Link to="/docs/introduction/intro" className={styles.ctaButton}>
            Begin Learning
          </Link>
        </div>
      </section>
    </Layout>
  );
}

const modules = [
  {
    title: "ROS2 Foundations",
    desc: "Master the nervous system of modern robots with nodes, topics, services, and actions.",
    link: "/docs/ros2-foundations/module-1-ros2"
  },
  {
    title: "Simulation & Digital Twins",
    desc: "Build and test robots safely in Gazebo, Unity, and Isaac Sim environments.",
    link: "/docs/simulation/module-2-simulation"
  },
  {
    title: "Hardware Foundations",
    desc: "Learn motors, actuators, sensors, and embedded systems for real robots.",
    link: "/docs/hardware-basics/module-3-hardware"
  },
  {
    title: "VLA Systems",
    desc: "Master Vision-Language-Action architectures for intelligent robotics.",
    link: "/docs/vla-systems/module-4-vla-foundations"
  },
  {
    title: "Advanced AI & Control",
    desc: "Dive into reinforcement learning, motion planning, and trajectory optimization.",
    link: "/docs/advanced-ai-control/module-5-advanced-ai"
  },
  {
    title: "Humanoid Design",
    desc: "Design complete humanoid robots from mechanical systems to AI movement.",
    link: "/docs/humanoid-design/module-6-humanoid-design"
  }
];
