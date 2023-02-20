import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

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

  public progess: number = 0;
  public fileList: NzUploadFile[] = [];
  public showUploadList = {
    showDownloadIcon: true,
    showPreviewIcon: true,
    showRemoveIcon: true
  };

  @Input() isShowLoadList: boolean = true;
  @Input() urlBase: string | undefined;
  @Input() isDialog: boolean = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
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
    this.fileList = this.fileList.concat(file);
    console.log(this.fileList);
    // if(file) {
    //   this.fileList.push(file);
    // }
    return false;
  }

  removeFile = (file: NzUploadFile): boolean => {
    console.log(file);
    return true;
  }




}
