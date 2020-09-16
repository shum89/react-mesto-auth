
export const reducerForAuth = (state, {field, type, value}, initialFormValueState) => {
    switch (type) {
        case 'DISPATCH':
            const updateValues = {
                ...state.inputValues,
                [field]: value.value,
            }
            return {
                inputValues: updateValues,
            };
        case'RESET':
            return initialFormValueState;
        default:
            break;
    }
};