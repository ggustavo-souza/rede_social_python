const apiUrl = "http://localhost:8000"

export async function getAllPosts(offset: number, limit: number) {
    try {
        const response = await fetch(`${apiUrl}/posts?offset=${offset}&limit=${limit}`, {
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

export async function getUserPosts(usuario_id: number, limit: number, offset: number) {
    try {
        const response = await fetch(`${apiUrl}/posts?usuario_id=${usuario_id}&offset=${offset}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const data = await response.json()
            return data
        }

        return false
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return null
        }
    }
}

export async function editPost(postId: number, data: { titulo?: string; conteudo?: string }) {
    try {
        const response = await fetch(`${apiUrl}/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()
        if(responseData.success)
            return responseData.post
        else
            return null
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return null
        }
    }
}

export async function deletePost(postId: number) {
    try {
        const response = await fetch(`${apiUrl}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const responseData = await response.json()
        if(responseData.success)
            return responseData
        else
            return null
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
            return null
        }
    }
}

export async function likePost(postId: number, userId: number) {
    try {
        const response = await fetch(`${apiUrl}/posts/${postId}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userId)
        })
 
        const responseData = await response.json()
        
        if(responseData.success) {
            const likeResponse = {
                post: responseData.post,
                curtiu: responseData.curtiu
            }
            return likeResponse
        }
        else
            return null
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
            return null
        }
    }
}