export interface task {
  task_id: number,
  start_hour: number,
  start_minute: number,
  end_hour: number,
  end_minute: number,
  length: number,
  title: string,
  description?: string,
  location?: string,
  importance: number,
  daily: boolean
}