export const BASE_URL = "";

export default function createClient({ userId, baseUrl = BASE_URL } : { userId: string, baseUrl?: string }) {
    const userPath = () => `${baseUrl}/user/${userId}`;
    const tasksPath = () => `${userPath()}/task`;
    const taskPath = (tid: string) => `${tasksPath()}/${tid}`;

    return {
        async fetchTasks(): Promise<Tasks> {
            return fetch(tasksPath())
              .then(resp => resp.json());
        },
        async createTask(task: Task): Promise<Task> {
            return fetch(tasksPath(), {
              method: "POST",
              body: JSON.stringify(task),
            })
              .then(resp => resp.json())
        },
        async updateTask(tid: string, taskUpdate: TaskUpdate): Promise<void> {
            await fetch(taskPath(tid), {
                method: "PUT",
                body: JSON.stringify(taskUpdate),
            });
        },
        async destroyTask(tid: string): Promise<void> {
            await fetch(taskPath(tid), {
                method: "DELETE"
            });
        }
    }
}