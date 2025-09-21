// baseNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, nodeName, staticContent = '', fields = [], inputHandles = [], outputHandles = [] }) => {
  const initialState = {};
  fields.forEach(field => {
    initialState[field.valueKey] = data?.[field.valueKey] || (field.type === 'text' ? '' : field?.options?.[0])
  })
  const [fieldValues, setFieldValues] = useState(initialState);

  const handleChange = (key) => (e) => {
    setFieldValues(prev => ({ ...prev, [key]: e.target.value }))
  }

  return (
    <div style={{width: 200, height: 80, border: '1px solid black'}}>
      {/* input handles */}
      {inputHandles.map((handleId, index) => (
        <div key={handleId}>
          <Handle 
          type='target'
          position={Position.Left}
          id={`${id}-${handleId}`}
          style={{ top: 20 + index * 20 }} // 20px apart
        />
        </div>
      ))}

      {/* fields */}
      <div>
        <div>{nodeName}</div>
        {staticContent && <p>{staticContent}</p>}
        {fields.map(field => (
          <div key={field.valueKey}>
            <label>
              {field.name}:
              {field.type === 'text' ? (
                <input 
                  type='text'
                  value={fieldValues[field.valueKey]}
                  onChange={handleChange(field.valueKey)}
                  placeholder={field.placeholder} 
                />
              ) : (
                <select>
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </label>
          </div>
        ))}
      </div>

      {/* Output handles */}
      {outputHandles.map((handleId, index) => (
        <div key={handleId}>
          <Handle 
          type='source'
          position={Position.Right}
          id={`${id}-${handleId}`}
          style={{ top: 20 + index * 20 }} // 20px apart
        />
        </div>
      ))}
    </div>
  )


  // const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  // const [inputType, setInputType] = useState(data.inputType || 'Text');

  // const handleNameChange = (e) => {
  //   setCurrName(e.target.value);
  // };

  // const handleTypeChange = (e) => {
  //   setInputType(e.target.value);
  // };

  // return (
  //   <div style={{width: 200, height: 80, border: '1px solid black'}}>
  //     <div>
  //       <span>Input</span>
  //     </div>
  //     <div>
  //       <label>
  //         Name:
  //         <input 
  //           type="text" 
  //           value={currName} 
  //           onChange={handleNameChange} 
  //         />
  //       </label>
  //       <label>
  //         Type:
  //         <select value={inputType} onChange={handleTypeChange}>
  //           <option value="Text">Text</option>
  //           <option value="File">File</option>
  //         </select>
  //       </label>
  //     </div>
  //     <Handle
  //       type="source"
  //       position={Position.Right}
  //       id={`${id}-value`}
  //     />
  //   </div>
  // );
}
