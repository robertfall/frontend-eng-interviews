export const BASE_URL = "";

export default function createClient({ userId, baseUrl = BASE_URL } : { userId: string, baseUrl?: string }) {
    const userPath = () => `${baseUrl}/user/${userId}`;
    const tasksPath = () => `${userPath()}/task`;
    const taskPath = (tid: string) => `${tasksPath()}/${tid}`;

    return {
        fetchTasks: async() => {
            return fetch(tasksPath())
              .then(resp => resp.json());
        },
        createTask: async(task: Task) => {
            return fetch(tasksPath(), {
              method: "POST",
              body: JSON.stringify(task),
            })
              .then(resp => resp.json())
        },
        updateTask: async(tid: string, taskUpdate: TaskUpdate) => {
            return fetch(taskPath(tid), {
                method: "PUT",
                body: JSON.stringify(taskUpdate),
            })
                .then(resp => resp.json())
        }
    }
}