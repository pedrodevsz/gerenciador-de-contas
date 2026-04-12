"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 px-6">
            <div className="text-center max-w-xl">

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-6"
                >
                    <Image
                        src="/favicon.png"
                        alt="Control F"
                        width={240}
                        height={240}
                        className="drop-shadow-xl"
                    />
                </motion.div>

                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-7xl font-extrabold bg-linear-to-r from-orange-500 to-green-700 text-transparent bg-clip-text"
                >
                    404
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-lg text-muted-foreground"
                >
                    Página não encontrada. Parece que você se perdeu nos seus investimentos.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                >
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg hover:scale-105 transition"
                    >
                        Ir à página inicial
                    </Link>
                </motion.div>

                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="mt-12 flex justify-center"
                >
                    <div className="w-24 h-24 rounded-full bg-linear-to-tr from-orange-400 to-green-700 opacity-20 blur-2xl" />
                </motion.div>
            </div>
        </div>
    );
}
