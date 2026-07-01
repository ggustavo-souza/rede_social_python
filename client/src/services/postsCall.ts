const apiUrl = "http://localhost:8000"

export async function getAllPosts() {
    try {
        const response = await fetch(`${apiUrl}/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            return false
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return false
        }
    }
}

/* async function createPost(formData: FormData) {
    TODO: Fazer a requisição POST enviando os dados em FormData 
} */