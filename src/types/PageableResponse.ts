// src/types/PageableResponse.ts
export interface PageableResponse<T> {
    content: T[];
    pageable: {
        page_number: number;
        page_size: number;
        offset: number;
        paged: boolean;
        unpaged: boolean;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
    };
    last: boolean;
    total_pages: number;
    total_elements: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    number_of_elements: number;
    empty: boolean;
}
