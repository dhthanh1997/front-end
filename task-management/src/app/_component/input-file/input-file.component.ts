import { HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/_base/message.service';

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
export class InputFileComponent implements OnInit, AfterViewInit, ControlValueAccessor, Validator {

  public progress: number = 0;
  public uploading: boolean = false;
  public fileList: NzUploadFile[] = [];
  public showUploadList = {
    showDownloadIcon: true,
    showPreviewIcon: true,
    showRemoveIcon: true
  };

  @Input() fileType: string | undefined = '.doc,.docx,.xls,.xlsx,.pdf,.png,.jpg,.txt,.zip,.rar,.csv' // default
  @Input() isShowLoadList: boolean = true;
  @Input() urlBase: string | undefined;
  @Input() isDialog: boolean = false;
  @Input() progessEvent: Observable<any> = new Observable();
  @Input() fileSize: number | undefined = 10; // default is 10
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private msg: MessageService
  ) { }

  ngAfterViewInit(): void {
  }

  writeValue(obj: any): void {
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
      let size = (file.size) ? (file.size / 1048576).toFixed(2) : 0;
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
    // console.log(this.fileList);
    // this.progessEvent.subscribe({
    //   next: (res) => {
    //     if(res.type === HttpEventType.UploadProgress) {
    //       this.uploading = true;
    //       this.progress = Math.round(100 * res.loaded / res.total);
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.uploading = false
    //   }
    // })

    return false;
  }

  removeFile = (file: NzUploadFile): boolean => {
    console.log(file);
    this.fileList = this.fileList.filter(x => x.name !== file.name);
    return true;
  }

  downloadFile = (file: NzUploadFile): boolean => {
    console.log(file);
    return true;
  }


  




}
