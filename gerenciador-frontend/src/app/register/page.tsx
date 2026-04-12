import RegisterForm from '../../components/auth/register-form';
import { AuthShell } from '@/components/ui/auth-shell';

export const metadata = {
    title: 'Register',
};

export default function RegisterPage() {
    return (
        <AuthShell
            eyebrow="Cadastro"
            title="Crie sua conta"
            description="Authenticação segura."
            alternateHref="/login"
            alternateLabel="Fazer login"
            alternateText="Já possui uma conta?"
        >
            <RegisterForm />
        </AuthShell>
    );
}
