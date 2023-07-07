import { z } from 'zod'
export const registerSchema = z.object({
    email: z.string().email({ message: 'Email não é válido' }),
    name: z.string().min(2, { message: "O nome deve conter pelo menos 2 caracteres" }).max(255),
    studentId: z.string().min(2,{ message: "O némero do aluno deve conter pelo menos 2 caracteres"}).max(10, { message: "O número do aluno deve conter no máximo 10 caracteres" }),
    year: z.string().min(2).max(10, { message: "O ano deve conter no máximo 10 caracteres" }),
    password: z.string().min(6, { message: "A senha deve conter pelo menos 6 caracteres" }).max(255),
    confirmPassword: z.string().min(6, { message: "A senha deve conter pelo menos 6 caracteres" }).max(255),
}).refine((data) => data.password === data.confirmPassword, {
    message: "A senhas não são iguais",
    path: ["confirmPassword"]
})