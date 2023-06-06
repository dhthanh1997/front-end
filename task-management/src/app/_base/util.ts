import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validator } from "@angular/forms";


// data : json object
export function initDataObject(data: any, _object: any): FormGroup {
  // check properties of object
  // debugger;
  const form: FormGroup = new FormGroup({});
  let properties = Object.getOwnPropertyNames(_object);
  properties.forEach(prop => {
    let control = new FormControl(data[prop], [])
    form.addControl(prop, control)
  })
  return form;
}

// data : json object
export function initFormObject(data: any, _object: any): FormGroup {
  // check properties of object
  const properties = Object.getOwnPropertyNames(_object);
  const form = new FormGroup({});
  properties.forEach(prop => {
    let control = new FormControl(data[prop], [])
    form.addControl(prop, control);
  });
  return form;
}


// init list data Object
export function initListDataObject(data: any[], _object: any, arrayName: string): FormGroup {
  // debugger;
  const form: FormGroup = new FormGroup({});
  form.addControl(arrayName, new FormArray([]))
  const array = form.get(arrayName) as FormArray;
  data.forEach(value => {
    let obj = initFormObject(value, _object)
    array.push(obj);
  });
  return form;
}

export function initFormArray(arrayName: string): FormGroup {
  const form: FormGroup = new FormGroup({});
  form.addControl(arrayName, new FormArray([]))
  return form;
}

export function setDataInFormArray(data: any[], arrayName: string, form: FormGroup, _object: any): FormGroup {
  const array = form.get(arrayName) as FormArray;
  data.forEach(value => {
    let obj = initFormObject(value, _object)
    array.push(obj);
  });
  return form;
}


export function setDataInFormObject(data: any, form: FormGroup, _object: any): FormGroup {
  // check properties of object
  const properties = Object.getOwnPropertyNames(_object);
  properties.forEach(prop => {
    if (data[prop]) {
      form.get(prop)?.patchValue(data[prop]);
    }
  });
  return form;
}

export function compareProperties(prevValue: any, currentValue: any): boolean {
  if (prevValue.toString().trim() === currentValue.toString().trim()) return true;
  return false;
}

export function updateControlInArray(value: any, index: number, formArray: FormArray): FormArray {
  const formGroup = formArray.controls[index] as FormGroup;
  formGroup.patchValue(value);
  return formArray;
}

export function updateControl(value: any, formGroup: FormGroup): FormGroup {
  formGroup.patchValue(value);
  return formGroup;
}

export function updateFormData(value: any, formGroup: FormGroup, _object: any): FormGroup {
  const properties = Object.getOwnPropertyNames(_object);
  properties.forEach(prop => {
    let form = formGroup.controls[prop] as FormGroup;
    form.patchValue(value.prop)
  });
  return formGroup;
}

export function sliptStringToArray(value: string): string[] {
  const sliptString = value.split('_') as string[];
  return sliptString;
}



// utils enum
export class EnumUtils {
  static getEnumValues(enumObj: any, enumType: EnumType): any[] {
    // const properties = Object.getOwnPropertyNames(enumType);
    return EnumUtils.getEnumKeys(enumObj, enumType).map(value => enumObj[value]);

  }

  static getEnumKeys(enumObj: any, enumType: EnumType): any[] {
    return Object.keys(enumObj).filter(propertyName => typeof enumObj[propertyName] === enumType);
  }

  static getKeyByValue(enumObj: any, value: any): any {
    // console.log(Object.keys);
    return Object.keys(enumObj)[Object.values(enumObj).indexOf(value)];
  }
}

export enum EnumType {
  Number = 'number',
  String = 'string'
}

// end utils enum


// binary search tree recursive function
@Injectable({
  providedIn: 'root'
})
export class BinarySearchService {

  public result: any;
  public resultPermission: any;

  public binarySearchTree(form: FormGroup, id: any, property: string, key: string): any {
    let temp;
    if (form.get(key) && form.get(key)!.value === id) {
      return this.result = form;
    } else {
      if (form.get(property) && form.get(property)!.value.length > 0) {
        let arrays = form.get(property) as FormArray;
        arrays.controls.some((value: any) => {
          temp = this.binarySearchTree(value, id, property, key);
        })
      }
    }
    // return (form.get(key) && form.get(key)!.value === id) ? form : ((form.get(property) && form.get(property)!.value.length > 0) ? form.get(property) : []).some((value: any) => temp = binarySearchTree(value, id, property, key)) && temp;
  }

  public binaryCheckItemInTree(arrays: any[], property: string, key: string): any {
    // debugger;
    arrays.forEach((value: any) => {
      // if(value[property].length === 0) {
      if (key.includes(value.path)) {
        return this.result = value;
        // } 
      } else {
        if (value[property] && value[property].length > 0) {
          this.binaryCheckItemInTree(value[property], property, key);
        }
      }
    });

  }

  public binarySearchTreeArray(tree: any[], property: string, id: any): any {
    // debugger;
    this.result = null;
    tree.forEach((value: any) => {
      if (value.id === id) {
        return this.result = value;
      } else {
        if (value[property] && value[property].length > 0) {
          // value[property].forEach((v: any) => {
          this.binarySearchTreeArray(value[property], property, id);
          // });
        }
      }
    });
  }

  public binarySearchTreePermission(tree: any[], property: string, code: any): any {
    // debugger;
    // let temp: any = {};
    this.resultPermission = null;
    tree.forEach((value: any) => {
      if (value.code === code) {
        return this.resultPermission = value;
      } else {
        if (value[property] && value[property].length > 0) {
          this.binarySearchTreePermission(value[property], property, code);
        }
      }
    });
    // return temp;
  }

}

