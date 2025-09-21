# from fastapi import FastAPI, Form
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# # Minimal CORS setup
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # allow all origins, you can restrict to frontend URL if needed
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get('/')
# def read_root():
#     return {'Ping': 'Pong'}

# @app.post('/pipelines/parse')
# def parse_pipeline(pipeline: str = Form(...)):
#     import json
#     pipeline_data = json.loads(pipeline)
#     nodes = pipeline_data.get("nodes", [])
#     edges = pipeline_data.get("edges", [])

#     def is_dag(nodes, edges):
#         from collections import defaultdict, deque

#         indegree = {node['id']: 0 for node in nodes}
#         graph = defaultdict(list)

#         for edge in edges:
#             src = edge['source']
#             tgt = edge['target']
#             graph[src].append(tgt)
#             indegree[tgt] += 1

#         queue = deque([n for n in indegree if indegree[n] == 0])
#         visited = 0

#         while queue:
#             node = queue.popleft()
#             visited += 1
#             for nei in graph[node]:
#                 indegree[nei] -= 1
#                 if indegree[nei] == 0:
#                     queue.append(nei)

#         return visited == len(nodes)

#     return {
#         "num_nodes": len(nodes),
#         "num_edges": len(edges),
#         "is_dag": is_dag(nodes, edges)
#     }
#     # return {'status': 'parsed'}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges

    def is_dag(nodes, edges):
        from collections import defaultdict, deque

        indegree = {node['id']: 0 for node in nodes}
        graph = defaultdict(list)

        for edge in edges:
            src = edge['source']
            tgt = edge['target']
            graph[src].append(tgt)
            indegree[tgt] += 1

        queue = deque([n for n in indegree if indegree[n] == 0])
        visited = 0

        while queue:
            node = queue.popleft()
            visited += 1
            for nei in graph[node]:
                indegree[nei] -= 1
                if indegree[nei] == 0:
                    queue.append(nei)

        return visited == len(nodes)

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag(nodes, edges)
    }
