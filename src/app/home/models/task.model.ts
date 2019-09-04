import { TaskPriority } from './task-priority.enum';

export class InstructorTask {
  id: string;
  createdOn: string;
  title: string;
  description: string;
  isActive: boolean;
  priority: TaskPriority;
  assignedInstructorId: string;
}
