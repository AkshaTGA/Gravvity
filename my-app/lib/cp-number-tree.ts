/* ──────────────────────────────────────────────
   Number-based binary tree with BFS / DFS steps
   ────────────────────────────────────────────── */

/* ── Types ── */

export interface NumTreeNode {
  value: number
  id: string
  children: NumTreeNode[]
  depth: number
}

export type TraversalAlgorithm = "bfs" | "dfs"

export interface TraversalStep {
  type: "enqueue" | "dequeue" | "visit" | "push" | "pop" | "complete"
  nodeId: string
  structureState: string[] // current queue / stack ids
  visitedState: string[] // accumulated visited ids
}

/* ── Layout constants ── */

export const NODE_SIZE = 56
export const H_GAP = 20
export const V_GAP = 72
export const TREE_PAD = 40

/* ── Default tree values (complete binary tree, 4 levels, 15 nodes) ── */

const DEFAULT_VALUES = [42, 25, 67, 15, 33, 58, 82, 8, 19, 29, 37, 50, 63, 75, 91]

/* ── Tree building ── */

export function buildNumberTree(values: number[] = DEFAULT_VALUES): NumTreeNode | null {
  if (values.length === 0) return null

  const nodes: NumTreeNode[] = values.map((v, i) => ({
    value: v,
    id: `n${i}`,
    children: [],
    depth: 0,
  }))

  for (let i = 0; i < nodes.length; i++) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    if (left < nodes.length) {
      nodes[left].depth = nodes[i].depth + 1
      nodes[i].children.push(nodes[left])
    }
    if (right < nodes.length) {
      nodes[right].depth = nodes[i].depth + 1
      nodes[i].children.push(nodes[right])
    }
  }

  return nodes[0]
}

export function randomTreeValues(count = 15, min = 5, max = 95): number[] {
  const set = new Set<number>()
  while (set.size < count) {
    set.add(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return Array.from(set)
}

/* ── BFS step generation ── */

export function generateBFSSteps(root: NumTreeNode): TraversalStep[] {
  const steps: TraversalStep[] = []
  const queue: NumTreeNode[] = [root]
  const visited: string[] = []

  steps.push({
    type: "enqueue",
    nodeId: root.id,
    structureState: [root.id],
    visitedState: [],
  })

  while (queue.length > 0) {
    const node = queue.shift()!
    steps.push({
      type: "dequeue",
      nodeId: node.id,
      structureState: queue.map(n => n.id),
      visitedState: [...visited],
    })

    visited.push(node.id)
    steps.push({
      type: "visit",
      nodeId: node.id,
      structureState: queue.map(n => n.id),
      visitedState: [...visited],
    })

    for (const child of node.children) {
      queue.push(child)
      steps.push({
        type: "enqueue",
        nodeId: child.id,
        structureState: queue.map(n => n.id),
        visitedState: [...visited],
      })
    }
  }

  steps.push({
    type: "complete",
    nodeId: root.id,
    structureState: [],
    visitedState: [...visited],
  })
  return steps
}

/* ── DFS step generation ── */

export function generateDFSSteps(root: NumTreeNode): TraversalStep[] {
  const steps: TraversalStep[] = []
  const stack: NumTreeNode[] = [root]
  const visited: string[] = []

  steps.push({
    type: "push",
    nodeId: root.id,
    structureState: [root.id],
    visitedState: [],
  })

  while (stack.length > 0) {
    const node = stack.pop()!
    steps.push({
      type: "pop",
      nodeId: node.id,
      structureState: stack.map(n => n.id),
      visitedState: [...visited],
    })

    visited.push(node.id)
    steps.push({
      type: "visit",
      nodeId: node.id,
      structureState: stack.map(n => n.id),
      visitedState: [...visited],
    })

    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i])
      steps.push({
        type: "push",
        nodeId: node.children[i].id,
        structureState: stack.map(n => n.id),
        visitedState: [...visited],
      })
    }
  }

  steps.push({
    type: "complete",
    nodeId: root.id,
    structureState: [],
    visitedState: [...visited],
  })
  return steps
}

/* ── Utilities ── */

export function flattenTree(root: NumTreeNode): NumTreeNode[] {
  const result: NumTreeNode[] = []
  const q: NumTreeNode[] = [root]
  while (q.length > 0) {
    const n = q.shift()!
    result.push(n)
    q.push(...n.children)
  }
  return result
}

export function getEdges(root: NumTreeNode): { from: string; to: string }[] {
  const edges: { from: string; to: string }[] = []
  function walk(node: NumTreeNode) {
    for (const child of node.children) {
      edges.push({ from: node.id, to: child.id })
      walk(child)
    }
  }
  walk(root)
  return edges
}

/* ── Layout algorithm ── */

function subtreeWidth(node: NumTreeNode): number {
  if (node.children.length === 0) return NODE_SIZE
  let w = 0
  for (let i = 0; i < node.children.length; i++) {
    if (i > 0) w += H_GAP
    w += subtreeWidth(node.children[i])
  }
  return Math.max(NODE_SIZE, w)
}

function maxDepth(node: NumTreeNode): number {
  if (node.children.length === 0) return 0
  return 1 + Math.max(...node.children.map(maxDepth))
}

export interface LayoutResult {
  positions: Map<string, { x: number; y: number }>
  width: number
  height: number
}

export function calculateLayout(root: NumTreeNode): LayoutResult {
  const positions = new Map<string, { x: number; y: number }>()

  const depth = maxDepth(root)
  const totalW = subtreeWidth(root)
  const totalH = (depth + 1) * NODE_SIZE + depth * V_GAP

  function assign(node: NumTreeNode, left: number, top: number) {
    const w = subtreeWidth(node)
    positions.set(node.id, { x: left + w / 2 - NODE_SIZE / 2, y: top })

    let childLeft = left
    for (const child of node.children) {
      const cw = subtreeWidth(child)
      assign(child, childLeft, top + NODE_SIZE + V_GAP)
      childLeft += cw + H_GAP
    }
  }

  assign(root, 0, 0)
  return { positions, width: totalW, height: totalH }
}
