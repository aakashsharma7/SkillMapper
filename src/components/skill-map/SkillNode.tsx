import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { motion } from 'framer-motion'

interface SkillNodeData {
  label: string
  progress?: number
  category?: string
}

function SkillNode({ data }: NodeProps<SkillNodeData>) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex flex-col">
        <div className="font-bold">{data.label}</div>
        {data.category && (
          <div className="text-xs text-gray-500">{data.category}</div>
        )}
        {data.progress !== undefined && (
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
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </motion.div>
  )
}

export default memo(SkillNode) 