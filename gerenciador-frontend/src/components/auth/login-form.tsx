"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { loginSchema, LoginSchema } from "@/lib/validators";
import { supabase } from "@/lib/supabase/client";
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { register, handleSubmit, formState } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data: LoginSchema) => {
        setSubmitError(null);

        startTransition(async () => {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                setSubmitError(error.message);
                return;
            }

            const redirectTo = searchParams.get("redirectTo") || "/dashboard";
            // Set a simple auth cookie so middleware can detect authenticated users on the server
            if (typeof document !== "undefined") {
                document.cookie = `auth=1; path=/; max-age=${60 * 60 * 24 * 7}; samesite=strict`;
            }
            router.replace(redirectTo);
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
                            placeholder="Sua senha"
                            autoComplete="current-password"
                            aria-invalid={!!formState.errors.password}
                            {...register("password")}
                        />
                        <FieldError errors={[formState.errors.password]} />
                    </FieldContent>
                </Field>
            </FieldGroup>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Spinner className="mr-1" /> : null}
                Entrar
            </Button>
        </form>
    );
}
