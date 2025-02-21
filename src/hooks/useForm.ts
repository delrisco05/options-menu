import { useCallback, useState } from "react";

export const useForm = <T extends {}>(initialForm: T) => {
    const [formState, setFormState] = useState<T>(initialForm);

    const identifyInput = useCallback((id: string, inputValue: string) => {
        setFormState(prevState => ({
            ...prevState,
            [id]: inputValue
        }));
    }, []);

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        identifyInput,
        onResetForm,
    }
}
