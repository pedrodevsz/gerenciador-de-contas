import LoginForm from '../../components/auth/login-form';
import { AuthShell } from '@/components/ui/auth-shell';

export const metadata = {
    title: 'Login',
};

export default function LoginPage() {
    return (
        <AuthShell
            eyebrow="Entrar"
            title="Acesse sua conta"
            description="Entre com seu email e senha para continuar."
            alternateHref="/register"
            alternateLabel="Criar conta"
            alternateText="Ainda não tem acesso?"
        >
            <LoginForm />
        </AuthShell>
    );
}
