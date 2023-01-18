import { FormArray, FormGroup } from "@angular/forms";


// data : json object
export function initDataObject(data: any, _object: any, form: FormGroup): FormGroup {
  // check properties of object
  let properties = Object.getOwnPropertyNames(_object);
  properties.forEach(prop => {
    form.addControl(prop, data[prop]);
  })
  return form;
}

// data : json object
export function initFormObject(data: any, _object: any): FormGroup {
  // check properties of object
  let properties = Object.getOwnPropertyNames(_object);
  let form = new FormGroup({});
  properties.forEach(prop => {
    form.addControl(prop, data[prop]);
  })
  return form;
}


// init list data Object
export function initListDataObject(data: any[], _object: any, arrayName: string, form: FormGroup): FormGroup {
  // let properties = Object.getOwnPropertyNames(objectName);
  form.addControl(arrayName, new FormArray([]))
  const array = form.get(arrayName) as FormArray;
  data.forEach(value => {
    let obj = initFormObject(value, _object)
    array.push(obj);
  });
  return form;
}

