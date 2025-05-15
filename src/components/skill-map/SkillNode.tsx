import { memo, useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreVertical, Edit, Trash2, Plus, Link } from 'lucide-react'

interface SkillNodeData {
  label: string
  progress: number
  category: string
  description?: string
  onEdit: () => void
  onDelete: () => void
  onAddChild: () => void
  onAddRelated: () => void
}

function SkillNode({ data }: NodeProps<SkillNodeData>) {
  const [showMenu, setShowMenu] = useState(false)

  const handleEdit = () => {
    data.onEdit()
    setShowMenu(false)
  }

  const handleDelete = () => {
    data.onDelete()
    setShowMenu(false)
  }

  const handleAddChild = () => {
    data.onAddChild()
    setShowMenu(false)
  }

  const handleAddRelated = () => {
    data.onAddRelated()
    setShowMenu(false)
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 relative"
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="font-bold">{data.label}</div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="text-xs text-gray-500">{data.category}</div>
        {data.description && (
          <div className="text-xs text-gray-600 mt-1 line-clamp-2">{data.description}</div>
        )}
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${data.progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Progress: {data.progress}%
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />

      {/* Edit Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
          >
            <div className="py-1">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Skill</span>
              </button>
              <button
                onClick={handleAddChild}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Child Skill</span>
              </button>
              <button
                onClick={handleAddRelated}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
              >
                <Link className="w-4 h-4" />
                <span>Add Related Skill</span>
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Skill</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default memo(SkillNode) 