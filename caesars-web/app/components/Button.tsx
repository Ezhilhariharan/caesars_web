'use client';
import React from 'react';
import './button.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  style?: {};
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large' | 'test';
  /**
   * Button contents
   */
  label: string;
  type?: string;
  /**
   * Optional click handler
   */
  onClick?: (e: any) => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  type,
  onClick,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary';
  return (
    <button
      className={['storybook-button', `storybook-button--${size}`, mode].join(
        ' '
      )}
      {...props}
      onClick={onClick}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
          font-size: 20px;
          font-weight: 400;
        }
      `}</style>
    </button>
  );
};
