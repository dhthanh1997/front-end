import { Status } from "../enum/Status";

export interface todoTable {
  id: number;
  name: string;
  date: Date;
  dateCreated: Date;
  status: string;
  expand: boolean;
  isShow: boolean;
}

export interface todoTableChild {
  id: number;
  name: string;
  age: number;
}




export class Task {
  id: number;
  name: string;
  projectId: number;
  totalCost: number;
  revenue: number;
  totalHour: number;
  startDate: Date;
  endDate: Date;
  estimateStartDate: Date;
  estimateEndDate: Date;
  realStartDate: Date;
  realEndDate: Date;
  description: string;
  problem: string;
  solution: string;
  note: string;
  attachFile: string;
  parendId: number;
  status: string;
  expand: boolean;
  isShow: boolean;

  constructor() {
    this.id = 0;
    this.projectId = 0;
    this.name = '';
    this.totalCost = 0;
    this.revenue = 0;
    this.totalHour = 0;
    this.startDate = new Date();
    this.endDate = new Date();
    this.estimateStartDate = new Date();
    this.estimateEndDate = new Date();
    this.realStartDate = new Date();
    this.realEndDate = new Date();
    this.description = '';
    this.problem = '';
    this.solution = '';
    this.note = '';
    this.attachFile = '';
    this.parendId = 0;
    this.status = Status.TODO;
    this.expand = false;
    this.isShow = false;
  }

  setName(name: string) {
    this.name = name;
  }

  setDescription(description: string) {
    this.description = description;
  }

}

export function taskList(): Task[] {
  let listTask: Task[] = [];
  for (let i = 0; i < 10; i++) {
    let task = new Task()
    task.id = i + 1;
    task.name = "task " + (i + 1);
    task.description = task.name + " " + task.description + " " + (i + 1);
    listTask.push(task);
  }
  return listTask;
}
