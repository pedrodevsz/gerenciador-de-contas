"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { registerSchema, RegisterSchema } from "@/lib/validators";
import { supabase } from "@/lib/supabase/client";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

export default function RegisterForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const { register, handleSubmit, formState } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: "", email: "", password: "" },
    });

    const onSubmit = async (data: RegisterSchema) => {
        setSubmitError(null);
        setSuccessMessage(null);

        startTransition(async () => {
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.name,
                    },
                },
            });

            if (error) {
                setSubmitError(error.message);
                return;
            }

            const redirectTo = searchParams?.get("redirectTo") || "/dashboard";
            if (typeof document !== "undefined") {
                document.cookie = `auth=1; path=/; max-age=${60 * 60 * 24 * 7}; samesite=strict`;
            }
            router.replace(redirectTo);
            router.prefetch("/login");
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup>
                {submitError ? (
                    <Alert variant="destructive">
                        <AlertCircle />
                        <AlertDescription>{submitError}</AlertDescription>
                    </Alert>
                ) : null}

                <Field>
                    <FieldLabel htmlFor="name">Nome</FieldLabel>
                    <FieldContent>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Seu nome"
                            autoComplete="name"
                            aria-invalid={!!formState.errors.name}
                            {...register("name")}
                        />
                        <FieldError errors={[formState.errors.name]} />
                    </FieldContent>
                </Field>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <FieldContent>
                        <Input
                            id="email"
                            type="email"
                            placeholder="voce@nome.com"
                            autoComplete="email"
                            aria-invalid={!!formState.errors.email}
                            {...register("email")}
                        />
                        <FieldError errors={[formState.errors.email]} />
                    </FieldContent>
                </Field>

                <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <FieldContent>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Crie uma senha segura"
                            autoComplete="new-password"
                            aria-invalid={!!formState.errors.password}
                            {...register("password")}
                        />
                        <FieldDescription>
                            Use no minimo 6 caracteres. O ideal e combinar letras, numeros e simbolos.
                        </FieldDescription>
                        <FieldError errors={[formState.errors.password]} />
                    </FieldContent>
                </Field>
            </FieldGroup>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Spinner className="mr-1" /> : null}
                Criar conta
            </Button>

        </form>
    );
}
