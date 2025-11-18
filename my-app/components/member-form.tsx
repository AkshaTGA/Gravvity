"use client"

import type React from "react"

import { useState } from "react"
import { useRef, useCallback } from "react"
import type { Member } from "@/lib/types"
import { wings } from "@/lib/data"
import { uploadToCloudinary } from "@/lib/cloudinary"
import MagicButton from "@/components/magic-button"

interface MemberFormProps {
  member?: Member
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function MemberForm({ member, onSubmit, onCancel }: MemberFormProps) {
  const [formData, setFormData] = useState<{
    name: string
    role: Member["role"]
    wing: string
    bio: string
    image: string
    isOverallCoordinator: boolean
    isFacultyCoordinator: boolean
  }>({
    name: member?.name || "",
    role: member?.role || "member",
    wing: member?.wing || "",
    bio: member?.bio || "",
    image: member?.image || "",
    isOverallCoordinator: member?.isOverallCoordinator || false,
    isFacultyCoordinator: member?.isFacultyCoordinator || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const [uploading, setUploading] = useState(false)

  // Cropping state
  const [cropping, setCropping] = useState(false)
  const [rawImage, setRawImage] = useState<string | null>(null)
  const [rawFileName, setRawFileName] = useState<string | null>(null)
  const [crop, setCrop] = useState<{ x: number; y: number; size: number } | null>(null)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
  const imageContainerRef = useRef<HTMLDivElement | null>(null)

  const startCrop = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setDragStart({ x, y })
    setCrop({ x, y, size: 0 })
  }

  const moveCrop = (e: React.MouseEvent) => {
    if (!dragStart || !imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    let x2 = e.clientX - rect.left
    let y2 = e.clientY - rect.top
    // clamp
    x2 = Math.max(0, Math.min(rect.width, x2))
    y2 = Math.max(0, Math.min(rect.height, y2))
    const dx = x2 - dragStart.x
    const dy = y2 - dragStart.y
    const size = Math.min(Math.abs(dx), Math.abs(dy))
    const x = dx >= 0 ? dragStart.x : dragStart.x - size
    const y = dy >= 0 ? dragStart.y : dragStart.y - size
    setCrop({ x: Math.max(0, x), y: Math.max(0, y), size: Math.max(0, size) })
  }

  const endCrop = () => {
    setDragStart(null)
  }

  const resetCropState = () => {
    setCropping(false)
    setRawImage(null)
    setRawFileName(null)
    setCrop(null)
    setDragStart(null)
  }

  const processDataUrl = useCallback(async (dataUrl: string, originalName: string | null) => {
    try {
      if (
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      ) {
        setUploading(true)
        const blob = await (await fetch(dataUrl)).blob()
        const safeName = (originalName || 'image').replace(/\.[^.]+$/, '.jpg')
        const outFile = new File([blob], safeName, { type: 'image/jpeg' })
        const url = await uploadToCloudinary(outFile)
        setFormData((prev) => ({ ...prev, image: url }))
      } else {
        setFormData((prev) => ({ ...prev, image: dataUrl }))
      }
    } catch (err) {
      console.error(err)
      setFormData((prev) => ({ ...prev, image: dataUrl }))
    } finally {
      setUploading(false)
      resetCropState()
    }
  }, [])

  const confirmCrop = async () => {
    if (!rawImage || !crop || !imageContainerRef.current) return
    const img = new Image()
    img.onload = () => {
      // Determine scale between displayed image and natural size
      const displayWidth = imageContainerRef.current!.clientWidth
      const displayHeight = imageContainerRef.current!.clientHeight
      const scaleX = img.naturalWidth / displayWidth
      const scaleY = img.naturalHeight / displayHeight
      const sx = Math.round(crop.x * scaleX)
      const sy = Math.round(crop.y * scaleY)
      const sSize = Math.round(crop.size * Math.min(scaleX, scaleY))
      const MAX_DIM = 512
      let targetSize = sSize
      if (targetSize > MAX_DIM) targetSize = MAX_DIM
      const canvas = document.createElement('canvas')
      canvas.width = targetSize
      canvas.height = targetSize
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(
          img,
          sx,
          sy,
          sSize,
          sSize,
          0,
          0,
          targetSize,
          targetSize
        )
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
        processDataUrl(dataUrl, rawFileName)
      }
    }
    img.src = rawImage
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => {
      setRawImage(reader.result as string)
      setRawFileName(file.name)
      setCropping(true)
      setCrop(null)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { ...member, ...formData }
    if (!payload.image) {
      payload.image = '/gravity-logo.png'
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="member">Member</option>
            <option value="coordinator">Coordinator</option>
          </select>
        </div>
      </div>

      {!(formData.role === "coordinator" && (formData.isOverallCoordinator || formData.isFacultyCoordinator)) && (
        <div>
          <label className="block text-sm font-medium mb-2">Wing</label>
          <select
            name="wing"
            value={formData.wing}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select a wing</option>
            {wings.map((wing) => (
              <option key={wing.id} value={wing.name}>
                {wing.name}
              </option>
            ))}
          </select>
          {/* Quick toggle to make this person a coordinator of the selected wing */}
          {formData.wing && formData.role !== "coordinator" && (
            <label className="mt-3 inline-flex items-center gap-2 select-none">
              <input
                type="checkbox"
                checked={false}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, role: e.target.checked ? "coordinator" : "member" }))
                }
                className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm font-medium">Coordinator for this wing</span>
            </label>
          )}
        </div>
      )}

      {formData.role === "coordinator" && (
        <div className="flex items-center gap-2">
          <input
            id="overallCoordinator"
            type="checkbox"
            checked={formData.isOverallCoordinator}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isOverallCoordinator: e.target.checked }))
            }
            className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-2 focus:ring-primary"
          />
          <label htmlFor="overallCoordinator" className="text-sm font-medium">
            Overall Coordinator
          </label>
        </div>
      )}

      {formData.role === "coordinator" && (
        <div className="flex items-center gap-2">
          <input
            id="facultyCoordinator"
            type="checkbox"
            checked={formData.isFacultyCoordinator}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isFacultyCoordinator: e.target.checked }))
            }
            className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-2 focus:ring-primary"
          />
          <label htmlFor="facultyCoordinator" className="text-sm font-medium">
            Faculty Coordinator
          </label>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Enter member bio"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={cropping || uploading}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground file:bg-primary file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 cursor-pointer"
        />
        {cropping && rawImage && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-foreground/60">Drag to select a square crop region. Release to set. Then apply.</p>
            <div
              ref={imageContainerRef}
              onMouseDown={startCrop}
              onMouseMove={moveCrop}
              onMouseUp={endCrop}
              className="relative inline-block select-none border border-border rounded"
              style={{ cursor: 'crosshair' }}
            >
              <img src={rawImage} alt="To crop" className="max-h-96 max-w-full block" draggable={false} />
              {crop && (
                <div
                  className="absolute border-2 border-primary/80 bg-primary/10"
                  style={{
                    left: crop.x,
                    top: crop.y,
                    width: crop.size,
                    height: crop.size,
                  }}
                />
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={confirmCrop}
                disabled={!crop || uploading}
                className="px-3 py-2 text-sm font-medium rounded bg-primary text-white disabled:opacity-50"
              >
                Apply Crop
              </button>
              <button
                type="button"
                onClick={resetCropState}
                className="px-3 py-2 text-sm font-medium rounded bg-card border border-border"
              >
                Cancel Crop
              </button>
            </div>
          </div>
        )}
        {uploading && <p className="mt-2 text-sm text-foreground/60">Uploading image...</p>}
        {formData.image && (
          <div className="mt-2 flex items-center gap-3">
            <div className="relative w-20 h-20">
              <img
                src={formData.image || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="text-xs text-foreground/50 max-w-40 truncate">Image ready</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <MagicButton type="submit" className="flex-1" heightClass="h-11" disabled={uploading}>
          {member ? "Update" : "Add"} Member
        </MagicButton>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 rounded-lg bg-card border border-border text-foreground font-medium hover:bg-card/80 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}


