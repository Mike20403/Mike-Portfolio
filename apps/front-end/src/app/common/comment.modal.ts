export class Comments {
  constructor(public id:number
              ,public post_id:number,
              public parent_id:number,
              public user_id:number,
              public content:string,
              public created_at:Date) {
  }
}
