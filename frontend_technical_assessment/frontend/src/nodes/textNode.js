// textNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {

  const regex = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;
  const matches = [...(data?.currText || "").matchAll(regex)].map(m => m[1]);

  // Default + dynamic handles
  const inputHandles = [...new Set(matches)];
  
  return (
    <div>
      <BaseNode 
        id={id}
        data={data}
        nodeName='Text'
        fields={[
          { name: 'Text', type: 'textarea', valueKey: 'currText', placeholder: '{{input}}'}
        ]}
        inputHandles={inputHandles}
        outputHandles={['output']}
      />
    </div>
  )
}

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <label>
//           Text:
//           <input 
//             type="text" 
//             value={currText} 
//             onChange={handleTextChange} 
//           />
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-output`}
//       />
//     </div>
//   );
// }
