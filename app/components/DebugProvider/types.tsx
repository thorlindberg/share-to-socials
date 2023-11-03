export interface ContextInterface {
  state: DebugState;
  setState: (value: DebugState) => void;
}

export interface DebugContextInterface {
  children: React.ReactNode;
  debug?: boolean;
}

export type DebugState = {
  debugStates: {[key: string]: any};
};

export interface DebugProviderProps {
  children: React.ReactNode;
  debug?: boolean;
}
