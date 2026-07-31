import MenuSidebar from "../components/elements/MenuSidebar";

export default function Config() {
    return (
        <>
            <div className="flex flex-row justify-start">
                <main className="p-6 my-10 mx-30 w-5xl bg-(--color-secondary) rounded-sm">
                    <div>
                        <h1 className="text-xl"></h1>
                        <p className="text-sm"></p>
                    </div>
                </main>
                <MenuSidebar />
            </div>
        </>
    )
}