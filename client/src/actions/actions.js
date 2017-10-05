export const SNIPPET_SELECTED = "SNIPPET_SELECTED";

export function selectSnippet(snippetId) {
  return {
    type: SNIPPET_SELECTED,
    payload: snippetId
  };
}
