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
} from 'reactflow'
import 'reactflow/dist/style.css'
import SkillNode from './SkillNode'

const nodeTypes = {
  skill: SkillNode,
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'skill',
    data: { 
      label: 'Frontend Development',
      category: 'Core',
      progress: 75
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: 'skill',
    data: { 
      label: 'React',
      category: 'Framework',
      progress: 60
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'skill',
    data: { 
      label: 'Next.js',
      category: 'Framework',
      progress: 45
    },
    position: { x: 400, y: 100 },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
]

export default function SkillMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const addNewSkill = useCallback(() => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'skill',
      data: { 
        label: 'New Skill',
        category: 'Custom',
        progress: 0
      },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
    }
    setNodes((nds) => [...nds, newNode])
  }, [nodes.length, setNodes])

  return (
    <div className="w-full h-[600px] border rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-right">
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