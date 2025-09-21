import { BaseNode } from "./baseNode"

export const APIRequestNode = ({id, data}) => {
    return (
        <dv>
            <BaseNode 
                id={id}
                data={data}
                nodeName='API Request'
                staticContent='Calls an API'
                inputHandles={['triggers']}
            />
        </dv>
    )
}