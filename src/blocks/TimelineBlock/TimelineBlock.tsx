import VerticalElement, {
  P as VerticalElementProps,
} from '@components/VerticalElement';
import React from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export interface P {
  element: VerticalElementProps[];
}

function TimelineBlock({ element }: P): JSX.Element {
  
  return (
    <div className="timeline-container" style={{ overflow: 'hidden' }}>
      <VerticalTimeline lineColor="#e8e8e8">
        {element.map((item, index) => (
          <VerticalElement
            key={index}
            left={index % 2 === 0 ? false : true}
            title={item.title}
            desc={item.desc ?? ''}
            buttonCTA={item.buttonCTA ?? ''}
            buttonLink={item.buttonLink ?? ''}
          />
        ))}
      </VerticalTimeline>
    </div>
  );
}
export default TimelineBlock;
