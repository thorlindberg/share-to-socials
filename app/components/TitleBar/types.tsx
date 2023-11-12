export type DetentProps = 'small' | 'medium' | 'large';

export interface TitleBarProps {
  children: React.ReactNode;
  backgroundColor?: String;
  cancellationNode?: React.ReactNode;
  confirmationNode?: React.ReactNode;
  titleNode?: React.ReactNode;
  detent?: DetentProps;
  scaling?: number;
}
