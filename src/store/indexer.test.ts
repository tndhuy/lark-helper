import { describe, it, expect, vi, beforeEach } from "vitest";
import { upsertDocument, searchKB, indexWikiSpace } from "./indexer.js";
import { db } from "./db.js";
import { runLarkCommand } from "../executor.js";

vi.mock("../executor.js");
vi.mock("./db.js", () => {
  const mockPrepare = vi.fn().mockReturnValue({
    run: vi.fn(),
    all: vi.fn().mockReturnValue([])
  });
  return {
    db: {
      prepare: mockPrepare,
      exec: vi.fn()
    }
  };
});

describe("KB Indexer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should upsert a document into FTS5 table", async () => {
    await upsertDocument({
      content_id: "token123",
      type: "doc",
      title: "My Doc",
      content: "Document content"
    });

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO kb_documents"));
  });

  it("should perform full-text search", async () => {
    const mockResults = [{ content_id: "t1", title: "R1", snippet: "..." }];
    (db.prepare("query") as any).all.mockReturnValue(mockResults);

    const results = await searchKB("query test");

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining("WHERE kb_documents MATCH"));
    expect(results).toEqual(mockResults);
  });

  it("should recursively index wiki nodes", async () => {
    (runLarkCommand as any).mockResolvedValue({
      code: 0,
      data: {
        nodes: [
          { obj_token: "o1", obj_type: "doc", title: "Node 1" },
          { obj_token: "o2", obj_type: "docx", title: "Node 2" }
        ]
      }
    });

    const result = await indexWikiSpace("space-id");

    expect(runLarkCommand).toHaveBeenCalledWith(["wiki", "+nodes", "--space_id", "space-id"]);
    expect(result.indexedCount).toBe(2);
  });
});
