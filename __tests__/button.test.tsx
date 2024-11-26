import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../src/components/Button';

describe('Button', () => {
  it('Renders a button', () => {
    render(
      <Button
        cta="Test Render"
        color="primary"
        clickHandler={() => {
          console.log('Renders test from jest');
        }}
      />
    );
    const btn = screen.getByText('Test Render');

    expect(btn).toBeInTheDocument();
  });

  it('Clicks works properly', () => {
    const handleClick = jest.fn();

    render(
      <Button cta="Test Click" color="primary" clickHandler={handleClick} />
    );
    const btn = screen.getByText('Test Click');

    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // it('Link works properly', () => {
  //   render(<Button cta="Test Link" color="primary" link="/test" />);
  //   const btn = screen.getByText('Test Link');

  //   expect(btn.closest('a')).toHaveAttribute('href', '/test');
  // });
});
