import { Component, OnInit, ViewChildren, QueryList, Input, ViewChild, ElementRef } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { InstructorService } from './service/instructor/instructor.service';
import { Member } from '../shared/member.model';
import { InstructorTask } from './models/task.model';
import { Router } from '@angular/router';
import { SessionStorageService } from '../shared/services/session-storage/session-storage.service';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { ModalDirective } from 'ngx-bootstrap';
import { TaskPriority } from './models/task-priority.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../@pages/components/message/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  members: Member[];
  tasks: InstructorTask[] = [];
  selectedTask: InstructorTask = new InstructorTask();
  taskPriority = TaskPriority;
  isLoading = false;
  taskForm: FormGroup;

  verticalScrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    suppressScrollY: false
  };

  @ViewChild('deleteMenu') public deleteMenu: ContextMenuComponent;
  @ViewChild('priorityMenu') public priorityMenu: ContextMenuComponent;

  @ViewChildren(PerfectScrollbarDirective) scrollbars: QueryList<PerfectScrollbarDirective>;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('createModal') createModal: ModalDirective;

  @ViewChild('instructorTaskDeletedMessage') instructorTaskDeletedMessage: ElementRef;

  readonly timeout = (ms: number) => new Promise(res => setTimeout(res, ms));

  constructor(
    private instructorService: InstructorService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private contextMenuService: ContextMenuService,
    private messageService: MessageService
  ) {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      priority: new FormControl(this.taskPriority.MEDIUM, [Validators.required])
    });
  }

  ngOnInit() {
    this.instructorService.getAssignedMembers().subscribe(async data => {
      this.members = data;
      await this.timeout(50);
      const activeMembersScrollbar = this.scrollbars.find(s => s.elementRef.nativeElement.id === 'activeMembersScrollbar');
      activeMembersScrollbar.update();
    }, error => {
      console.log(error); // debugging purposes
    });

    this.instructorService.instructorTasks.subscribe(async updatedTasks => {
      this.tasks = updatedTasks;
      this.instructorService.orderTasksByPriority(this.tasks);
      await this.timeout(50);
      const tasksScrollbar = this.scrollbars.find(s => s.elementRef.nativeElement.id === 'tasksScrollbar');
      tasksScrollbar.update();
    });
    this.instructorService.loadInstructorTasks();
  }

  displayUserDetails(event) {
    const memberId = event.currentTarget.id;
    const memberObj = this.members.find(member => parseInt(member.Id, 10) === parseInt(memberId, 10));
    this.sessionStorageService.setJson('member-info', memberObj);
    this.router.navigate(['/members/info'], {
      queryParams: {
        usuario: JSON.stringify(memberObj)
      }
    });
  }

  async deleteSelectedInstructorTask() {
    try {
      this.isLoading = true;
      await this.instructorService.deleteInstructorTask(this.selectedTask);
      this.messageService.info(
        this.instructorTaskDeletedMessage.nativeElement.textContent,
        {
          Position: 'top',
          Style: 'bar',
          Duration: 5000
        });
    } catch (e) {
      console.error(e);
    } finally {
      this.deleteModal.hide();
      this.isLoading = false;
    }
  }

  onDeleteContextMenu($event: MouseEvent, item: InstructorTask): void {
    this.selectedTask = item;
    this.contextMenuService.show.next({
      contextMenu: this.deleteMenu,
      event: $event,
      item: item,
    });
    $event.preventDefault();
    $event.stopPropagation();
  }

  onPriorityContextMenu($event: MouseEvent, item: InstructorTask): void {
    this.selectedTask = item;
    this.contextMenuService.show.next({
      contextMenu: this.priorityMenu,
      event: $event,
      item: item,
    });
    $event.preventDefault();
    $event.stopPropagation();
  }

  openDeleteModal() {
    this.createModal.hide();
    this.deleteModal.show();
  }

  async changeTaskPriority(newPriority: TaskPriority) {

    const oldPriority = this.selectedTask.priority;
    try {
      this.isLoading = true;
      this.selectedTask.priority = newPriority;
      await this.instructorService.addOrUpdateInstructorTask(this.selectedTask);
    } catch (e) {
      this.selectedTask.priority = oldPriority;
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }

  openTaskModal(task: InstructorTask = null) {
    if (task !== null) {
      this.selectedTask = task;
      this.taskForm.controls['title'].setValue(task.title);
      this.taskForm.controls['description'].setValue(task.description);
      this.taskForm.controls['priority'].setValue(task.priority);
    } else {
      this.selectedTask = new InstructorTask();
      this.taskForm.reset({
        title: '',
        description: '',
        priority: this.taskPriority.MEDIUM
      });
    }
    this.createModal.show();
  }

  async addEditTask() {
    try {
      if (!this.taskForm.valid) {
        return;
      }

      this.isLoading = true;
      this.taskForm.disable();
      this.selectedTask.title = this.taskForm.controls['title'].value;
      this.selectedTask.description = this.taskForm.controls['description'].value;
      this.selectedTask.priority = this.taskForm.controls['priority'].value;
      await this.instructorService.addOrUpdateInstructorTask(this.selectedTask);
      this.createModal.hide();

    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
      this.taskForm.enable();
    }
  }
}
