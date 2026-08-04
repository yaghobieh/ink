# Feature — Keep in memory

**Tag:** library  
**Version:** 1.1.2  
**Jira:** INK-7

When `keepInMemory` is true, editor HTML is stored under `localStorage` key `ink-memory:{memoryKey}` and restored on mount. Optional `memoryKey` defaults to a stable editor id.
