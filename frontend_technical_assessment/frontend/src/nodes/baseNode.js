// baseNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, nodeName, staticContent = '', fields = [], inputHandles = [], outputHandles = [] }) => {
  const initialState = {};
  fields.forEach(field => {
    initialState[field.valueKey] = data?.[field.valueKey] || (field.type === 'text' || field.type === 'textarea' ? '' : field?.options?.[0])
  })
  const [fieldValues, setFieldValues] = useState(initialState);

  const handleChange = (key) => (e) => {
    setFieldValues(prev => ({ ...prev, [key]: e.target.value }))
  }

  return (
    <div className='bg-white border border-gray-300 rounded-lg p-4 w-72 h-auto shadow-md'>
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
      <div className='space-y-2 pb-4'>
        <div className='text-lg font-semibold text-center mb-2 text-blue-500'>{nodeName}</div>
        {staticContent && <p className='text-gray-600'>{staticContent}</p>}
        {fields.map(field => (
          <div key={field.valueKey}>
            <label className='text-sm font-medium text-gray-700'>
              {field.name}:
              {field.type === 'text' ? (
                <input 
                  type='text'
                  value={fieldValues[field.valueKey]}
                  onChange={handleChange(field.valueKey)}
                  placeholder={field.placeholder} 
                  className='border rounded w-full px-2 py-2 text-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white'
                />
              ) : field.type === 'textarea' ? (
                <textarea 
                  value={fieldValues[field.valueKey]}
                  onChange={handleChange(field.valueKey)}
                  placeholder={field.placeholder}
                  rows={1}
                  className='border rounded w-full px-2 py-2 text-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white'
                  style={{ height: 'auto' }}
                  onInput={e => {
                    e.target.style.height = 'auto';   // reset height
                    e.target.style.height = e.target.scrollHeight + 'px'; // set to content height
                  }}
                />
              ) : (
                <select
                  value={fieldValues[field.valueKey]}
                  onChange={handleChange(field.valueKey)}
                  className='border rounded w-full px-2 py-2 text-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white'
                >
                  {field.options.map(option => (
                    <option 
                      key={option} 
                      value={option}
                      className='text-gray-800 bg-white'
                    >
                      {option}
                    </option>
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
