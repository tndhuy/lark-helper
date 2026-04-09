export interface IndexDocument {
    content_id: string;
    type: string;
    title: string;
    content: string;
    metadata?: any;
}
/**
 * Upserts a document into the Knowledge Base FTS5 table.
 */
export declare function upsertDocument(doc: IndexDocument): Promise<void>;
/**
 * Search across indexed documents using FTS5.
 */
export declare function searchKB(query: string, limit?: number): Promise<unknown[]>;
/**
 * Recursively indexes Wiki nodes for a space.
 */
export declare function indexWikiSpace(spaceId: string): Promise<{
    spaceId: string;
    indexedCount: number;
}>;
