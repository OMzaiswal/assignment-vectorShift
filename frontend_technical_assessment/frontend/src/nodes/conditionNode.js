import { BaseNode } from "./baseNode"

export const ConditionNode = ({id, data}) => {
    return (
        <div>
            <BaseNode 
                id={id}
                data={data}
                nodeName='Condition'
                fields={[
                    {name: 'Condition Name', type: 'text', valueKey: 'conditionName'}
                ]}
                inputHandles={['input']}
                outputHandles={['output']}
            />
        </div>
    )
}