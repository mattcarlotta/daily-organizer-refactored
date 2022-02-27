// clones the old node and replaces it with a new node (to remove event listeners)
export const cleanup = (node) =>
  node.parentNode.replaceChild(node.cloneNode(true), node);
