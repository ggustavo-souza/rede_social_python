export interface Post {
    id: number,
    titulo: string,
    conteudo: string,
    foto: string,
    usuario_id: number,
    autor: {
        nome: string
    }
    data: string
}

export interface PostFormData {
    titulo: string,
    conteudo: string,
    usuario_id: string | null
    foto: File | null
}