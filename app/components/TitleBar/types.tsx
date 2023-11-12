export type DetentProps = 'small' | 'medium' | 'large';

export interface TitleBarProps {
  children: React.ReactNode;
  backgroundColor?: String;
  cancellationColor?: String;
  cancellationText?: String;
  cancellationAction?: () => void;
  confirmationColor?: String;
  confirmationText?: String;
  confirmationAction?: () => void;
  titleColor?: String;
  titleText?: String;
  icon?: String;
  detent?: DetentProps;
  scaling?: number;
}
