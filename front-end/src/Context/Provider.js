import { useMemo } from 'react';
import Context from './Context';

function Provider({ children }) {
  const context = useMemo(() => ({}), []);
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
