import { db } from "./db.js";
import { runLarkCommand } from "../executor.js";
/**
 * Upserts a document into the Knowledge Base FTS5 table.
 */
export async function upsertDocument(doc) {
    // First delete if exists to update (FTS5 doesn't handle direct REPLACE easily without rowid issues)
    const deleteStmt = db.prepare("DELETE FROM kb_documents WHERE content_id = ?");
    deleteStmt.run(doc.content_id);
    const insertStmt = db.prepare(`
    INSERT INTO kb_documents (content_id, type, title, content, metadata)
    VALUES (?, ?, ?, ?, ?)
  `);
    insertStmt.run(doc.content_id, doc.type, doc.title, doc.content, doc.metadata ? JSON.stringify(doc.metadata) : "{}");
}
/**
 * Search across indexed documents using FTS5.
 */
export async function searchKB(query, limit = 5) {
    const stmt = db.prepare(`
    SELECT content_id, type, title, snippet(kb_documents, 3, '...', '...', '...', 10) as snippet, metadata, rank
    FROM kb_documents
    WHERE kb_documents MATCH ?
    ORDER BY rank
    LIMIT ?
  `);
    return stmt.all(query, limit);
}
/**
 * Recursively indexes Wiki nodes for a space.
 */
export async function indexWikiSpace(spaceId) {
    console.log(`🚀 Indexing Wiki Space: ${spaceId}`);
    // List all nodes in the space
    const response = await runLarkCommand(["wiki", "+nodes", "--space_id", spaceId]);
    if (response.code !== 0 || !response.data?.nodes) {
        throw new Error(`Failed to list nodes for space ${spaceId}`);
    }
    const nodes = response.data.nodes;
    let indexedCount = 0;
    for (const node of nodes) {
        // Only index docs/nodes for now
        if (node.obj_type === 'doc' || node.obj_type === 'docx' || node.obj_type === 'bitable') {
            try {
                // Optionally fetch full content here or just index title/token
                // For now, let's index title and use snippet of title as content if full content is too expensive
                await upsertDocument({
                    content_id: node.obj_token,
                    type: node.obj_type,
                    title: node.title,
                    content: `Lark Wiki Node: ${node.title}. Token: ${node.obj_token}`,
                    metadata: {
                        space_id: spaceId,
                        node_token: node.node_token,
                        parent_node_token: node.parent_node_token
                    }
                });
                indexedCount++;
            }
            catch (err) {
                console.warn(`Failed to index node ${node.obj_token}: ${err}`);
            }
        }
    }
    return { spaceId, indexedCount };
}
//# sourceMappingURL=indexer.js.map