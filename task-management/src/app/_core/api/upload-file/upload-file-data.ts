import { Observable } from "rxjs";
import { UploadFile } from "../../model/upload-file";
import { ResponseDataObject } from "../../other/responseDataObject";

export abstract class UploadFileData {
    abstract uploadFileInTask(item: UploadFile, file : File[]): Observable<any>;
    abstract uploadFileInProject(item: UploadFile, file: File[]): Observable<any>;
    abstract downloadFileInTask(item: any): Observable<any>;
    abstract downloadFileInProject(id: number): Observable<any>;
    abstract getFileInTask(id: number): Observable<ResponseDataObject>;
    abstract getFileInProject(id: number): Observable<ResponseDataObject>;
    abstract deleteFileInTask(item: UploadFile): Observable<ResponseDataObject>;
    abstract deleteFileInProject(item: UploadFile): Observable<ResponseDataObject>;
}