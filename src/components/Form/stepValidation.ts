import { UseFormReturn } from 'react-hook-form'

export const setValidation = (form: UseFormReturn<{
    name: string;
    email: string;
    year: string;
    studentId: string;
    password: string;
    confirmPassword: string;
}, any, undefined>, formStep: number, setFormstep: (step: number) => void) => {


    if (formStep === 0) {
        form.trigger(['name', 'email'])
        let nameState = form.getFieldState('name')
        let emailState = form.getFieldState('email')
        if (nameState.invalid || !nameState.isDirty) return form.setFocus("name")
        if (emailState.invalid || !emailState.isDirty) return form.setFocus("email")
        return setFormstep(1)

    }
    if (formStep === 1) {
        form.trigger(['studentId', 'year'])
        let studentState = form.getFieldState('studentId')
        let yearState = form.getFieldState('year')
        if (yearState.invalid || !yearState.isDirty) return form.setFocus("year")
        if (studentState.invalid || !studentState.isDirty) return form.setFocus("studentId")
        return setFormstep(2)
    }
    if (formStep === 2) {
        form.trigger(['password', 'confirmPassword'])
        let passwordState = form.getFieldState('password')
        let confirmPasswordState = form.getFieldState('confirmPassword')
        if (passwordState.invalid || !passwordState.isDirty) return form.setFocus("password")
        if (confirmPasswordState.invalid || !confirmPasswordState.isDirty) return form.setFocus('confirmPassword')
    }
}