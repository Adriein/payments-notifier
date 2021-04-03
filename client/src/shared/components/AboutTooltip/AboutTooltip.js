import React from 'react';

import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';

import feedbackImage from '../../../img/feedback.png';
import { FeedbackDropdown, FeedbackImageCont, FeedbackImage, FeedbackParagraph } from './Styles';

const AboutTooltip = tooltipProps => (
  <Tooltip
    width={300}
    {...tooltipProps}
    renderContent={() => (
      <FeedbackDropdown>
        <FeedbackImageCont>
          <FeedbackImage src={feedbackImage} alt="Give feedback" />
        </FeedbackImageCont>
        <FeedbackParagraph>
          {'Para recibir ayuda o reportar algun mal funcionamiento de la aplicación puedes contactarnos en '}
          <a href="mailto:adria.claret@gmail.com">
            <strong>adria.claret@gmail.com</strong>
          </a>
        </FeedbackParagraph>

        <a href="https://getivor.com/" target="_blank" rel="noreferrer noopener">
          <Button variant="primary">Visit Website</Button>
        </a>
      </FeedbackDropdown>
    )}
  />
);

export default AboutTooltip;