import { FormArray, FormControl, FormGroup, Validator } from "@angular/forms";


// data : json object
export function initDataObject(data: any, _object: any): FormGroup {
  // check properties of object
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
    let control = new FormControl(data[prop], [])
    form.addControl(prop, control);
  });
  return form;
}

export function compareProperties(prevValue: any, currentValue: any): boolean {
  if (prevValue.toString().trim() === currentValue.toString().trim()) return true;
  return false;
}

