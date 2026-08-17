import type { Member } from "@/lib/types"

export type SortAlgorithm = "bubble" | "merge" | "quick"
export type SortKey = "name" | "role-priority"
export type SortDirection = "asc" | "desc"

export type RolePriority = 0 | 1 | 2 | 3

export type SortOperation =
  | { type: "compare"; indices: [number, number] }
  | { type: "swap"; indices: [number, number] }
  | { type: "pivot"; indices: [number] }
  | { type: "overwrite"; indices: [number]; value: number }

export function getRolePriority(member: Member): RolePriority {
  if (member.isFacultyCoordinator) return 0
  if (member.isOverallCoordinator) return 1
  if (member.role === "coordinator") return 2
  return 3
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase()
}

export function compareMembers(a: Member, b: Member, key: SortKey, direction: SortDirection): number {
  let result = 0

  if (key === "name") {
    result = normalizeName(a.name).localeCompare(normalizeName(b.name), "en", { sensitivity: "base" })
  } else {
    const priorityDelta = getRolePriority(a) - getRolePriority(b)
    if (priorityDelta !== 0) {
      result = priorityDelta
    } else {
      result = normalizeName(a.name).localeCompare(normalizeName(b.name), "en", { sensitivity: "base" })
    }
  }

  return direction === "asc" ? result : -result
}

function bubbleSortWithSteps(order: number[], compareOrderItems: (a: number, b: number) => number): SortOperation[] {
  const operations: SortOperation[] = []
  const arr = [...order]
  const length = arr.length

  for (let i = 0; i < length - 1; i += 1) {
    let swapped = false
    for (let j = 0; j < length - i - 1; j += 1) {
      operations.push({ type: "compare", indices: [j, j + 1] })
      if (compareOrderItems(arr[j], arr[j + 1]) > 0) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        operations.push({ type: "swap", indices: [j, j + 1] })
        swapped = true
      }
    }
    if (!swapped) break
  }

  return operations
}

function mergeSortWithSteps(order: number[], compareOrderItems: (a: number, b: number) => number): SortOperation[] {
  const operations: SortOperation[] = []
  const arr = [...order]

  const merge = (left: number, mid: number, right: number) => {
    const leftArray = arr.slice(left, mid + 1)
    const rightArray = arr.slice(mid + 1, right + 1)

    let leftIndex = 0
    let rightIndex = 0
    let mergedIndex = left

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      operations.push({ type: "compare", indices: [mergedIndex, mergedIndex] })
      if (compareOrderItems(leftArray[leftIndex], rightArray[rightIndex]) <= 0) {
        arr[mergedIndex] = leftArray[leftIndex]
        operations.push({ type: "overwrite", indices: [mergedIndex], value: leftArray[leftIndex] })
        leftIndex += 1
      } else {
        arr[mergedIndex] = rightArray[rightIndex]
        operations.push({ type: "overwrite", indices: [mergedIndex], value: rightArray[rightIndex] })
        rightIndex += 1
      }
      mergedIndex += 1
    }

    while (leftIndex < leftArray.length) {
      arr[mergedIndex] = leftArray[leftIndex]
      operations.push({ type: "overwrite", indices: [mergedIndex], value: leftArray[leftIndex] })
      leftIndex += 1
      mergedIndex += 1
    }

    while (rightIndex < rightArray.length) {
      arr[mergedIndex] = rightArray[rightIndex]
      operations.push({ type: "overwrite", indices: [mergedIndex], value: rightArray[rightIndex] })
      rightIndex += 1
      mergedIndex += 1
    }
  }

  const sort = (left: number, right: number) => {
    if (left >= right) return
    const mid = Math.floor((left + right) / 2)
    sort(left, mid)
    sort(mid + 1, right)
    merge(left, mid, right)
  }

  sort(0, arr.length - 1)
  return operations
}

function quickSortWithSteps(order: number[], compareOrderItems: (a: number, b: number) => number): SortOperation[] {
  const operations: SortOperation[] = []
  const arr = [...order]

  const partition = (low: number, high: number): number => {
    const pivot = arr[high]
    operations.push({ type: "pivot", indices: [high] })

    let i = low - 1

    for (let j = low; j < high; j += 1) {
      operations.push({ type: "compare", indices: [j, high] })
      if (compareOrderItems(arr[j], pivot) <= 0) {
        i += 1
        if (i !== j) {
          const temp = arr[i]
          arr[i] = arr[j]
          arr[j] = temp
          operations.push({ type: "swap", indices: [i, j] })
        }
      }
    }

    if (i + 1 !== high) {
      const temp = arr[i + 1]
      arr[i + 1] = arr[high]
      arr[high] = temp
      operations.push({ type: "swap", indices: [i + 1, high] })
    }

    return i + 1
  }

  const sort = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high)
      sort(low, pi - 1)
      sort(pi + 1, high)
    }
  }

  sort(0, arr.length - 1)
  return operations
}

export function createSortOperations(
  members: Member[],
  key: SortKey,
  direction: SortDirection,
  algorithm: SortAlgorithm,
): { operations: SortOperation[]; sortedOrder: number[] } {
  const initialOrder = members.map((_, index) => index)
  const compareOrderItems = (aIndex: number, bIndex: number) => compareMembers(members[aIndex], members[bIndex], key, direction)

  const operations =
    algorithm === "bubble"
      ? bubbleSortWithSteps(initialOrder, compareOrderItems)
      : algorithm === "merge"
        ? mergeSortWithSteps(initialOrder, compareOrderItems)
        : quickSortWithSteps(initialOrder, compareOrderItems)

  const sortedOrder = [...initialOrder].sort(compareOrderItems)
  return { operations, sortedOrder }
}
