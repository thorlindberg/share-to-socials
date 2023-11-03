import React from 'react';
import {ContextInterface, DebugContextInterface, DebugState} from './types';

const Context = React.createContext({} as ContextInterface);

const initialState: DebugState = {
  debugStates: {},
};

export const DebugContext = ({
  children,
}: DebugContextInterface): JSX.Element => {
  const [state, setState] = React.useState(initialState);

  return (
    <Context.Provider value={{state, setState}}>{children}</Context.Provider>
  );
};

export const useDebug = () => {
  const {state, setState} = React.useContext(Context);

  const resetDebug = () => {
    setState({
      ...initialState,
    });
  };

  const setDebug = (key: string, value: any) => {
    setState((prevState: DebugState) => ({
      ...prevState,
      debugStates: {
        ...prevState.debugStates,
        [key]: value,
      },
    }));
  };

  const getDebug = () => {
    return state.debugStates || false;
  };

  return {resetDebug, setDebug, getDebug};
};
