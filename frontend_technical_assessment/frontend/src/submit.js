// // submit.js

// export const SubmitButton = ({ nodes, edges }) => {
//     const handleSubmit = async () => {
//         try {
//             const formData = new formData();
//             formData.append('pipeline', JSON.stringify({ nodes, edges }));
//         } catch (err) {}
//     }

    // return (
    //     <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    //         <button 
    //             type="submit" 
    //             className="border rounded-3xl text-white text-md bg-blue-400 px-5 py-2 hover:bg-blue-600"
    //             onClick = {handleSubmit}
    //         >
    //             Submit
    //         </button>
    //     </div>
    // );
// }


import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
  const { nodes = [], edges = [] } = useStore(
    (state) => ({ nodes: state.nodes, edges: state.edges }),
    shallow
  );

  const handleSubmit = async () => {
    if (!nodes.length) {
      alert('No nodes added!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      alert(`Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
    } catch (err) {
      console.error(err);
      alert('Error submitting pipeline');
    }
  };


  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <button 
            type="submit" 
            className="border rounded-3xl text-white text-md bg-blue-400 px-5 py-2 hover:bg-blue-600"
            onClick = {handleSubmit}
        >
            Submit
        </button>
    </div>
);
};
