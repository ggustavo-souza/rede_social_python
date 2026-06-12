import LoginRegisterForm from "../components/ui/LoginRegisterForm"

export default function LoginPage() {
    return (
        <>
            <main className="flex flex-row border-3 min-h-screen">
                <LoginRegisterForm type="Login" />
                <aside className="bg-[var(--color-tertiary)] flex flex-col min-h-screen p-10">
                    <header className="text-[var(--color-primary)] font-semibold text-3xl text-center my-5">
                        <h1>Ainda não possui conta?</h1>
                    </header>
                    <main>

                    </main>
                </aside>
            </main>
        </>
    )
}