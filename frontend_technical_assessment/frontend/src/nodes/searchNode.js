import { BaseNode } from "./baseNode"

export const SearchNode = ({ id, data }) => {

    return (
        <div>
            <BaseNode 
                id={id}
                data={data}
                nodeName='Image'
                fields={[
                    { name: 'Name', type: 'text', valueKey: 'currName'},
                    { name: 'Type', type: 'select', valueKey: 'inputType', options: ['Prompt', 'Image', 'File']}
                ]}
                inputHandles={['input']}
                outputHandles={['result']}
            />
        </div>
    )
}