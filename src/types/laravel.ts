export type LaravelResource<T> = {
    data:T[]
    total: number,
    path: string,
    next_page_url: string | null,
    from?: number,
    per_page?: number | null,
    current_page?: number | null,
    last_page?: number | null,
    first_page_url?: string | null,
    last_page_url?: string | null,
    prev_page_url?: string | null,
    to?: number | null,
}

export type LaravelResourceObject = {
    id: number ,
    created_at?: string | null,
    updated_at?: string | null,
}