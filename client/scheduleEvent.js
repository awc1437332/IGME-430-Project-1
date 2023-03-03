export default class scheduleEvent{
    constructor(name,date,time){
        // this.name = name;
        // this.date = date;
        // this.time = time;
        Object.assign(this,{name,date,time});
    }
}