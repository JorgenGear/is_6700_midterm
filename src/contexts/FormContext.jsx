import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
    const [values, setValues] = useState({});

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <FormContext.Provider value={{ values, handleChange }}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    return useContext(FormContext);
}