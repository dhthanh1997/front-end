import { Observable } from "rxjs";
import { UploadFile } from "../../model/upload-file";
import { ResponseDataObject } from "../../other/responseDataObject";

export abstract class UploadFileData {
    abstract uploadFileInTask(item: UploadFile, file : File): Observable<any>;
    abstract uploadFileInProject(item: UploadFile, file: File): Observable<any>;
}