export async function tokenCheck() {
    const apiUrl = "http://localhost:8000"
    try {
        const response = await fetch(`${apiUrl}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        if (data.success)
            return true

        return false

    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return false
        }
    }
}