import { BaseNode } from "./baseNode"

export const PrintNode = ({ id, data }) => {

    return (
        <div>
            <BaseNode 
                id={id}
                data={data}
                nodeName='Print'
                staticContent="This node prints the result"
                inputHandles={['input']}
            />
        </div>
    )
}