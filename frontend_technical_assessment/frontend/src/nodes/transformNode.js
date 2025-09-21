import { BaseNode } from "./baseNode"

export const TransformNode = ({id, data}) => {
    return (
        <div>
            <BaseNode 
                id={id}
                data={data}
                nodeName='Transform'
                staticContent='Transform Input Data'
                inputHandles={['input']}
                outputHandles={['output']}
            />
        </div>
    )
}