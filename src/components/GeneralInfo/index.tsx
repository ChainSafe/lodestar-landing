import React, { Fragment, useEffect } from 'react';
import { Button } from '../Button';
import './index.scss';
import { tools } from '../../tools';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  sentenceVariant,
  letterVariant,
  splitText,
  staggerSlideVariant,
} from '../../styles/animations';

export const GeneralInfo: React.FC = () => {
  const controls = useAnimation();

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const splitSentence = splitText(`Lodestar is a consensus beacon node and validator client for the Ethereum blockchain. We also develop tools to enable Ethereum protocol development for the JavaScript ecosystem.`);

  return (
    <Fragment>
      <div ref={ref} className="general">
        <div className="general--about">
          <div className="text-wrapper">
            <motion.h1
              className="about-text"
              initial="hidden"
              viewport={{ once: true }}
              animate={controls}
              variants={sentenceVariant}
            >
              {splitSentence.map((char, index) => (
                <motion.span key={index} variants={letterVariant}>
                  {char}{' '}
                </motion.span>
              ))}
            </motion.h1>
            <a
              href="https://ethereum.org/en/run-a-node/"
              target="__blank"
              rel="noopener noreferrer"
            >
              <Button dark>More about nodes</Button>
            </a>
          </div>
          <div className="cli"></div>
        </div>
        <div className="general--setup">
          <div className="general--setup--left">
            <h1 className="title">
              Community-run technology that rewards participation.
            </h1>
            <div className="text-wrapper">
              <h2>
                Running a validator rewards you for keeping the network secure.
                Validating with minority clients like Lodestar keeps us safer.
              </h2>
              <a
                href="https://hackmd.io/@philknows/rk5cDvKmK"
                target="__blank"
                rel="noopener noreferrer"
              >
                <Button primary>Comprehensive Setup Guide</Button>
              </a>
            </div>
          </div>
          <img className="window" src="/window2.png" alt="" />
        </div>
        <motion.div className="general--tools">
          <h1 className="title">Supporting the Ethereum developer ecosystem</h1>
          <motion.div
            className="tools-wrapper"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
          >
            {tools.map(({ url, name }, i) => (
              <motion.div
                variants={staggerSlideVariant}
                className="tool"
                key={name + i}
              >
                <a href={url} target="__blank" rel="noopener noreferrer">
                  <img src="/thumb.png" alt="" />
                </a>
                <a href={url} target="__blank" rel="noopener noreferrer">
                  {name}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Fragment>
  );
};
