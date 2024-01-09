'use client'

import { createContext, useState } from "react";

export const FormDataContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState(null)

    return (
        <FormDataContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormDataContext.Provider>
    )
}