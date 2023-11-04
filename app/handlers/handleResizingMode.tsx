const handleResizingMode = (currentMode: string) => {
  return currentMode === 'contain' ? 'cover' : 'contain';
};

export default handleResizingMode;
