import type { Member } from "@/lib/types"

/* ───────── Types ───────── */

export interface TreeNode {
  member: Member
  children: TreeNode[]
  id: string
  depth: number
}

export type TraversalAlgorithm = "bfs" | "dfs"

export interface TraversalStep {
  type: "enqueue" | "dequeue" | "visit" | "push" | "pop" | "complete"
  nodeId: string
  structureState: string[] // current queue / stack ids
  visitedState: string[] // accumulated visited ids
}

/* ───────── Layout constants ───────── */

export const NODE_W = 200
export const NODE_H = 84
export const H_GAP = 32
export const V_GAP = 100
export const TREE_PAD = 56

/* ───────── Tree building ───────── */

export function buildMemberTree(members: Member[]): TreeNode | null {
  if (members.length === 0) return null

  const faculty = members.filter(m => m.isFacultyCoordinator)
  const overall = members.filter(
    m => m.isOverallCoordinator && !m.isFacultyCoordinator,
  )
  const coords = members.filter(
    m =>
      m.role === "coordinator" &&
      !m.isOverallCoordinator &&
      !m.isFacultyCoordinator,
  )
  const regular = members.filter(m => m.role === "member")

  let rootMember: Member
  const overallPool = [...overall]
  const coordPool = [...coords]
  const memberPool = [...regular]

  if (faculty.length > 0) {
    rootMember = faculty[0]
    for (let i = 1; i < faculty.length; i++) overallPool.unshift(faculty[i])
  } else if (overallPool.length > 0) {
    rootMember = overallPool.shift()!
  } else if (coordPool.length > 0) {
    rootMember = coordPool.shift()!
  } else if (memberPool.length > 0) {
    rootMember = memberPool.shift()!
  } else {
    return null
  }

  const root: TreeNode = {
    member: rootMember,
    children: [],
    id: rootMember.id,
    depth: 0,
  }

  // Level 1 — overall coordinators
  const l1: TreeNode[] = overallPool.map(m => ({
    member: m,
    children: [],
    id: m.id,
    depth: 1,
  }))
  root.children.push(...l1)

  // Level 2 — coordinators distributed round-robin among Level 1 (or root)
  const l2Parents = l1.length > 0 ? l1 : [root]
  const l2: TreeNode[] = []
  coordPool.forEach((m, i) => {
    const parent = l2Parents[i % l2Parents.length]
    const node: TreeNode = {
      member: m,
      children: [],
      id: m.id,
      depth: parent.depth + 1,
    }
    parent.children.push(node)
    l2.push(node)
  })

  // Level 3 — regular members distributed round-robin among deepest parents
  const l3Parents =
    l2.length > 0 ? l2 : l1.length > 0 ? l1 : [root]
  memberPool.forEach((m, i) => {
    const parent = l3Parents[i % l3Parents.length]
    const node: TreeNode = {
      member: m,
      children: [],
      id: m.id,
      depth: parent.depth + 1,
    }
    parent.children.push(node)
  })

  return root
}

/* ───────── BFS step generation ───────── */

export function generateBFSSteps(root: TreeNode): TraversalStep[] {
  const steps: TraversalStep[] = []
  const queue: TreeNode[] = [root]
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

/* ───────── DFS step generation ───────── */

export function generateDFSSteps(root: TreeNode): TraversalStep[] {
  const steps: TraversalStep[] = []
  const stack: TreeNode[] = [root]
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

    // push children in reverse so leftmost is on top
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

/* ───────── Utilities ───────── */

export function flattenTree(root: TreeNode): TreeNode[] {
  const result: TreeNode[] = []
  const q: TreeNode[] = [root]
  while (q.length > 0) {
    const n = q.shift()!
    result.push(n)
    q.push(...n.children)
  }
  return result
}

export function getEdges(
  root: TreeNode,
): { from: string; to: string }[] {
  const edges: { from: string; to: string }[] = []
  function walk(node: TreeNode) {
    for (const child of node.children) {
      edges.push({ from: node.id, to: child.id })
      walk(child)
    }
  }
  walk(root)
  return edges
}

/* ───────── Layout algorithm ───────── */

function subtreeWidth(node: TreeNode): number {
  if (node.children.length === 0) return NODE_W
  let w = 0
  for (let i = 0; i < node.children.length; i++) {
    if (i > 0) w += H_GAP
    w += subtreeWidth(node.children[i])
  }
  return Math.max(NODE_W, w)
}

function maxDepth(node: TreeNode): number {
  if (node.children.length === 0) return 0
  return 1 + Math.max(...node.children.map(maxDepth))
}

export interface LayoutResult {
  positions: Map<string, { x: number; y: number }>
  width: number
  height: number
}

export function calculateLayout(root: TreeNode): LayoutResult {
  const positions = new Map<string, { x: number; y: number }>()

  const depth = maxDepth(root)
  const totalW = subtreeWidth(root)
  const totalH = (depth + 1) * NODE_H + depth * V_GAP

  function assign(node: TreeNode, left: number, top: number) {
    const w = subtreeWidth(node)
    positions.set(node.id, { x: left + w / 2 - NODE_W / 2, y: top })

    let childLeft = left
    for (const child of node.children) {
      const cw = subtreeWidth(child)
      assign(child, childLeft, top + NODE_H + V_GAP)
      childLeft += cw + H_GAP
    }
  }

  assign(root, 0, 0)
  return { positions, width: totalW, height: totalH }
}
