import { StateEnum } from "../enum/state-enum";
import { BaseEntity } from "./base";

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


// 1: Monday ... 5: Friday
export const dayNumberIgnoreWeekend = [1, 2, 3, 4, 5]
export class Task extends BaseEntity {
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
  parentId: number | null;
  state: number;
  status: string;
  expand: boolean;
  isShow: boolean;
  isUpdate: boolean;
  isInside: boolean;
  isSubTask: boolean;
  numberOfSubTask: number;
  sectionId: number;
  tagId: number;
  assignee: any;

  constructor() {
    super();
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
    this.parentId = null;
    this.state = StateEnum.NOT_DONE;
    this.status = '';
    this.expand = false;
    this.isShow = false;
    this.isUpdate = false;
    this.isInside = false;
    this.state = 0;
    this.isSubTask = false;
    this.numberOfSubTask = 0;
    this.sectionId = 0;
    this.tagId = 0;
    this.assignee = [];
  }

  setName(name: string) {
    this.name = name;
  }

  setDescription(description: string) {
    this.description = description;
  }

  // mặc định là ngày trong tuần
  // nêu tạo cuối tuần t7,cn sẽ nhảy sang t2
  setStartDate(date: Date) {
    if (dayNumberIgnoreWeekend.includes(date.getDay())) {
      this.startDate = date;
    } else {
      this.startDate.setDate(date.getDate() + (date.getDay() === 5 ? 2 : 1));
    }
  }

  // mặc định là thứ 6
  setEndDate(date: Date) {
    if (dayNumberIgnoreWeekend.includes(date.getDay())) {
      this.endDate.setDate(date.getDate() + (5 - date.getDay()));
    } else {
      this.endDate.setDate(date.getDate() + (date.getDay() === 6 ? 7 : 6));
    }
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
