import { HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/_base/message.service';
import { UploadFileData } from 'src/app/_core/api/upload-file/upload-file-data';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { UploadFile } from 'src/app/_core/model/upload-file';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true
    }
  ]
})
export class InputFileComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor, Validator {

  public progress: number = 0;
  public uploading: boolean = false;
  public fileList: NzUploadFile[] = [];
  public showUploadList = {
    showDownloadIcon: true,
    showPreviewIcon: true,
    showRemoveIcon: true
  };


  @Input() fileListInput: any[] = []
  @Input() fileName: string[] = [];
  @Input() fileType: string | undefined = '.doc,.docx,.xls,.xlsx,.pdf,.png,.jpg,.txt,.zip,.rar,.csv' // default
  @Input() isShowLoadList: boolean = true;
  @Input() urlBase: string | undefined;
  @Input() isDialog: boolean = false;
  @Input() progessEvent: Observable<any> = new Observable();
  @Input() fileSize: number | undefined = 10; // default is 10

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor(
    private msg: MessageService,
    private uploadService: UploadFileData
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['fileListInput'] && changes['fileListInput'].currentValue) {
      this.fileList = changes['fileListInput'].currentValue;
    }
  }

  ngAfterViewInit(): void {
    if (this.fileListInput.length > 0) {
      this.fileList = this.fileListInput;
    }
  }

  writeValue(obj: any[]): void {
    if (obj) {
      this.fileList = obj.map(item => {
        return {
          uid: item.id,
          name: item.name,
          status: 'done',
          size: item.size,
          // url: this.getPathUrl(item.id, item.name, item.endPoint),
          data: item
        };
      });
    } else {
      this.fileList = [];
    }
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
  }

  ngOnInit(): void {

  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      console.log(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      console.log(`${file.name} file upload failed.`);
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    // console.log(file);
    // this.progess = 0;
    // validate định dạng file
    if (this.fileType) {
      let fileName: string = file.name;
      let listType = this.fileType.split(',');
      let valid = false;
      for (const t of listType) {
        if (fileName.endsWith(t)) valid = true;
      }
      if (!valid) {
        this.msg.error('Tệp không đúng định dạng')
        this.uploading = false;
        return false;

      }
    }
    // fileSize tính theo MB
    if (this.fileSize) {
      // bytes to MB: 1048576
      // bytes to KB: 1024
      let size = (file.size) ? Number((file.size / 1048576).toFixed(2)) : 0;
      console.log(size);
      if (size > this.fileSize) {
        this.msg.error('Kích thước file vượt quá ' + this.fileSize + ' Mb');
        return false;
      }
    }
    this.fileList = this.fileList.concat(file);
    if (this.isDialog) {
      this.onChange.emit(this.fileList);
    }

    return false;
  }

  removeFile = (file: NzUploadFile): boolean => {
    console.log(file);
    this.fileList = this.fileList.filter(x => x.name !== file.name);
    let upload: UploadFile = {};
    upload.taskId = file['taskId'];
    upload.name = file.name;
    // upload.size = item.size;
    this.uploadService.deleteFileInTask(upload).subscribe(
      {
        next: (res) => {
            this.onDelete.emit(res);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
    return true;
  }

  downloadFile = (file: NzUploadFile): boolean => {
    console.log(file);
    if (file['taskId']) {
      // let taskId = file['taskId'];
      this.uploadService.downloadFileInTask(file).subscribe({
        next: (res) => {
          console.log(res);
          let dataType = res.type;
          let binaryData = [];
          binaryData.push(res);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
          downloadLink.setAttribute('download', file.name);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    return true;
  }







}
