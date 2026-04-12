import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  alternateHref: string;
  alternateLabel: string;
  alternateText?: string;
  children: React.ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  alternateHref,
  alternateLabel,
  alternateText,
  children,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,_color-mix(in_oklab,var(--background)_82%,rgb(24,24,27))_0%,_color-mix(in_oklab,var(--background)_90%,rgb(39,39,42))_34%,_color-mix(in_oklab,var(--background)_96%,white)_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(249,115,22,0.18),transparent_24%),radial-gradient(circle_at_32%_28%,rgba(245,158,11,0.12),transparent_26%),radial-gradient(circle_at_78%_16%,rgba(20,184,166,0.1),transparent_24%),radial-gradient(circle_at_50%_-8%,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(15,23,42,0.62)_0%,rgba(24,24,27,0.36)_42%,rgba(24,24,27,0.12)_72%,transparent_100%)]" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-orange-500/12 blur-3xl" />
      <div className="absolute left-1/3 top-24 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">
              {eyebrow}
            </span>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Tenha controle total das suas finanças, de forma simples e sem esforço.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Organize seus gastos, acompanhe sua evolução e tome decisões melhores no dia a dia com um fluxo leve, intuitivo e pensado pra você não perder tempo.
            </p>
          </section>

          <section className="flex items-center justify-center">
            <Card className="w-full max-w-md border-white/60 bg-background/90 shadow-xl backdrop-blur">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {children}
                <p className="text-sm text-muted-foreground">
                  {alternateText}{" "}
                  <Link
                    href={alternateHref}
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    {alternateLabel}
                  </Link>
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
