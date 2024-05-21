import React, {useState} from 'react';

export const CanvasContext = React.createContext(null);

export const CanvasProvider = ({children}) => {
    const [canvas, setCanvas] = useState(null);
    const [context, setContext] = useState(null);

    return (
        <CanvasContext.Provider value={{canvas, context, setContext, setCanvas}}>
            {children}
        </CanvasContext.Provider>
    )
}