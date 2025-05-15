import { useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
  MiniMap,
} from 'reactflow'
import 'reactflow/dist/style.css'
import SkillNode from './SkillNode'
import type { Skill } from '@/types'

interface SkillMapProps {
  skills: Skill[]
  onEditSkill: (skillId: string) => Promise<void>
  onDeleteSkill: (skillId: string) => Promise<void>
  onAddChildSkill: (parentId: string) => Promise<void>
  onAddRelatedSkill: (skillId: string) => Promise<void>
}

const nodeTypes = {
  skill: SkillNode,
}

export default function SkillMap({ 
  skills,
  onEditSkill,
  onDeleteSkill,
  onAddChildSkill,
  onAddRelatedSkill,
}: SkillMapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    skills.map((skill, index) => ({
      id: skill.id,
      type: 'skill',
      data: { 
        label: skill.name,
        category: skill.category,
        progress: skill.progress,
        description: skill.description,
        onEdit: () => onEditSkill(skill.id),
        onDelete: () => onDeleteSkill(skill.id),
        onAddChild: () => onAddChildSkill(skill.id),
        onAddRelated: () => onAddRelatedSkill(skill.id),
      },
      position: { 
        x: 200 + (index % 6) * 200, 
        y: Math.floor(index / 6) * 150 
      },
    }))
  )

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    skills.flatMap((skill, index) => 
      (skill.dependencies || []).map((depId, depIndex) => ({
        id: `e${skill.id}-${depId}`,
        source: skill.id,
        target: depId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
      }))
    )
  )

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 2 },
    }, eds)),
    [setEdges]
  )

  const addNewSkill = useCallback(() => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'skill',
      data: { 
        label: 'New Skill',
        category: 'Custom',
        progress: 0,
        description: undefined,
        onEdit: () => onEditSkill(`${nodes.length + 1}`),
        onDelete: () => onDeleteSkill(`${nodes.length + 1}`),
        onAddChild: () => onAddChildSkill(`${nodes.length + 1}`),
        onAddRelated: () => onAddRelatedSkill(`${nodes.length + 1}`),
      },
      position: {
        x: Math.random() * 1200,
        y: Math.random() * 400,
      },
    }
    setNodes((nds) => [...nds, newNode])
  }, [nodes.length, setNodes, onEditSkill, onDeleteSkill, onAddChildSkill, onAddRelatedSkill])

  return (
    <div className="w-full h-[600px] border rounded-lg bg-background/50 backdrop-blur-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
      >
        <Background gap={32} size={1} color="#80808012" />
        <Controls className="bg-background/80 backdrop-blur-sm" />
        <MiniMap 
          className="bg-background/80 backdrop-blur-sm"
          nodeColor="#3b82f6"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
        <Panel position="top-right" className="bg-background/80 backdrop-blur-sm p-2 rounded-md">
          <button
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors"
            onClick={addNewSkill}
          >
            Add Skill
          </button>
        </Panel>
      </ReactFlow>
    </div>
  )
} 