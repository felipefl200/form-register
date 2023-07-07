"use client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from '../ui/use-toast'
import { registerSchema } from '@/app/validators/register'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { setValidation } from './stepValidation'

type Inputs = z.infer<typeof registerSchema>

export function NewForm() {
    const form = useForm<Inputs>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            studentId: "",
            year: "",
            password: "",
            confirmPassword: ""
        },
    })

    // Função de envio do Formulário
    function onSubmit(values: z.infer<typeof registerSchema>) {
        toast({
            title: "Esses são os valores enviados:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })
    }

    const variants = {
        initial: (direction: number) => {
            return {
                x: direction > 0 ? 500 : -500,
                opacity: 0,
            }
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: 'tween', stiffness: 600, damping: 50 },
                opacity: { duration: 0.3 },
            },
        },
        exit: (direction: number) => {
            return {
                x: direction > 0 ? -500 : 500,
                opacity: 0,
                transition: {
                    x: { type: 'spring', stiffness: 600, damping: 50 },
                    opacity: { duration: 0.3 },
                },
            }
        },
    }

    const [formStep, setFormStep] = useState(0)
    const [direction, setDirection] = useState(1)
    return (
        <Card className="w-full mx-4 md:mx-0 md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]">
            <CardHeader>
                <CardTitle>Registrar</CardTitle>
                <CardDescription>Crie a sua conta aqui.</CardDescription>
            </CardHeader>
            <CardContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-x-hidden">
                        {/* Nome e email */}
                        <AnimatePresence initial={false} mode="wait" custom={direction}>
                            {formStep === 0 && (
                                <motion.div
                                    key={formStep}
                                    variants={variants}
                                    animate='animate'
                                    initial='initial'
                                    exit='exit'
                                    custom={direction}
                                    className={cn("space-y-3", {
                                    })}>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome completo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Paulo Gomes" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Nome público que será exibido na plataforma.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="paulo@teste.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}

                            {/* Ano e número do estudante */}
                            {formStep === 1 && (
                                <motion.div
                                    key={formStep}
                                    variants={variants}
                                    animate='animate'
                                    initial='initial'
                                    exit='exit'
                                    custom={direction}
                                    className={cn("space-y-3", {
                                    })}>
                                    <FormField
                                        control={form.control}
                                        name="year"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Selecione o ano</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a verified email to display" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            [2021, 2022, 2023, 2024, 2025].map(year => {
                                                                return (
                                                                    <SelectItem key={year} value={year.toString()}>Ano {year}</SelectItem>
                                                                )

                                                            })
                                                        }
                                                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="studentId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Número do estudante</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="123456" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}

                            {/* Senha e confirmação de senha */}
                            {formStep === 2 && (
                                <motion.div
                                    key={formStep}
                                    variants={variants}
                                    animate='animate'
                                    initial='initial'
                                    exit='exit'
                                    custom={direction}
                                    className={cn("space-y-3", {

                                    })}>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Senha</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirmação de senha</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}

                        </AnimatePresence>

                        <div className={cn("flex gap-2 justify-end", {
                            "justify-between": formStep > 0,
                        })}>
                            <Button onClick={() => { setFormStep(formStep - 1), setDirection(0) }} className={cn("", {
                                "hidden": formStep === 0
                            })} type="button" variant="ghost">
                                <ArrowLeft className='w-4 h-4 mr-2' />
                                Voltar
                            </Button>

                            <Button onClick={() => {
                                setValidation(form, formStep, setFormStep)
                                setDirection(1)
                            }}
                                className={cn("", {
                                    "hidden": formStep === 2
                                })} type="button" variant="ghost">
                                Próximo
                                <ArrowRight className='w-4 h-4 ml-2' />
                            </Button>

                            <Button className={cn("", {
                                "hidden": formStep !== 2
                            })} type="submit">Enviar</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
                {/* <Button type="submit">Enviar</Button> */}
            </CardFooter>
        </Card >



    )
}
